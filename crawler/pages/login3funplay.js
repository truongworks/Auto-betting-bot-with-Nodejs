var puppeteer = require("puppeteer");
const cheerio = require('cheerio');


(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.goto("https://3funplay.com/");
	await page.waitForSelector(".loginform");
	await page.type("input[name='customerID']", "Vs101", { delay: 100 });
	await page.type("input[name='password']", "111", { delay: 100 });
	
	await page.waitForSelector("input[name='password']");
	await page.click("input[name='login']");

	await page.waitForNavigation({
		waitUntil: "networkidle2",
	})


    // var contentPage = await page.content();
    // // console.log(a)
    // const $ = cheerio.load(contentPage);
    // $.html();
    // console.log($(".table.table-hover tr:nth-child(2) td:nth-child(1)").text().trim())
    // page.close();
})();