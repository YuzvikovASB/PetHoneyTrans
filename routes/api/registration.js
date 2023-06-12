const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

const Driver = require('../../models/Driver.model');
const Shipper = require('../../models/Shipper.model');

const bcrypt = require('bcrypt');

router
    /**
     * @api {post} /registration
     * @apiDescription Registration for users.
     * Here your data will be validated and written to Shipper or
     * Driver collection depending on the role user have chosen.
     */
    .post(
        '/',

        async (req, res) => {
          const schema = Joi.object({
            name: Joi.string()
                .min(2)
                .max(30)
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),
            email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
                .required(),
            role: Joi.string()
                .alphanum()
                .required(),
          });

          try {
            const {
              name,
              email,
              password,
              role,
            } = await schema.validateAsync(req.body);

            const driverCandidate = await Driver.findOne({email});
            const shipperCandidate = await Shipper.findOne({email});

            if (driverCandidate || shipperCandidate) {
              return res.status(400)
                  .json({message: 'User with such email already exists'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            let user;
            if (role === 'driver') {
              user = await new Driver({
                name,
                email,
                password: hashedPassword,
                role,
              });
            } else {
              user = await new Shipper({
                name,
                email,
                password: hashedPassword,
                role,
              });
            }

            await user.save();
            res.status(201).json({message: 'User was created'});
          } catch (err) {
            res.status(500).json({message: err.message});
          }
        });

module.exports = router;
