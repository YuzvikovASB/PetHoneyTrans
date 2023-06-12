const Truck = require('../models/Truck.model');
const Load = require('../models/Load.model');

const findTruck = async (
  {
    _id,
    logs,
    dimensions,
    payload,
  }) => {
  try {
    const trucksInService = await Truck.find({
      status: 'IS',
    });

    // console.log('TRUCKS WITH IS: ', trucksInService);
    if (trucksInService.length === 0) {
      await Load.findOneAndUpdate(
          {_id: _id},
          {
            status: 'NEW',
          },
      );
      return 'No trucks in service right now. Please try again later';
    }

    const trucksMatched = trucksInService.filter((truck) => {
      return truck.payload > payload &&
        truck.dimensions.width > dimensions.width &&
        truck.dimensions.height > dimensions.height &&
        truck.dimensions.length > dimensions.length;
    });

    // console.log('TRUCKS MATCHES: ', trucksMatched);
    if (trucksMatched.length === 0) {
      await Load.findOneAndUpdate(
          {_id: _id},
          {
            status: 'NEW',
          },
      );
      return 'Your load is too big, no trucks found. Please ' +
        'edit parameters and try again';
    }

    const assignedTruck = await Truck.findOneAndUpdate(
        {_id: trucksMatched[0]._id},
        {
          status: 'OL',
        },
        {new: true},
    );

    await Load.findOneAndUpdate(
        {_id: _id},
        {
          status: 'ASSIGNED',
          state: 'En route to Pick Up',
          assignedTo: assignedTruck.assignedTo,
          logs: [
            ...logs,
            {message: 'Load assigned', time: new Date().getTime().toString()},
          ],
        },
        {new: true},
    );

    return 'Truck was found and load assigned!';
  } catch (e) {
    return `Impossible to find a truck:, ${e}`;
  }
};


module.exports = findTruck;
