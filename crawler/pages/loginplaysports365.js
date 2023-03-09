var puppeteer = require("puppeteer");
const cheerio = require('cheerio');

(async () => {
	
	const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://playsports365.com/");
    await page.waitForSelector("form[data='frmLogin']");
    await page.type("input[name='UserName']", "Moc8888", { delay: 100 });
    await page.type("input[name='Password']", "tt99", { delay: 100 });
    
    await page.waitForSelector("button[data='btnLogin']");
    await page.click("button[data='btnLogin']");

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