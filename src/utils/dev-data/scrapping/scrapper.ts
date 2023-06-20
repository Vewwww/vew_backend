const puppeteer = require('puppeteer');
import { Browser } from 'puppeteer';
const fs = require('fs');

const url = 'https://eg.hatla2ee.com/en/maintenances-center/city/giza';

let CurrURL = '';

const getMaintData = async (data) => {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  var maintenances = [data.length];

  for (let i = 0; i < data.length; i++) {
    await page.goto(data[i].link);

    maintenances[i] = await page.evaluate(() => {
      const brandList = Array.from(document.querySelectorAll('.brands .interInner ul li'));
      var brandss = [0];
      const brands = brandList.map((brand: any) => {
        brandss.push(brand.querySelector('a').getAttribute('alt'));
      });

      let isVerified = false;
      const verifiedCondition = document.querySelector('.mc_interSection h2')?.textContent;
      console.log('verificationCondition: ', verifiedCondition);
      if (verifiedCondition === 'مركز صيانة معتمد في ماركات') {
        isVerified = true;
      }

      const latitude = document.querySelector('.direction a')?.getAttribute('href')?.split('&query=')[1].split(',')[0];
      let longitude = document.querySelector('.direction a')?.getAttribute('href')?.split('&query=')[1].split(',')[1];
      if (longitude === '') {
        longitude = document.querySelector('.direction a')?.getAttribute('href')?.split('&query=')[1].split(',')[2];
      }

      return {
        name: document.querySelector('.unitHead_title .item h1')?.textContent,
        phone: document.querySelector('.nCallActionList ul li a')?.getAttribute('href')?.split(':')[1],
        carType: brandss,
        isVerified,
        rate: -1,
        locationDesc: document.querySelector('.address')?.textContent,
        latitude,
        longitude,
      };
    });
  }

  fs.appendFile('giza_en_maintences.txt', JSON.stringify(maintenances), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
};

const main = async () => {
  for (let i = 1; i <= 2; i++) {
    if (i == 1) CurrURL = url;
    else {
      CurrURL = `${url}/page/${i}`;
    }

    const browser: Browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(CurrURL);

    const maintData = await page.evaluate(() => {
      const maintenances = Array.from(document.querySelectorAll('.list_content'));

      const data = maintenances.map((maint: any) => ({
        title: maint.querySelector('a').getAttribute('title'),
        link: 'https://eg.hatla2ee.com' + maint.querySelector('a').getAttribute('href'),
      }));
      return data;
    });

    console.log(maintData.length);
    await getMaintData(maintData);

    await browser.close();
  }
};

main();
