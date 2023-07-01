const { dbConnection } = require('../../database/dbConnection');
const fs = require('fs');
// const maintenace = require('../../components/MaintenanceCenter/maintenanceCenter.model');
const maintenanceModel = require('../../../src/components/MaintenanceCenter/maintenanceCenter.model');
const mongoose = require('mongoose');

const maintenances = JSON.parse(
  fs.readFileSync('src/utils/dev-data/scrapping/maintenances.json', { encoding: 'utf-8' })
);

dbConnection();
const ObjectId = mongoose.Types.ObjectId;

console.log(maintenances[0])
const refactorMaintenance = async () => {
  for (let document of maintenances) {
    let newCarTypes = [];

    document._id = new ObjectId(document._id);

    for (const carTypeString of document.carType) {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(carTypeString);
      if (isValidObjectId) {
        const carTypeId = new ObjectId(carTypeString);
        newCarTypes.push(carTypeId);
      } else {
        console.warn(`Invalid ObjectId: ${carTypeString}`);
      }
    }
    document.carType = newCarTypes;

    let maint = await maintenanceModel.create(document)
    console.log(maint)

  }

    // console.log(maintenances[0])

  // fs.writeFileSync('src/utils/dev-data/maintenaceCenters.json', JSON.stringify(maintenances), function (err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });
};

refactorMaintenance();
