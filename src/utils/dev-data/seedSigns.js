const fs = require("fs");
const { dbConnection } = require("../../database/dbConnection");
const signModel=require("../../components/Sign/sign.model")
require("dotenv").config({ path: "./config/.env" });
const signs = JSON.parse(
  fs.readFileSync("src/utils/dev-data/signs.json", { encoding: "utf-8" })
);

dbConnection();

const createSign = async (sign) => {
  // for (const sign of signs) {
    const document = await signModel.create(signs[0]);
    if (document) {
      console.log(`${document}sign Added successfuly`);
    }
  // }
};

createSign();
