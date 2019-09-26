
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const { redditUrls } = require('./urls');

const {
  b2,
  getBucket
} = require('./b2');

const redditImageScrapper = async (url) => {

  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();

  puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => {
      return page.goto(url, { waitUntil: 'networkidle0' }).then(function() {
        return page.content();
      });
    })
    .then(html => {
      const $ = cheerio.load(html);

      const newsHeadlines = [];
      $('a[href*="/r/news/comments"] > h2').each(function() {
        newsHeadlines.push({
          title: $(this).text(),
        });
      });

      console.log(newsHeadlines);
    })
    .close()
    .catch(console.error);
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
