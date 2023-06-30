const { dbConnection } = require('../../database/dbConnection');
// const maintenace = require('../../components/MaintenanceCenter/maintenanceCenter.model');
const maintenace = require("../../../src/components/MaintenanceCenter/maintenanceCenter.model")
const mongoose = require('mongoose');

//add this line to db connection
//require("dotenv").config({ path: "./config/.env" });
dbConnection();
const ObjectId = mongoose.Types.ObjectId;

const refactorMaintenance = async () => {
  try {
    let documents = await maintenace.find();

    for (let document of documents) {
      let newCarTypes = [];

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
      // await document.save();
      // console.log(document)
      // console.log(document._doc)

      // let maint= await maintenace.findByIdAndUpdate({_id:document._id.toString()},{carType: document._doc.carType})
      // await maint.save();
    }

    // console.log(documents)


    let maint = await maintenace.findById(new ObjectId("643572f93a73cf328e14adbf"));
    maint = await maintenace.findById("643572f93a73cf328e14adbf");
    console.log(maint);
    // for (let document of documents) {
    //   console.log(document._id.toString());
    //   // await document.save();
    // }
    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
};

refactorMaintenance();
