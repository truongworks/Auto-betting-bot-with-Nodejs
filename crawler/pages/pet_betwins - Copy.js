var puppeteer = require("puppeteer");
const cheerio = require('cheerio');
var tools = require("../connect.js");


var historysql = "SELECT crh.`id`, crh.`sportname`, crh.`Tournaments`, t.`teamName` team, crh.`score`, crh.`date`, crh.`amount` FROM crawhistory crh JOIN team t ON crh.team = t.teamAcronyms";
tools.selectSql(historysql, (err, res) => {
    if (err) return err;
    if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
            var item = res[i];
            LoginBet2(item)
        }
    } else {
        browser.close()
    }
})
const LoginBet2 = async (item) => {
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
    await page.type("#username", "Tv1001", { delay: 10 });
    await page.type("#password", "56789", { delay: 10 });
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

    await page.waitForSelector("a#azNavShow");
    await page.click("a#azNavShow");

    await page.waitForSelector("body.az-body.az-navbar-show");
    await page.waitForTimeout(1000);
    await page.click("a#ctl00_SingleTemplateControl1_lnk1.nav-link");
    await page.waitForSelector("div#accordionLeagues");
    var sql = "SELECT `id`, `bot_id`, `sport`, `Tournaments`, `team`, `date`, `DatePlaced`, `linedesc`, `WagerType`, `amount`, `timestamp` FROM `battle` WHERE bot_id= 14 AND sport = '" + item?.sportname + "' AND Tournaments= '" + item?.Tournaments + "' AND team LIKE '%" + item?.team + "%' AND team LIKE '%" + item?.score + "%' AND DatePlaced = '" + item?.date + "'";

    await tools.selectSql(sql, async (err, check) => {
        if (check?.length == 0) {
            var contentPage = await page.content();
            var $ = cheerio.load(contentPage);
            $.html();
            var inputval = "";
            $('div.card div.card-header h5 a').each(function () {
                if ($(this).text() == item?.sportname) {
                    const content = $(this).parents('.card').find('.form-check.noPadingLeague');
                    content.each(function () {
                        if ($(this).text().trim() == item?.Tournaments) {
                            inputval = $(this).find("input").val();
                            return;
                        }
                    });
                    return;
                }
            });
            if (inputval != "") {
                await page.click("input[value='" + inputval + "']");
                await page.waitForSelector("input[type='submit']");
                await page.click("input[type='submit']");
                await page.waitForNavigation({
                    waitUntil: "networkidle2",
                })
                const contentSport = await page.content();
                $ = cheerio.load(contentSport);
                var idsport = "";
                $.html();
                $('div.gamesRow div.teamRow div.oddsTeam').each(function () {

                    if ($(this).text().trim().toUpperCase().indexOf(item?.team.toUpperCase()) > -1) {
                        const content = $(this).parents('.teamRow').find('div.oddsBox input').next();
                        content.each(async function () {
                            console.log(33333, $(this).text().trim(), item?.score, $(this).text().trim() == item?.score)
                            if ($(this).text().trim() == item?.score) {
                                if ($(this).attr('id') && idsport == '') {
                                    idsport = $(this).attr('id')
                                }
                                return false;
                            }
                        });
                        return false;
                    }
                });
                if (idsport != "") {
                    await page.click(`a[id="` + idsport + `"]`)
                    await page.click('input[type="submit"].btn.btn-success');
                    await page.waitForNavigation({
                        waitUntil: "networkidle2",
                    })
                    await page.type("input[type='text']", "'" + item?.amount + "'", { delay: 100 })
                    await page.click('input[value="1"]#RISKWIN');
                    await page.click('input[type="submit"].btn.btn-success');
                    await page.waitForNavigation({
                        waitUntil: "networkidle2",
                    })
                    const checksuccess = (await page.$$("tbody tr td[data-content='WagerType:']")).length;

                    if (checksuccess > 0) {
                        var WagerType = await page.$eval("tbody tr td[data-content='WagerType:']", el => el.textContent);
                        var dateevent = await page.$eval("tbody tr td[data-content='Date:']", el => el.textContent)
                        var Team = await page.$eval("tbody tr td[data-content='Team:']", el => el.textContent)
                        var Tournaments = item?.Tournaments;
                        var amount = await page.$eval("tbody tr td[data-content='Risking / To Win']", el => el.textContent)
                        var sport = item?.sportname;
                        var DatePlaced = item?.date;
                        console.log(111, WagerType)
                        console.log(111, dateevent)
                        console.log(111, Team)
                        console.log(111, Tournaments)
                        console.log(111, amount)
                        var valueevent = [[14, sport, Tournaments, Team, dateevent, DatePlaced, WagerType, amount]];
                        // await page.click('input[type="submit"].btn.btn-success');
                        // await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `date`, `DatePlaced`, `WagerType`, `amount`) VALUES ?", valueevent);
                        // browser.close();

                    } else {

                        browser.close();
                    }
                } else {
                    browser.close();
                }

            } else {
                browser.close();
            }
        } else {
            browser.close();
        }
    })


}
