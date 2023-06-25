const fs = require("fs");
const { dbConnection } = require("../../database/dbConnection");
const GasStationModel = require("../../components/GasStation/gasStation.model");

const gasStations = JSON.parse(
  fs.readFileSync("src/utils/dev-data/gasStations.json", { encoding: "utf-8" })
);
console.log(gasStations.length);

dbConnection();
//add this line to db connection
//require("dotenv").config({ path: "./config/.env" });

const createGasStation = async () => {
  let duplicatesnumber = 0;
  for (const gasStation of gasStations) {
    const document = await GasStationModel.findOne({
      "name.en": gasStation.name.en,
      "location.latitude": gasStation.location.latitude,
      "location.longitude": gasStation.location.longitude,
    });
    if (!document) {
      const document = await GasStationModel.create(gasStation);
      if (document) {
        console.log(`${document}carType Added successfuly`);
      }
    } else {
      duplicatesnumber +=1;
    }
  }
  console.log(duplicatesnumber," : doplicate found");
};

createGasStation();
