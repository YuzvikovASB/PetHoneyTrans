const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

const Driver = require('../../models/Driver.model');
const Shipper = require('../../models/Shipper.model');

const authorizationService = require('../../service/auth.service');

const bcrypt = require('bcrypt');


router
    /**
   * @api {post} /login
   * @apiDescription Login for users.
   * Here your data will be validated and if all good - the user
   * will be granted with the jwt_token
    */
    .post(
        '/',
        async (req, res) => {
          const schema = Joi.object({
            email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),
            role: Joi.string()
                .alphanum()
                .required(),
          });

          try {
            const {
              email,
              password,
              role,
            } = await schema.validateAsync(req.body);

            let user;
            if (role === 'driver') {
              user = await Driver.findOne({email});
            } else {
              user = await Shipper.findOne({email});
            }

            if (!user) {
              return res.status(400).json({message: 'No such user'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
              return res.status(400).json({message: 'Invalid password'});
            }

            const jwtToken = await authorizationService
                .createToken(user);
            res.status(200).json({
              jwtToken,
              userId: user.id,
              role: user.role,
            });
          } catch (err) {
            res.status(500).json({message: err.message});
          }
        },
    );


module.exports = router;
