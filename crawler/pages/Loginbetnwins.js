var puppeteer = require("puppeteer");
const cheerio = require('cheerio');
const http = require('http');
var url = require('url')
var tools = require("../connect.js");
var toolsCraw = require("./crawbattle.js");

// const server = http.createServer(async (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     var params = url.parse(req.url, true).query;
//     if (params?.id) {
//         await toolsCraw.CrawHistory((kq) => {
//             res.end('1')//thành công
//             console.log(23423452435543);
//         });
//     }

// })


const LoginBet2 = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const pages = await browser.pages();
    if (pages.length > 1) {//đóng tap trống đầu tiên
        await pages[0].close();
    }
    await page.setDefaultNavigationTimeout(0);//set thời gian chờ tải trang  không giới hạn

    await page.goto("https://www.betnwins.com/");
    await page.click("button.navbar-toggler");
    await page.waitForSelector("#username");
    await page.type("#username", "Tv1001", { delay: 100 });
    await page.type("#password", "56789", { delay: 100 });
    // await page.click("button[id='login-account']");
    // await page.click("btn.btn-success.d-block");
    await page.waitForSelector("#login-account");
    await page.click("#login-account");
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    let datetime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    var value = [[14, datetime]]
    await tools.InserSql("INSERT INTO `last_login`( `bot_id`, `time`) VALUES ?", value);
    // await page.waitForSelector(".az-body")
    await page.waitForNavigation({
        waitUntil: "networkidle2",
    })
    // await page.waitForSelector("a#azNavShow");
    // await page.click("a#azNavShow");

    // await page.waitForSelector("body.az-body.az-navbar-show");
    // await page.waitForTimeout(1000);
    // await page.click("a#ctl00_SingleTemplateControl1_lnk1.nav-link");
    // await page.waitForSelector("div#accordionLeagues");

    // var contentPage = await page.content();
    // var $ = cheerio.load(contentPage);
    // var inputval = "";
    // $.html();
    // // console.log($(".table.table-hover tr:nth-child(2) td:nth-child(1)").text().trim())
    // $('div.card div.card-header h5 a').each(function () {
    //     if ($(this).text() == "FOOTBALL") {
    //         const content = $(this).parents('.card').find('.noPadingLeague');
    //         content.each(function () {
    //             if ($(this).text().trim() == "NFL") {
    //                 inputval = $(this).find("input").val();
    //                 return;
    //             }
    //         });
    //         return;
    //     }
    // });
    // await page.click("input[value='" + inputval + "']");
    // await page.waitForSelector("input[type='submit']");
    // await page.click("input[type='submit']");

    // await page.waitForNavigation({
    //     waitUntil: "networkidle2",
    // })
    // const contentSport = await page.content();
    // $ = cheerio.load(contentSport);
    // var idsport = "";
    // $.html();
    // $('div.gamesRow div.teamRow div.oddsTeam').each(function () {

    //     if ($(this).text().trim().toUpperCase().indexOf('CLEVELAND BROWNS') > -1) {
    //         const content = $(this).parents('.teamRow').find('div.oddsBox a');
    //         content.each(async function () {
    //             if ($(this).text().trim() == "+6-105") {
    //                 if ($(this).attr('id') && idsport == '') {
    //                     idsport = $(this).attr('id')
    //                 }
    //                 return false;
    //             }
    //         });
    //         return false;
    //     }
    // });
    // if (idsport != "") {
    //     await page.click("#" + idsport);
    //     await page.click('input[type="submit"].btn.btn-success');
    //     await page.waitForNavigation({
    //         waitUntil: "networkidle2",
    //     })


    //     await page.type("input[type='text']", '10', { delay: 100 })
    //     await page.click('input[value="1"]#RISKWIN');
    //     // await page.click('input[type="submit"].btn.btn-success');
    //     await page.waitForNavigation({
    //         waitUntil: "networkidle2",
    //     })

    //     var WagerType = await page.$eval("tbody tr td[data-content='WagerType:']", el => el.textContent);
    //     var dateevent = await page.$eval("tbody tr td[data-content='Date:']", el => el.textContent)
    //     var Team = await page.$eval("tbody tr td[data-content='Team:']", el => el.textContent)
    //     var Tournaments = 'NFL';
    //     var amount = await page.$eval("tbody tr td[data-content='Risking / To Win']", el => el.textContent)
    //     console.log(111, WagerType)
    //     console.log(111, dateevent)
    //     console.log(111, Team)
    //     console.log(111, Tournaments)
    //     console.log(111, amount)
    //     var valueevent = [[14, Tournaments, Team, dateevent, WagerType, amount]];
    //     await page.click('input[type="submit"].btn.btn-success');
    //     await tools.InserSql("INSERT INTO `battle`( `bot_id`, `Tournaments`, `team`, `date`, `WagerType`, `amount`) VALUES ?", valueevent);

    //     Login10Stack('FOOTBALL', 'NFL', 'CLEVELAND BROWNS', "+6-105")
    // }

}


const Login10Stack = async (sport, typeSport, teamName, Spread) => {

    // console.log(new Date())
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const pages = await browser.pages();
    if (pages.length > 1) {//đóng tap trống đầu tiên
        await pages[0].close();
    }
    await page.setDefaultNavigationTimeout(0);//set thời gian chờ tải trang  không giới hạn

    await page.goto("https://www.10stack.com/");
    await page.waitForSelector("input[name='bpLoginUsername']");
    await page.type("input[name='bpLoginUsername']", "Tin1013", { delay: 100 });
    await page.type("input[name='bpLoginPassword']", "123", { delay: 100 });

    await page.waitForSelector("#bpLoginSubmit");
    await page.click("#bpLoginSubmit");
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    let datetime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    await tools.InserSql("INSERT INTO `last_login`( `bot_id`, `time`) VALUES (13, '" + datetime + "')");

    await page.waitForNavigation({
        waitUntil: "networkidle2",
    })
    await page.waitForSelector("#sport-1-leagues");
    var el = await page.$("div#sport-1-leagues .panel-body ul li:first-child input");
    await el.click();
    // await page.waitForSelector("div#sport-1-leagues .panel-heading .panel-btn button.btn-success");
    // var continuebt = await page.$("div#sport-1-leagues .panel-heading .panel-btn button.btn-success");
    // continuebt.click()
    await page.$eval('div#sport-1-leagues .panel-body ul li:first-child input', check => check.checked = true)
    var continuebt = await page.$("div#sport-1-leagues .panel-heading .panel-btn button.btn-success");
    continuebt.click()
    // const text = await page.$eval('div#sport-1-leagues .panel-body ul li:first-child input', el => el.textContent)
    // console.log(text)

    //--------------

    await page.waitForNavigation({
        waitUntil: "networkidle2",
    })
    await page.waitForSelector("#lines-form");
    await page.waitForSelector("table.table")

    ///lấy el by text

    const tableRows = 'tbody tr'
    // const rowCount = await page.$$eval(tableRows, (e) => e.length)

    // // At least 1 row exists in table body
    // if (rowCount == 0) {
    //     browser.close()
    //     throw new Error(`no elements found with locator, '${tableRows}'`)
    // }

    // for (let i = 0; i < rowCount; i++) {
    //     const str = await page.$eval(
    //         `tbody tr:nth-child(${i + 1}) td:nth-child(1) span.team-name`,
    //         (e) => e.innerText
    //     )
    //     console.log(1111, str)
    //     if (str === "New Orleans Saints") {
    //         await page.click(
    //             `tbody tr:nth-child(${i + 1}) td:nth-child(2) input`
    //         )
    //         break;
    //     }
    // }
    var contentPage = await page.content();
    const $ = cheerio.load(contentPage);
    var valueInput = '';
    $('tbody tr td span.team-name').each(function () {
        if ($(this).text().toUpperCase().trim() == teamName) {

            const content = $(this).parents("tr").find('td.txt-r');
            content.each(function () {
                if ($(this).find("span.game-lines span.l-checkbox select").length > 0) {
                    if ($(this).find("span.game-lines span.l-checkbox select option:selected").text().trim() == Spread) {
                        valueInput = $(this).find("span.game-lines span.l-checkbox input[type='checkbox']").val();
                    }
                } else {
                    if ($(this).find("span.game-lines span.l-checkbox").text().trim() == Spread) {
                        valueInput = $(this).find("span.game-lines span.l-checkbox input[type='checkbox']").val();
                    }
                }
            });
            return;
        }
    })

    if (valueInput != "") {
        await page.click("input[value='" + valueInput + "']");
        await page.click('div.panel.panel-primary.row div.panel-btn button[type="button"].btn.btn-success');
        await page.waitForNavigation({
            waitUntil: "networkidle2",
        })

        await page.type("input[id='same-amt']", '50', { delay: 100 })
        await page.click("button[type='button'].btn-success.btn-continue");
        await page.waitForNavigation({
            waitUntil: "networkidle2",
        })
        const checkerr = (await page.$$("ul.errorMessage")).length;
        if (checkerr < 1) {
            var WagerType = await page.$eval("h3.panel-title", el => el.textContent);
            var dateevent = await page.$eval("tbody tr td span.date", el => el.textContent)
            var Team = await page.$eval("tbody tr td span.team-name", el => el.textContent)
            var linedesc = await page.$eval("tbody tr td span.line-desc", el => el.textContent)
            var Tournaments = typeSport;
            var amount = (await page.$eval("tbody tr td.amts", el => el.textContent)).trim()
            var valueevent = [[13, Tournaments, Team, dateevent, WagerType, amount]];
            console.log(111, WagerType)
            console.log(111, dateevent)
            console.log(111, Team)
            console.log(111, Tournaments)
            console.log(111, linedesc)
            console.log(111, amount)
            // await page.type("input[type='password']", '5678', { delay: 100 });
            // await page.click("button[type='button'].btn-success.btn-submit");
            // await tools.InserSql("INSERT INTO `battle`( `bot_id`, `Tournaments`, `team`, `date`, `WagerType`, `amount`) VALUES ?", valueevent);
        }
    }


    // // await page.click("table.table tr:nth-child(1) td:nth-child(2) input");
    // await page.click("div#league-lines-1 button.btn-continue")

    // // //-----------
    // await page.waitForNavigation({
    //     waitUntil: "networkidle2",
    // })
    // await page.waitForSelector("#wager-form");
    // await page.type("input#same-amt", "5", { delay: 100 });
    // await page.waitForSelector("div.btn-group.btn-group-justified")
    // // await page.click("button.btn-continue");
    process.exit()
}

Login10Stack('FOOTBALL', 'NFL', 'CLEVELAND BROWNS', "+6-105")
// server.listen("333", function () {
//     console.log('listening on *:333');
// })