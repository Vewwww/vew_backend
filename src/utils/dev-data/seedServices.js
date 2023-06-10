const fs = require("fs");
const { dbConnection } = require("../../database/dbConnection");
const ServiceModel = require("../../components/Service/service.model");

const services = JSON.parse(
  fs.readFileSync("src/utils/dev-data/services.json", { encoding: "utf-8" })
);
//add this line to db connection
//require("dotenv").config({ path: "./config/.env" });
dbConnection();

const createService = async (color) => {
  for (const service of services) {
    const document = await ServiceModel.create(service);
    if (document) {
      console.log(`${document}service Added successfuly`);
    }
  }
};

createService();
