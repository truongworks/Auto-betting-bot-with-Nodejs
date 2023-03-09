var puppeteer = require("puppeteer");
const cheerio = require('cheerio');

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.goto("https://www.sbobet.com/");
	await page.waitForSelector(".LoginWrap");
	await page.type("#username", "hiv44ku001", { delay: 100 });
	await page.type("#password", "hhhh9999@@", { delay: 100 });
	
	await page.waitForSelector("ul.account-right");
	await page.click("ul.account-right li.sign-in ");

    // await page.waitForNavigation({
    //     waitUntil: "networkidle2",
    // })


    // var contentPage = await page.content();
    // // console.log(a)
    // const $ = cheerio.load(contentPage);
    // $.html();
    // console.log($(".table.table-hover tr:nth-child(2) td:nth-child(1)").text().trim())
    // page.close();
})();