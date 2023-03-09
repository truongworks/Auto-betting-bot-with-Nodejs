const Crawler = require('crawler');
const cheerio = require('cheerio');
let request = require('request-promise');
// const request = require('request');
// const supperagent = require('superagent').agent();
// const cookieJar = request.jar();
// request = request.defaults({ jar: cookieJar });

// var axios = require('axios');
// var qs = require('qs');

var puppeteer = require("puppeteer");



const Loginbetnwins = async () => {


    // const response = await supperagent
    //     .post("https://wager.ibet.ag/login.aspx")
    //     .send({ Account: 'hl010', Password: '101' })
    //     .set("Content-Type", "application/x-www-form-urlencoded")
    //     // .set('Cookie', "'pl=; SYSTEMID=SYSTEMID12; fontSizeTool=normal'");
    //     .set('Sesion', "'pl=; SYSTEMID=SYSTEMID12; fontSizeTool=normal'");
    // const t = supperagent.get("https://wager.ibet.ag/wager/CreateSports.aspx?WT=0")
    // console.log(response.text)



    // const $ = cheerio.load(r.text);
    // $.html();
    // console.log($("ul li a).text())
    // console.log(22222, r.);
    //-----------------------------------------------------
    // const result = await request.get("https://www.betnwins.com/");
    // const cookieString = cookieJar.getCookieString("https://www.betnwins.com/");
    // console.log(1111, cookieString)

    // const login = await request.post(
    //     "https://www.betnwins.com/login.aspx",
    //     {
    //         form: {
    //             Account: "Tv1001",
    //             Password: '56789',
    //             IdBook: '173'
    //         },

    //     }
    // )
    // console.log(login)
    //=====================================

    // var options = {
    //     'method': 'POST',
    //     'url': 'https://www.betnwins.com/login.aspx',
    //     'headers': {
    //         'authority': 'www.betnwins.com',
    //         'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    //         'accept-language': 'vi;q=0.8',
    //         'cache-control': 'max-age=0',
    //         'content-type': 'application/x-www-form-urlencoded',
    //         'cookie': 'pl=; __cf_bm=I8wMaLQwbURRWe4bfS2BRNJng0euo49r9TZl4n2FBLY-1669602051-0-AW+swtQYhO5b5yWHGh6bgQC8MNAraUAG1pqi2i25EwS8YCtk99fvYzFa3M0IdK0lLdRKzqS3LMpfVgNbRDlmbxU=; ASP.NET_SessionId=rcrn23n4hq2hoe55dmujplmw; pl=',
    //         'origin': 'https://www.betnwins.com',
    //         'referer': 'https://www.betnwins.com/index.html',
    //         'sec-ch-ua': '"Brave";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
    //         'sec-ch-ua-mobile': '?0',
    //         'sec-ch-ua-platform': '"Windows"',
    //         'sec-fetch-dest': 'document',
    //         'sec-fetch-mode': 'navigate',
    //         'sec-fetch-site': 'same-origin',
    //         'sec-fetch-user': '?1',
    //         'sec-gpc': '1',
    //         'upgrade-insecure-requests': '1',
    //         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
    //     },
    //     form: {
    //         'Account': 'Tv1001',
    //         'Password': '56789',
    //         'IdBook': '173'
    //     }
    // };
    // request(options, async function (error, response) {
    //     if (error) throw new Error(error);
    //     console.log(response.body);

    // });
    //=======================================================

    // var data = qs.stringify({
    //     'Account': 'Tv1001',
    //     'Password': '56789',
    //     'IdBook': '173'
    // });
    // var config = {
    //     method: 'post',
    //     url: 'https://www.betnwins.com/login.aspx',
    //     headers: {
    //         'authority': 'www.betnwins.com',
    //         'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    //         'accept-language': 'vi;q=0.8',
    //         'cache-control': 'max-age=0',
    //         'content-type': 'application/x-www-form-urlencoded',
    //         'cookie': 'pl=; __cf_bm=I8wMaLQwbURRWe4bfS2BRNJng0euo49r9TZl4n2FBLY-1669602051-0-AW+swtQYhO5b5yWHGh6bgQC8MNAraUAG1pqi2i25EwS8YCtk99fvYzFa3M0IdK0lLdRKzqS3LMpfVgNbRDlmbxU=; ASP.NET_SessionId=rcrn23n4hq2hoe55dmujplmw; pl=',
    //         'origin': 'https://www.betnwins.com',
    //         'referer': 'https://www.betnwins.com/index.html',
    //         'sec-ch-ua': '"Brave";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
    //         'sec-ch-ua-mobile': '?0',
    //         'sec-ch-ua-platform': '"Windows"',
    //         'sec-fetch-dest': 'document',
    //         'sec-fetch-mode': 'navigate',
    //         'sec-fetch-site': 'same-origin',
    //         'sec-fetch-user': '?1',
    //         'sec-gpc': '1',
    //         'upgrade-insecure-requests': '1',
    //         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    //         'charset': 'utf-8',
    //         'responseEncodig': 'utf8'
    //     },
    //     data: data
    // };

    // axios(config)
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    //================================================================================================
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // await page.goto("https://blab.bdata.link/");
    // // await page.waitForSelector(".form-group mr-2");
    // await page.type("input[name='username']", "tinht", { delay: 100 });
    // await page.type("input[name='password']", "bdata@123", { delay: 100 });
    // // await page.click("#login-button");

    // // console.log(page.type("h3.mt-3.mb-2.text-dark.text-center"))
    // var a = await page.content();
    // console.log(a)
    // page.close();

    await page.goto("https://www.betnwins.com/");
    await page.click("button.navbar-toggler");
    await page.waitForSelector("#username");
    await page.type("#username", "Tv1001", { delay: 100 });
    await page.type("#password", "56789", { delay: 100 });
    // await page.click("button[id='login-account']");
    // await page.click("btn.btn-success.d-block");
    await page.waitForSelector("#login-account");
    await page.click("#login-account");

    // await page.waitForSelector(".az-body")
    await page.waitForNavigation({
        waitUntil: "networkidle2",
    })


    // console.log(page.type("h3.mt-3.mb-2.text-dark.text-center"))
    var contentPage = await page.content();
    // console.log(a)
    const $ = cheerio.load(contentPage);
    $.html();
    console.log($(".table.table-hover tr:nth-child(2) td:nth-child(1)").text().trim())
    page.close();

}


Loginbetnwins()
// (async () => {

// })();

const LoginIbet = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // await page.goto("https://blab.bdata.link/");
    // // await page.waitForSelector(".form-group mr-2");
    // await page.type("input[name='username']", "tinht", { delay: 100 });
    // await page.type("input[name='password']", "bdata@123", { delay: 100 });
    // // await page.click("#login-button");

    // // console.log(page.type("h3.mt-3.mb-2.text-dark.text-center"))
    // var a = await page.content();
    // console.log(a)
    // page.close();

    await page.goto("https://ibet.ag/");
    // await page.click("button.navbar-toggler");
    // await page.waitForSelector("#username");
    // await page.type("#username", "Tv1001", { delay: 100 });
    // await page.type("#password", "56789", { delay: 100 });
    // // await page.click("button[id='login-account']");
    // // await page.click("btn.btn-success.d-block");
    // await page.waitForSelector("#login-account");
    // await page.click("#login-account");

    // // await page.waitForSelector(".az-body")
    // await page.waitForNavigation({
    //     waitUntil: "networkidle2",
    // })


    // // console.log(page.type("h3.mt-3.mb-2.text-dark.text-center"))
    // var contentPage = await page.content();
    // // console.log(a)
    // const $ = cheerio.load(contentPage);
    // $.html();
    // console.log($(".table.table-hover tr:nth-child(2) td:nth-child(1)").text().trim())
    // page.close();
}

// LoginIbet();



const LoginPig11 = async () => {//ok
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://pig11.com/Logins/001/sites/pig11/index.aspx");
    await page.waitForSelector("#txtAccessOfCode");
    await page.type("#txtAccessOfCode", "testing1", { delay: 100 });
    await page.type("#txtAccessOfPassword", "testing123", { delay: 100 });
    await page.waitForSelector("#cmdSignOn");
    await page.click("#cmdSignOn");

    await page.waitForNavigation({
        waitUntil: "networkidle2",
    })


    // var contentPage = await page.content();
    // // console.log(a)
    // const $ = cheerio.load(contentPage);
    // $.html();
    // console.log($(".table.table-hover tr:nth-child(2) td:nth-child(1)").text().trim())
    // page.close();

}
// LoginPig11()
//==============================================
const LoginLiveactionbets = async () => {//k đc
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://liveactionbets.com/");
    await page.waitForSelector(".loginform");
    await page.type("input[name='customerID']", "NT88901", { delay: 100 });
    await page.type("input[name='Password']", "test", { delay: 100 });

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

}

// LoginLiveactionbets();

//=================
const login3funplay = async () => {//ok

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
}

// login3funplay();
//==========================
const loginSbobet = async () => {//ko đc

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
}
// loginSbobet();

//===========
const login2bet = async () => {//ko đc

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
}
// login2bet();

//===========
const loginplaysports365 = async () => {//ko đc

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
}
// loginplaysports365();
//===========
const login8platinum = async () => {//ko đc

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://8platinum.com/");
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
}
// login8platinum();