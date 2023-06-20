const fs = require("fs");
const { dbConnection } = require("../../database/dbConnection");
const ColorModel = require("../../components/color/color.model");

const colors = JSON.parse(
  fs.readFileSync("src/utils/dev-data/colors.json", { encoding: "utf-8" })
);

dbConnection();

const createColor = async () => {
  for (const color of colors) {
    const document = await ColorModel.create(color);
    if (document) {
      console.log(`${document}color Added successfuly`);
    }
  }
};

createColor();
