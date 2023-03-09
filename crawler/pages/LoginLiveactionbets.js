var puppeteer = require("puppeteer");
const cheerio = require('cheerio');

(async () => {//k đc
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://liveactionbets.com/");
    await page.waitForSelector(".loginform");
    await page.type("input[name='customerID']", "TP835", { delay: 100 });
    await page.type("input[name='Password']", "D123", { delay: 100 });

    await page.waitForSelector("button[data-action='login']");
    await page.click("button[data-action='login']");
    // await page.click("#cmdSignOn");

    // await page.waitForNavigation({
    //     waitUntil: "networkidle2",
    // })


    // var contentPage = await page.content();
    // // console.log(a)
    // const $ = cheerio.load(contentPage);
    // $.html();
    // console.log($(".table.table-hover tr:nth-child(2) td:nth-child(1)").text().trim())
    // page.close();

})() 