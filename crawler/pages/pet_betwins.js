const puppeteer = require('puppeteer-extra')
const cheerio = require('cheerio');
var tools = require("../connect.js");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const { executablePath } = require('puppeteer')

const getHistory = async () => {
    var historysql = "SELECT crh.`id`, crh.`sportname`, crh.`Tournaments`, crh.`team`, crh.`score`, crh.`date`, crh.`amount`, crh.code FROM crawhistory crh  WHERE crh.`id` not in (SELECT crawid FROM `battle` WHERE bot_id= 14)";
    tools.selectSql(historysql, (err, res) => {
        if (err) return err;
        if (res.length > 0) {
            LoginBet2(res)
            // console.log(res);
        } else {
            // callback()
        }
    })
}

const LoginBet2 = async (res = []) => {
    var sqlAcount = "SELECT `id`, `botname`, `username`, `password`, `amount`, `max_score` FROM `bot` WHERE delf = 0 AND id = 14";
    tools.selectSql(sqlAcount, async (erracount, resacc) => {
        if (erracount) return erracount;
        if (resacc.length > 0) {
            var username = resacc[0]?.username;
            var password = resacc[0]?.password;
            var amountPet = resacc[0]?.amount;
            var max_score = resacc[0]?.max_score;

            const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() });
            const page = await browser.newPage();
            const pages = await browser.pages();
            if (pages.length > 1) {//đóng tap trống đầu tiên
                await pages[0].close();
            }
            await page.setDefaultNavigationTimeout(0);//set thời gian chờ tải trang  không giới hạn

            await page.goto("https://www.betnwins.com/");
            await page.click("button.navbar-toggler");
            await page.waitForSelector("#username");
            await page.type("#username", username, { delay: 10 });
            await page.type("#password", password, { delay: 10 });
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

            await page.waitForSelector("a#azNavShow");
            await page.click("a#azNavShow");

            await page.waitForSelector("body.az-body.az-navbar-show");
            await page.waitForTimeout(1000);
            await page.click("a#ctl00_SingleTemplateControl1_lnk1.nav-link");
            await page.waitForSelector("div#accordionLeagues");
            for (let i = 0; i < res.length; i++) {
                var item = res[i];
                var sql = "SELECT `id`, `bot_id`, `sport`, `Tournaments`, `team`, `date`, `DatePlaced`, `linedesc`, `WagerType`, `amount`, `timestamp` FROM `battle` WHERE bot_id= 14 AND sport = '" + item?.sportname + "' AND Tournaments= '" + item?.Tournaments + "' AND team LIKE '%" + item?.team + "%' AND team LIKE '%" + item?.score + "%' AND DatePlaced = '" + item?.date + "'";

                var contentPage = await page.content();
                var $ = cheerio.load(contentPage);
                $.html();
                var inputval = "";
                var datacheckbox = [];
                $('div.card div.card-header h5 a').each(function () {
                    if ($(this).text().search("FOOTBALL") > -1 || $(this).text().search("BASKETBALL") > -1) {
                        const content = $(this).parents('.card').find('.form-check.noPadingLeague');
                        content.each(function () {
                            //     }
                            datacheckbox.push($(this).find("input").val())
                        });
                        return;
                    }
                });
                //
                // $('div.card .form-check.noPadingLeague').each(function () {
                //     // if ($(this).text() == item?.sportname) {
                //     //     const content = $(this).parents('.card').find('.form-check.noPadingLeague');
                //     //     content.each(function () {
                //     if ($(this).text().trim() == item?.Tournaments) {
                //         inputval = $(this).find("input").val();
                //         return;
                //     }
                //     // });
                //     // return;
                //     // }
                // });
                //
                // const checkclick = await page.evaluate(() => {
                //     const checkboxlist = document.querySelectorAll('div.card .form-check.noPadingLeague input');
                //     var i = 0;
                //     for (const checkbox of checkboxlist) {
                //         if (i < 20) {
                //             if (!checkbox.checked) checkbox.click();
                //             i++
                //         } else {
                //             break;
                //         }
                //     }
                //     return true;
                // })
                if (datacheckbox.length > 0) {
                    for (let i = 0; i < datacheckbox.length; i++) {
                        await page.$eval("input[value='" + datacheckbox[i] + "']", check => check.checked = true)
                    }
                    await page.waitForSelector("input[type='submit']");
                    await page.click("input[type='submit']");
                    await page.waitForNavigation({
                        waitUntil: "networkidle2",
                    })
                    const contentSport = await page.content();
                    $ = cheerio.load(contentSport);
                    var idsport = "";
                    var idsportSuggest = "";
                    var scoreChoosed = "";

                    var itemScorearr = item?.score?.split(/[-+]/);
                    var ItemscoreEnd = itemScorearr[itemScorearr.length - 1];
                    var ItemscoreStart = item?.score.slice(0, item?.score.indexOf(itemScorearr[itemScorearr.length - 1]));
                    $.html();
                    $('div.gamesRow div.teamRow div.oddsTeam span.TEAM-rot').each(function () {
                        if ($(this).text().trim() == item?.code) {
                            const content = $(this).parents('.teamRow').find('div.oddsBox input').next();
                            content.each(async function () {
                                var strarr = $(this).text()?.trim()?.replace(/\s+/g, '').split(/[-+]/);
                                var scoreEnd = strarr[strarr.length - 1];
                                var scoreStart = $(this).text()?.trim()?.replace(/\s+/g, '').slice(0, $(this).text()?.trim()?.replace(/\s+/g, '').indexOf(strarr[strarr.length - 1]));
                                if (idsportSuggest == "" && ItemscoreStart?.toUpperCase() == scoreStart?.toUpperCase() && ItemscoreEnd <= (Number(scoreEnd) + Number(max_score))) {
                                    idsportSuggest = $(this).attr('id');
                                    scoreChoosed = $(this).text()?.trim()?.replace(/\s+/g, '');
                                }

                                if ($(this).text()?.trim()?.replace(/\s+/g, '')?.toUpperCase() == item?.score?.toUpperCase()) {
                                    if ($(this).attr('id') && idsport == '') {
                                        idsport = $(this).attr('id')
                                        scoreChoosed = $(this).text()?.trim()?.replace(/\s+/g, '');
                                    }
                                    return false;
                                }
                            });
                            return false;
                        }
                    });
                    if (idsport == "" && idsportSuggest != "") {
                        idsport = idsportSuggest;
                    }

                    if (idsport != "") {
                        await page.click(`a[id="` + idsport + `"]`)
                        await page.click('input[type="submit"].btn.btn-success');
                        await page.waitForNavigation({
                            waitUntil: "networkidle2",
                        })
                        await page.type("input[type='text']", "'" + amountPet + "'", { delay: 100 })
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
                            // console.log(111, dateevent)
                            // console.log(111, Team)
                            // console.log(111, Tournaments)
                            // console.log(111, amount)
                            var valueevent = [[14, sport, Tournaments, Team, scoreChoosed, dateevent, DatePlaced, WagerType, amount, item?.id, 1]];
                            await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`,`score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
                            await page.click('input[type="submit"].btn.btn-success');

                            await page.waitForNavigation({
                                waitUntil: "networkidle2",
                            })
                            if (i < res.length - 1) {
                                await page.waitForSelector("a#azNavShow");
                                await page.click("a#azNavShow");

                                await page.waitForSelector("body.az-body.az-navbar-show");
                                await page.waitForTimeout(1000);
                                await page.click("a#ctl00_SingleTemplateControl1_lnk1.nav-link");
                                await page.waitForSelector("div#accordionLeagues");
                            } else {
                                // await tools.endconnect();
                                browser.close();
                                // callback(1)
                            }
                        } else {
                            var valueevent = [[14, item?.sportname, item?.Tournaments, item?.team, item?.score, datetime, item?.date, '', amountPet, item?.id, 0]];
                            await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`,`score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
                            if (i < res.length - 1) {
                                //tiếp tục
                                await page.waitForSelector("a#azNavShow");
                                await page.click("a#azNavShow");

                                await page.waitForSelector("body.az-body.az-navbar-show");
                                await page.waitForTimeout(1000);
                                await page.click("a#ctl00_SingleTemplateControl1_lnk1.nav-link");
                                await page.waitForSelector("div#accordionLeagues");
                            } else {
                                // await tools.endconnect();
                                browser.close();
                                // callback(1)
                            }
                        }
                    } else {
                        var valueevent = [[14, item?.sportname, item?.Tournaments, item?.team, item?.score, datetime, item?.date, '', amountPet, item?.id, 2]];
                        await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`,`score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
                        if (i < res.length - 1) {
                            //tiếp tục
                            await page.waitForSelector("a#azNavShow");
                            await page.click("a#azNavShow");

                            await page.waitForSelector("body.az-body.az-navbar-show");
                            await page.waitForTimeout(1000);
                            await page.click("a#ctl00_SingleTemplateControl1_lnk1.nav-link");
                            await page.waitForSelector("div#accordionLeagues");
                        } else {
                            // await tools.endconnect();
                            browser.close();
                            // callback(1)
                        }


                    }

                } else {
                    var valueevent = [[14, item?.sportname, item?.Tournaments, item?.team, item?.score, datetime, item?.date, '', amountPet, item?.id, 2]];
                    await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`,`score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
                    if (i < res.length - 1) {
                        //tiếp tục
                        await page.waitForSelector("a#azNavShow");
                        await page.click("a#azNavShow");

                        await page.waitForSelector("body.az-body.az-navbar-show");
                        await page.waitForTimeout(1000);
                        await page.click("a#ctl00_SingleTemplateControl1_lnk1.nav-link");
                        await page.waitForSelector("div#accordionLeagues");
                    } else {
                        // await tools.endconnect();
                        browser.close();
                        // callback(1)
                    }
                }
            };
        }
    })
}

// getHistory(() => { process.exit(); })
module.exports = { getHistory };