
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const { redditUrls } = require('./urls');

const {
  b2,
  getBucket
} = require('./b2');

const redditImageScrapper = async (url) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url), { waitUntil: 'networkidle0' };

  const title = await page.title();
  console.info(`The title is: ${title}`);

  await page.keyboard.press('Space', { delay: 10 });

  const imageSelector = '';

  // It needs to select items based on a date range.

  const imageURLArray = await page.evaluate((sel) => {
    return document.querySelector(sel).getAttribute('src').replace('/', '');
  }, imageSelector);

  await browser.close();
};

const redditScrapper = () => {
  redditUrls.forEach(url => {
    redditImageScrapper();
  });
}

module.exports = {
  redditScrapper,
};

  // await page.goto(url, { waitUntil: 'networkidle0' });

  /* Run javascript inside of the page */
  // let data = await page.evaluate(() => {

    // $('h2.title').text('Hello there!')
    // $('h2').addClass('welcome')

    // const $ = cheerio.load(page.content());

    // $.html()

    /* Returning an object filled with the scraped data */
  //   return {

  //   };
  // });

  /* Outputting what we scraped */
  // console.log(data);

  // await browser.close();
