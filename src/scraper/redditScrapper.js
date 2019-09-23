
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const { redditUrls } = require('./urls');

const redditImageScrapper = () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(IMDB_URL(MOVIE_ID), { waitUntil: 'networkidle0' });

  /* Run javascript inside of the page */
  let data = await page.evaluate(() => {

    // $('h2.title').text('Hello there!')
    // $('h2').addClass('welcome')
    
    const $ = cheerio.load(page.content());
    
    // $.html()
    
    /* Returning an object filled with the scraped data */
    return {
  
    }

  });

  /* Outputting what we scraped */
  console.log(data);

  await browser.close();
};

const redditScrapper = () => {
  redditImageScrapper()

}