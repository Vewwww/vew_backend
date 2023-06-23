const fs = require("fs");
const { dbConnection } = require("../../database/dbConnection");
const carModelModel = require("../../components/carModel/carModel.model");

const carModels = JSON.parse(
  fs.readFileSync("src/utils/dev-data/models.json", { encoding: "utf-8" })
);

dbConnection();

const createCarModel = async () => {
  for (const carModel of carModels) {
    const document = await carModelModel.create(carModel);
    if (document) {
      console.log(`${document}car model Added successfuly`);
    }
  }
};

createCarModel();