const fs = require("fs");
const { dbConnection } = require("../../database/dbConnection");
const CarTypeModel = require("../../components/carBrand/carBrand.model");

const carTypes = JSON.parse(
  fs.readFileSync("src/utils/dev-data/carTypes.json", { encoding: "utf-8" })
);

dbConnection();

const createCarType = async () => {
  for (const carType of carTypes) {
    const document = await CarTypeModel.create(carType);
    if (document) {
      console.log(`${document}carType Added successfuly`);
    }
  }
};

createCarType();
