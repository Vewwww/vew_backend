const fs = require("fs");
const { dbConnection } = require("../../database/dbConnection");
const signModel=require("../../components/Sign/sign.model")

const signs = JSON.parse(
  fs.readFileSync("src/utils/dev-data/signs.json", { encoding: "utf-8" })
);

dbConnection();

const createSign = async (sign) => {
  for (const sign of signs) {
    const document = await signModel.create(sign);
    if (document) {
      console.log(`${document}sign Added successfuly`);
    }
  }
};

// createSign();
