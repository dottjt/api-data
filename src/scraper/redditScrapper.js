const puppeteer = require('puppeteer');

const { redditUrls } = require('./urls');

const redditImageScrapper = () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(IMDB_URL(MOVIE_ID), { waitUntil: 'networkidle0' });

  /* Run javascript inside of the page */
  let data = await page.evaluate(() => {

    let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
    let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
    let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;

    /* Returning an object filled with the scraped data */
    return {
      title,
      rating,
      ratingCount
    }

  });

  /* Outputting what we scraped */
  console.log(data);

  await browser.close();
};

const redditScrapper = () => {
  redditImageScrapper()

}