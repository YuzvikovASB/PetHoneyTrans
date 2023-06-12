const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const Driver = require('../../models/Driver.model');
const Shipper = require('../../models/Shipper.model');

router
    /**
     * @api {get} /profile/:id
     * @apiDescription User receives his/her profile info.
     *
     */
    .get('/:id', async (req, res) => {
      try {
        if (req.headers['role'] === 'driver') {
          const driver = await Driver.findOne({_id: req.params.id});
          return res.status(200).json({
            id: driver.id,
            name: driver.name,
            email: driver.email,
            role: driver.role,
          });
        } else {
          const shipper = await Shipper.findOne({_id: req.params.id});
          return res.status(200).json({
            id: shipper.id,
            name: shipper.name,
            email: shipper.email,
            role: shipper.role,
          });
        }
      } catch (err) {
        res.send('Cannot find user');
      }
    })
    /**
     * @api {put} /profile/:id/change-password
     * @apiDescription User is able to change his/her profile info.
     * If passwords match, password will be updated.
     *
     */
    .put('/:id/change-password', async (req, res) => {
      const schema = Joi.object({
        oldPassword: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        role: Joi.string(),
      });

      try {
        const {newPassword} = await schema.validateAsync(req.body);

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        if (req.body.role === 'driver') {
          await Driver.findOneAndUpdate(
              {_id: req.params.id},
              {password: hashedPassword},
              {new: true},
          );
          return res.json({status: 'Password was changed!'});
        } else {
          await Shipper.findOneAndUpdate(
              {_id: req.params.id},
              {password: hashedPassword},
              {new: true},
          );
          return res.json({status: 'Password was changed!'});
        }
      } catch (e) {
        res.status(500).json({status: e.message});
      }
    })
    /**
     * @api {delete} /profile/:id/delete-account
     * @apiDescription Api is available only for shippers. Shipper needs
     * to send valid email. If all good - his profile will be removed from
     * Shippers Collection.
     *
     */
    .delete('/:id/delete-account', async (req, res) => {
      const schema = Joi.object({
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .required(),
      });

      try {
        const {email} = await schema.validateAsync(req.body);

        const shipperCandidate = await Shipper.findOne({email});

        if (!shipperCandidate) {
          return res.status(400).json({message: 'Wrong email'});
        }

        await Shipper.findOneAndRemove({
          _id: req.params.id,
          email,
        });
        res.status(200).json({status: 'User was deleted!'});
      } catch (err) {
        res.status(401).json({status: err.message});
      }
    });


module.exports = router;
