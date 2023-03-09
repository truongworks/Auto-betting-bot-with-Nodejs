var puppeteer = require("puppeteer");
const cheerio = require('cheerio');

(async () => {
	
	const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://2bet.ag/");
    await page.waitForSelector("#bp_login_div");
    await page.type("#bpLoginUsername", "HT20002", { delay: 100 });
    await page.type("#bpLoginPassword", "1", { delay: 100 });
    
    await page.waitForSelector("#bp_login_submit");
    await page.click("#bpLoginSubmit");

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