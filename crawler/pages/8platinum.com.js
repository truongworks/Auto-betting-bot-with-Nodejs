var puppeteer = require("puppeteer");
const cheerio = require('cheerio');
var tools = require("../connect.js");

// var historysql = "SELECT crh.`id`, crh.`sportname`, crh.`Tournaments`, crh.`team`, crh.`score`, crh.`date`, crh.`amount`, crh.code FROM crawhistory crh  WHERE crh.`id` not in (SELECT crawid FROM `battle` WHERE bot_id= 8)";
// tools.selectSql(historysql, (err, res1) => {
//     if (err) return err;
//     if (res1.length > 0) {
//         Loginibet(res1)
//     }
// })
const getHistory = async () => {
    var historysql = "SELECT crh.`id`, crh.`sportname`, crh.`Tournaments`, crh.`team`, crh.`score`, crh.`date`, crh.`amount`, crh.code FROM crawhistory crh  WHERE crh.`id` not in (SELECT crawid FROM `battle` WHERE bot_id= 8)";
    tools.selectSql(historysql, (err, res1) => {
        if (err) return err;
        if (res1.length > 0) {
            Loginibet(res1)
        } else {
            // callback()
        }
    })
}
const Loginibet = async (res1 = []) => {
    var sqlAcount = "SELECT `id`, `botname`, `username`, `password`, `max_score`, `amount` FROM `bot` WHERE delf = 0 AND id = 8";
    tools.selectSql(sqlAcount, async (err, res) => {
        if (err) return err;
        if (res.length > 0) {
            var username = res[0]?.username;
            var password = res[0]?.password;
            var max_score = res[0]?.max_score;
            var amount = res[0]?.amount;
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            const pages = await browser.pages();
            if (pages.length > 1) {//đóng tap trống đầu tiên
                await pages[0].close();
            }
            await page.setDefaultNavigationTimeout(0);//set thời gian chờ tải trang  không giới hạn

            await page.goto("https://8platinum.com/");
            await page.waitForSelector("form[data='frmLogin']");
            await page.type("input[name='UserName']", username, { delay: 100 });
            await page.type("input[name='Password']", password, { delay: 100 });

            await page.waitForSelector("button[data='btnLogin']");
            await page.click("button[data='btnLogin']");

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
            var value = [[8, datetime]]
            await tools.InserSql("INSERT INTO `last_login`( `bot_id`, `time`) VALUES ?", value);
            // await page.waitForSelector(".az-body")
            await page.waitForNavigation({
                waitUntil: "networkidle2",
            })

            var contentPage = await page.content();
            var $ = cheerio.load(contentPage);
            var inputval = '';
            var idsubmit = "";

            $.html();
            for (let i = 0; i < res1.length; i++) {
                var item = res1[i];
                var sql = "SELECT `id`, `bot_id`, `sport`, `Tournaments`, `team`, `date`, `DatePlaced`, `linedesc`, `WagerType`, `amount`, `timestamp` FROM `battle` WHERE bot_id= 8 AND sport = '" + item?.sportname + "' AND Tournaments= '" + item?.Tournaments + "' AND team LIKE '%" + item?.team + "%' AND team LIKE '%" + item?.score + "%' AND DatePlaced = '" + item?.date + "'";
                var contentPage = await page.content();
                var $ = cheerio.load(contentPage);
                // await page.click('.card .card-header ul li button[id$="-SelectAll"]');

                let btnSelectAll = (await page.$$('.card .card-header ul li button.check-box-sports'))
                btnSelectAll.forEach(async (btn) => {
                    try {
                        await btn.evaluate(b => b.click())
                    } catch (error) {
                        console.log(error);
                    }
                })
                var continuebt = await page.$("div#bottonBarDesk .p-2 .col-xl-1 button.btn-success");
                continuebt.click()
                await page.waitForNavigation({
                    waitUntil: "networkidle2",
                })
                const contentSport = await page.content();
                $ = cheerio.load(contentSport);
                $.html();
                var valueInput = '';
                var idsportSuggest = "";
                var itemScorearr = item?.score?.split(/[-+]/);
                var ItemscoreEnd = itemScorearr[itemScorearr.length - 1];
                var ItemscoreStart = item?.score.slice(0, item?.score.indexOf(itemScorearr[itemScorearr.length - 1]));
                var scoreChoosed = "";

                $('.container-for-filter .bet-item-title').each(function () {
                    let Code = $(this).find(".lbet-teamdescription").first().text().replace('[', '').replace(']', '');
                    if (Code.trim() == item?.code) {
                        const content = $(this).parents('.bet-item').find('div.custom-checkbox.cl-checkbox');
                        console.log("score", item?.score);
                        content.each(async function () {
                            console.log("ok2");
                            var NameScore = $(this).text().trim().replace(/\s+/g, '');
                            var strarr = NameScore.split(/[-+]/);
                            var scoreEnd = strarr[strarr.length - 1];
                            var scoreStart = NameScore.slice(0, NameScore.indexOf(strarr[strarr.length - 1]));

                            var tiso1 = "";
                            var tiso2 = "";

                            if (idsportSuggest == "" && ItemscoreStart?.toUpperCase() == scoreStart?.toUpperCase() && ItemscoreEnd <= (Number(scoreEnd) + max_score)) {
                                console.log("check id 1");
                                idsportSuggest = $(this).find("input[type='checkbox']").attr('id');
                                scoreChoosed = $(this).text().trim();
                            }
                            if ($(this).text().trim()?.toUpperCase() == item?.score?.toUpperCase()) {
                                console.log("check id 2");
                                valueInput = $(this).find("input[type='checkbox']").attr('id');
                                scoreChoosed = $(this).text().trim();
                            }
                            console.log("tiso1", tiso1);
                            console.log("tiso2", tiso2);

                        });
                        return false;
                    }
                });
                console.log(valueInput);
                if (valueInput == "" && idsportSuggest != "") {
                    valueInput = idsportSuggest;
                }
                if (valueInput != "") {
                    console.log("vào idsport", valueInput);
                    await page.click("input[id='" + valueInput + "']");

                    var continuebt2 = await page.$("div#bottonBarDefDesk .row .col-4 button.btn.btn-success");
                    continuebt2.click();
                    await page.waitForNavigation({
                        waitUntil: "networkidle2",
                    })
                    // await page.type("input[type='number']#txtGeneralAmount", "'" + item?.amount + "'", { delay: 100 });
                    await page.type("input[type='number']#txtGeneralAmount", "'" + amount + "'", { delay: 100 });


                    var D = (await page.$eval("div.cabecense span", el => el.textContent)).trim().split(' ');
                    var WagerType = (await page.$eval("div.col-sm-12 div.border-bottom-1 div.d-inline-block span", el => el.textContent)).replace(/\s+/g, '');
                    var dateevent = D[0].replace('[', '').replace(']', '');
                    var amount_main = item?.amount;
                    var Team = item?.team;
                    var Tournaments = item?.Tournaments;
                    var sport = item?.sportname;
                    var DatePlaced = item?.date;

                    var continuebt3 = await page.$("div#bottonBarDefDesk .row .col-md-2 button.btn-success");
                    continuebt3.click()
                    await page.waitForTimeout(6000);

                    const checksuccess = (await page.$$("#ModalError.show")).length;
                    console.log("checksuccess", checksuccess);

                    if (checksuccess == 0) {
                        await page.type("input[type='password']#txtPassword", password, { delay: 100 })
                        var valueevent = [[8, sport, Tournaments, Team, scoreChoosed, dateevent, DatePlaced, WagerType, amount, item?.id, 1]];
                        await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
                        var continuebt4 = await page.$("div#bottonBarDefDesk .row .col-md-2 button.btn-success");
                        continuebt4.click()
                        await page.waitForNavigation({
                            waitUntil: "networkidle2",
                        })
                        if (i < res1.length - 1) {
                            // console.log(7);
                            var continuebt5 = await page.$("div.col-md-4 a img.navbar-brand");
                            continuebt5.click()
                            await page.waitForNavigation({
                                waitUntil: "networkidle2",
                            })
                        } else {
                            // console.log(8);
                            // await tools.endconnect();
                            browser.close();
                        }
                    } else if (checksuccess == 1) {
                        console.log("ko đánh được");
                        const Button = await page.$("button.btn-primary-popup");
                        await Button.click();
                        var valueevent = [[8, item?.sportname, item?.Tournaments, item?.team, item?.score, datetime, item?.date, '', amount, item?.id, 0]];
                        await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
                        if (i < res1.length - 1) {
                            //tiếp tục
                            var continuebt6 = await page.$("div.col-md-4 a img.navbar-brand");
                            continuebt6.click()
                            await page.waitForNavigation({
                                waitUntil: "networkidle2",
                            })
                        } else {
                            // await tools.endconnect();
                            browser.close();
                        }
                    }
                } else {
                    console.log("ko đúng trận");
                    var valueevent = [[8, item?.sportname, item?.Tournaments, item?.team, item?.score, datetime, item?.date, '', amount, item?.id, 2]];
                    await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
                    if (i < res1.length - 1) {
                        var continuebt6 = await page.$("div.col-md-4 a img.navbar-brand");
                        continuebt6.click()
                        await page.waitForNavigation({
                            waitUntil: "networkidle2",
                        })
                    } else {
                        // await tools.endconnect();
                        browser.close();
                    }
                }
                // } else {
                //     console.log("false");
                //     var valueevent = [[8, item?.sportname, item?.Tournaments, item?.team, datetime, item?.date, '', item.amount, item?.id, 2]];
                //     await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
                //     if (i < res1.length - 1) {
                //         var continuebt6 = await page.$("div.col-md-4 a img.navbar-brand");
                //         continuebt6.click()
                //         await page.waitForNavigation({
                //             waitUntil: "networkidle2",
                //         })
                //     } else {
                //         await tools.endconnect();
                //         browser.close();
                //     }

                // }
            }
        }
    })
};
getHistory(() => { process.exit() })
module.exports = { getHistory };