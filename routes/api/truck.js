const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const constants = require('../../constants/pre-defined-trucks');

const Load = require('../../models/Load.model');
const Truck = require('../../models/Truck.model');


router
    /**
     * @api {get} /trucks/my-loads
     * @apiDescription Api provides driver with an Array of his/her trucks.
     *
     */
    .get('/my-trucks', async (req, res) => {
      try {
        const foundTrucks = await Truck.find({
          createdBy: req.headers['userid'],
        });

        res.status(200).json(foundTrucks);
      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })
    /**
     * @api {get} /trucks/shipments
     * @apiDescription Api provides driver with an Array of loads
     * currently assigned to him/her.
     */
    .get('/shipments', async (req, res) => {
      try {
        const foundShipments = await Load.find({
          assignedTo: req.headers['userid'],
          status: 'ASSIGNED',
        });

        res.status(200).json(foundShipments);
      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })
    /**
     * @api {get} /trucks/history
     * @apiDescription Api provides driver with an Array of loads
     * him/her delivered.
     */
    .get('/history', async (req, res) => {
      try {
        const foundShipments = await Load.find({
          assignedTo: req.headers['userid'],
          status: 'SHIPPED',
        });

        res.status(200).json(foundShipments);
      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })
    /**
     * @api {post} /trucks/create-truck
     * @apiDescription Api validates data about truck and if all good -
     * writes it to the Truck Collection, so driver creates a new truck.
     */
    .post('/create-truck', async (req, res) => {
      const schema = Joi.object({
        model: Joi.string()
            .min(2)
            .max(30)
            .required(),
        type: Joi.string()
            .alphanum()
            .required(),
        userId: Joi.string()
            .alphanum()
            .required(),
      });

      try {
        const {model, type, userId} = await schema.validateAsync(req.body);

        let parameters;
        if (type === 'sprinter') {
          parameters = constants.SPRINTER;
        } else if (type === 'small') {
          parameters = constants.SMALL_STRAIGHT;
        } else if (type === 'large') {
          parameters = constants.LARGE_STRAIGHT;
        }

        const newTruck = await new Truck({
          model,
          type,
          createdBy: userId,
          assignedTo: '',
          status: '', // IS OL
          ...parameters,
        });

        await newTruck.save();
        res.status(201).json({message: 'New Truck was created'});
      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })
    /**
     * @api {get} /trucks/:id
     * @apiDescription Api provides driver with a detailed info about
     * his/her specific truck requested by its id.
     */
    .get('/:id', async (req, res) => {
      try {
        const truck = await Truck.findOne({
          _id: req.params.id,
        });

        res.status(200).json(truck);
      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })
    /**
     * @api {delete} /trucks/:id
     * @apiDescription Api provides possibility for driver to delete truck.
     * It is possible if only truck is not currently assigned to him.
     *
     */
    .delete('/:id', async (req, res) => {
      try {
        const truck = await Truck.findOne({_id: req.params.id});

        if (truck.assignedTo !== '') {
          return res.status(400).json(
              {message: 'Cannot delete assigned truck'},
          );
        }

        await Truck.remove({_id: req.params.id});

        res.status(200).json({message: 'Truck Deleted'});
      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })

    /**
     * @api {put} /trucks/:id
     * @apiDescription Api provides possibility for driver to update truck info.
     * It is possible if only truck is not currently assigned to him.
     *
     */
    .put('/:id', async (req, res) => {
      const schema = Joi.object({
        model: Joi.string()
            .min(2)
            .max(30)
            .required(),
        type: Joi.string()
            .alphanum()
            .required(),
      });

      try {
        const {model, type} = await schema.validateAsync(req.body);
        const truck = await Truck.findOne({_id: req.params.id});

        if (truck.assignedTo !== '') {
          return res.status(400).json({message: 'Cannot edit assigned truck'});
        }

        let parameters;
        if (type === 'sprinter') {
          parameters = constants.SPRINTER;
        } else if (type === 'small') {
          parameters = constants.SMALL_STRAIGHT;
        } else if (type === 'large') {
          parameters = constants.LARGE_STRAIGHT;
        }

        const editedTruck = await Truck.findOneAndUpdate(
            {_id: req.params.id},
            {
              model,
              type,
              ...parameters,
            },
            {new: true},
        );

        return res.status(200).json(editedTruck);
      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })

    /**
     * @api {patch} /trucks/:id/assign
     * @apiDescription Api provides possibility for driver to assign truck.
     * Driver is able to assign only one truck at a time. If driver has
     * truck with status 'OL' it is impossible to assign other trucks until
     * the load is delivered.
     *
     */
    .patch('/:id/assign', async (req, res) => {
      try {
        const anyAssigned = await Truck.findOne(
            {
              createdBy: req.body.userId,
              status: 'OL',
            });

        if (anyAssigned) {
          return res.status(400).json(
              {
                message: 'You cannot assign another truck unit ' +
                'you deliver the load',
              });
        }

        // re-assign all trucks
        await Truck.findOneAndUpdate({assignedTo: req.body.userId},
            {
              assignedTo: '',
              status: '',
            });

        const assignedTruck = await Truck.updateOne(
            {_id: req.params.id},
            {
              assignedTo: req.body.userId,
              status: 'IS',
            },
            {new: true},
        );

        return res.json(assignedTruck);
      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })
    /**
     * @api {patch} /trucks/:id/reassign
     * @apiDescription Api provides possibility for driver to reassign truck.
     * Driver is able to reassign only a truck currently assigned to him/her.
     * If driver has truck with status 'OL' it is impossible to reassign truck
     * until the load is delivered.
     *
     */
    .patch('/:id/reassign', async (req, res) => {
      try {
        const match = await Truck.findOne( {_id: req.params.id} );

        if (match.status === 'OL') {
          return res.status(400).json({message: 'You cannot be reassigned ' +
              'until you deliver the load'});
        }

        await Truck.updateOne(
            {_id: req.params.id},
            {
              assignedTo: '',
              status: '',
            },
            {new: true},
        );

        return res.status(200).json({message: 'Truck was reassigned'});
      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })
    /**
     * @api {patch} /shipments/pick-up
     * @apiDescription Api provides possibility for driver to pick up a load.
     * With this load state will be changed and proper log created.
     *
     */
    .patch('/shipments/pick-up', async (req, res) => {
      try {
        const pickedUpLoad = await Load.findOneAndUpdate(
            {_id: req.body.loadId},
            {
              state: 'En route to delivery',
              logs: [
                ...req.body.logs,
                {
                  message: 'Load picked up', time: new Date()
                      .getTime()
                      .toString(),
                },
              ],
            },
            {new: true},
        );
        console.log('Picked UP Load: ', pickedUpLoad);
        res.status(200).json(pickedUpLoad);
      } catch (e) {
        res.status(500).json({message: e.message});
      }
    })
    /**
     * @api {patch} /shipments/delivered
     * @apiDescription Api provides possibility for driver to end up delivery.
     * With this load status will be changed to SHIPPED and driver will be
     * free to go.
     *
     */
    .patch('/shipments/delivered', async (req, res) => {
      try {
        await Truck.findOneAndUpdate(
            {
              assignedTo: req.body.userId,
              status: 'OL',
            },
            {
              status: 'IS',
            },
        );

        await Load.findOneAndUpdate(
            {_id: req.body.loadId},
            {
              state: 'Arrived to delivery',
              status: 'SHIPPED',
              logs: [
                ...req.body.logs,
                {
                  message: 'Load delivered', time: new Date()
                      .getTime()
                      .toString(),
                },
              ],
            });

        res.status(200).json({message: 'Truck delivered the load'});
      } catch (e) {
        res.status(500).json({message: e.message});
      }
    });

module.exports = router;
