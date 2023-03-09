var puppeteer = require("puppeteer");
const cheerio = require('cheerio');
var tools = require("../connect.js");
// var toolsBetWins = require("./pet_betwins");
var tools10stack = require("./pet_10stack");
var tools8Platinum = require("./8platinum.com");
var toolspet_2bet = require("./pet_2bet");
var toolPig11 = require("./LoginPig11");
var toolBetnwins = require("./pet_betwins");
var toolIbet = require("./loginibet");

// var reload = false;

const CrawHistory = async () => {
    var sqlAcount = "SELECT `id`, `botname`, `username`, `password` FROM `bot` WHERE delf = 0 AND id = 2";

    tools.selectSql(sqlAcount, async (erracc, resacc) => {
        if (erracc) return erracc;
        if (resacc.length > 0) {
            var username = resacc[0]?.username;
            var password = resacc[0]?.password;
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            const pages = await browser.pages();
            if (pages.length > 1) {//đóng tap trống đầu tiên
                await pages[0].close();
            }
            await page.setDefaultNavigationTimeout(0);
            await page.goto("https://liveactionbets.com/");
            await page.waitForSelector(".loginform");
            await page.type("input[name='customerID']", username, { delay: 100 });
            await page.type("input[name='Password']", password, { delay: 100 });

            await page.waitForSelector("button[data-action='login']");
            await page.click("button[data-action='login']");
            await page.waitForNavigation({
                waitUntil: "networkidle2",
            })

            await page.waitForSelector("div.right-menu")
            await page.click("div.right-menu div[data-action='show-menu-right'] i");
            await page.waitForSelector("div.sub-menu-right.slideInRight ul li[data-action='get-figure']");
            await page.waitForTimeout(100)
            await page.click("div.sub-menu-right.slideInRight ul li[data-action='get-figure']")
            await page.waitForNetworkIdle()
            await page.waitForSelector("div.head-report ul li[data-action='get-pending']")
            await page.click("div.head-report ul li[data-action='get-pending'] span[data-language='L-233']")
            var tableRows = "table.tablesorter"
            await page.waitForSelector("table.tablesorter")
            const rowCount = await page.$$eval(tableRows, (e) => e.length)
            var numInsert = 0;
            if (rowCount > 0) {
                var contentPage = await page.content();
                const $ = cheerio.load(contentPage);
                var i = 0;
                var sql = "INSERT INTO `crawhistory`(`sportname`, `Tournaments`, `code`, `team`, `score`, `date`, `date_event`, `amount`, `game`) VALUES ?";
                var checkloop = $("table.tablesorter tbody tr").length;
                $("table.tablesorter tbody tr").each(async function (index) {
                    var score = $(this).find("td span.line-selected")?.clone().children().remove().end().text().replace(/\s+/g, '');
                    var team = $(this).find("td span.choosen").text()
                    var amount = $(this).find("td.risk-col span").text()?.trim();
                    var str = $(this).find("td div.single-bet.content-descripcion div[class*='selection-'] div.d-r").text().split('-');
                    var tournament = str[0]?.trim();
                    if (str.length > 1) {
                        var str_code = str[1]?.trim().split(' ');
                        var code = str_code[0];

                        var date = "";
                        var date_event = "";
                        var game = "";
                        var sportname = 'FOOTBALL';
                        $(this).find("td div.content-descripcion div.header-bet div.ln div.d-l").each(function () {

                            if ($(this).text().trim() == "Accepted") {
                                date = $(this).next().text().trim();
                            }
                            if ($(this).text().trim() == "Scheduled") {
                                date_event = $(this).next().text().trim();
                            }
                            if ($(this).text().trim() == "Game:") {
                                game = $(this).next().text().trim();
                            }
                        })
                        var checkexist = "SELECT `id`, `sportname`, `Tournaments`, `team`, `score`, `date`, `amount` FROM `crawhistory` WHERE `sportname`= '" + sportname + "'AND `Tournaments` = '" + tournament + "' AND `team` = '" + team + "' AND `score` = '" + score + "' AND `date` = '" + date + "' AND `date_event` = '" + date_event + "' AND `amount` = '" + amount + "'";
                        // console.log(checkexist)
                        await tools.selectSql(checkexist, async (err, result) => {
                            if (err) {
                                // tools.endconnect();
                                browser.close();
                                if (numInsert > 0) {
                                    Reload(true)
                                } else {
                                    Reload(false)
                                }

                                return;
                            }
                            if (result.length == 0) {
                                numInsert++;
                                var valueevent = [[sportname, tournament, code, team, score, date, date_event, amount, game]];
                                await tools.InserSql(sql, valueevent);
                            }
                            if (index == (checkloop - 1)) {
                                // tools.endconnect()
                                browser.close()
                                if (numInsert > 0) {
                                    Reload(true)
                                } else {
                                    Reload(false)
                                }

                            }
                        })
                    } else {
                        if (index == (checkloop - 1)) {
                            // tools.endconnect()
                            browser.close()
                            if (numInsert > 0) {
                                Reload(true)
                            } else {
                                Reload(false)
                            }

                        }
                    }

                })

            } else {
                // tools.endconnect()
                browser.close()
                Reload(false)
            }
        }
    })
};

// CrawHistory(() => {
//     // process.exit();
CrawHistory()
// })
const run10stack = () => {
    tools10stack?.getHistory()
}
const run8Platinum = () => {
    tools8Platinum?.getHistory()
}
const runpet_2bet = () => {
    toolspet_2bet?.getHistory()
}
const runPig11 = () => {
    toolPig11?.getHistory()
}
const runBetnwins = () => {
    toolBetnwins?.getHistory()
}
const runIbet = () => {
    toolIbet?.getHistory()
}
const Reload = (status) => {
    console.log(status)
    if (status) {
        run10stack()
        run8Platinum()
        runpet_2bet()
        runPig11()
        runBetnwins()
        runIbet()
    }
    setTimeout(() => {
        CrawHistory()
    }, 600000);
}
module.exports = { CrawHistory }; 