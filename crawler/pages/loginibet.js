const puppeteer = require('puppeteer-extra')
const cheerio = require('cheerio');
var tools = require("../connect.js");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const { executablePath } = require('puppeteer')

const getHistory = async (callback) => {
    var historysql = "SELECT crh.`id`, crh.`sportname`, crh.`Tournaments`, crh.`team`, crh.`score`, crh.`date`, crh.`amount`, crh.code FROM crawhistory crh  WHERE crh.`id` not in (SELECT crawid FROM `battle` WHERE bot_id= 7)";
    tools.selectSql(historysql, (err, res) => {
        if (err) return err;
        if (res.length > 0) {
            Loginibet(res, callback)
            // console.log(res);
        } else {
            callback()
        }
    })
}
var historysql = "SELECT crh.`id`, crh.`sportname`, crh.`Tournaments`, crh.`team`, crh.`score`, crh.`date`, crh.`amount`, crh.code FROM crawhistory crh  WHERE crh.`id` not in (SELECT crawid FROM `battle` WHERE bot_id= 7)";
tools.selectSql(historysql, (err, res) => {
    if (err) return err;
    if (res.length > 0) {
        Loginibet(res);
    } else {
        // callback()
    }
})
const Loginibet = async (res = [], callback) => {
    var sqlAcount = "SELECT `id`, `botname`, `username`, `password`, `amount`, `max_score` FROM `bot` WHERE delf = 0 AND id = 7";
    tools.selectSql(sqlAcount, async (err, resacc) => {

        // console.log("connect db: ",resacc);
        if (err) return err;
        if (resacc.length > 0) {
            var username = resacc[0]?.username;
            var password = resacc[0]?.password;
            var amountPet = resacc[0]?.amount;
            var max_score = resacc[0]?.max_score;

            const browser = await puppeteer.launch({
                headless: false,
                executablePath: executablePath(),
                args:[
                    '--start-maximized' // you can also use '--start-fullscreen'
                 ]
                // executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
            });
            const page = await browser.newPage();
            const pages = await browser.pages();
            if (pages.length > 1) {//đóng tap trống đầu tiên
                await pages[0].close();
            }
            await page.setDefaultNavigationTimeout(0);//set thời gian chờ tải trang  không giới hạn

            await page.goto("https://ibet.ag/");
            // await page.waitForNavigation({
            //     waitUntil: "load",
            // })
            // await page.waitForSelector(".navbar-toggler-icon")
            // await page.waitForSelector("button.navbar-toggler")
            // await page.click("button.navbar-toggler");
            // var checkIcon = (await page.$$(".navbar-toggler-icon")).length;
            // if (checkIcon > 0) {
            //     await page.click(".navbar-toggler-icon");
            // }
            await page.waitForSelector("input[name='Account']");
            await page.type("input[name='Account']", username, { delay: 100 });
            await page.type("input[name='Password']", password, { delay: 100 });
            // await page.click("#login-account");
            await page.$eval("#login-account", form => form.click());
            await page.waitForNavigation({
                waitUntil: "networkidle2",
            })
            let date_ob = new Date();
            // current date
            // adjust 0 before single digit date
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);// current month
            let year = date_ob.getFullYear();// current year
            let hours = date_ob.getHours();// current hours
            let minutes = date_ob.getMinutes();// current minutes
            let seconds = date_ob.getSeconds();// current seconds

            let datetime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
            await tools.InserSql("INSERT INTO `last_login`( `bot_id`, `time`) VALUES (7, '" + datetime + "')");

            for (let i = 0; i < res.length; i++) {

                var item = res[i];

                var contentPage = await page.content();
                var $ = cheerio.load(contentPage);
                var inputval = "";
                $.html();
                var checkbox = "";
                var submitContinue = "";
                var datacheckbox = [];
                $('div.divSportContainer div.divSport a').each(function () {
                    if ($(this).text().search("FOOTBALL") > -1 || $(this).text().search("BASKETBALL") > -1) {
                        const content = $(this).parents('.divSportContainer').find('.divLeagueBox2 a');
                        content.each(function () {
                            datacheckbox.push($(this).parents('.divLeague').find(".parent .chkBox").val());
                        });
                        return;
                    }
                    // if ($(this).text().trim() == item?.sportname) {
                    //     $($(this).parents('.divSportContainer').find('.divLeagueBox2 a')).each(function () {
                    //         if ($(this).text().trim() == item?.Tournaments) {
                    //             checkbox = $(this).parents('.divLeague').find(".parent .chkBox").val();
                    //             return;
                    //         }
                    //     });
                    //     submitContinue = $(this).parents('.divSportContainer').find(".continue-box").attr("id");
                    // }

                });
                if (datacheckbox.length > 0) {
                    // if(checkbox != ""){
                    for (let i = 0; i < datacheckbox.length; i++) {
                        const checksuccess = (await page.$$('input[value="' + datacheckbox[i] + '"]')).length;
                        if (checksuccess > 0) {
                            await page.$eval("input[value='" + datacheckbox[i] + "']", check => check.checked = true)
                        }
                    }
                    // await page.$eval("input[value='" + checkbox + "']", check => check.checked = true)

                    await page.$eval("input[id='ctl00_WagerContent_btn_Continue_top']", form => form.click());

                    await page.waitForNavigation({
                        waitUntil: "networkidle2",
                    })
                    var contentPage1 = await page.content();
                    var $ = cheerio.load(contentPage1);
                    $.html();
                    var valueInput = '';
                    var idsportfirst = "";
                    var scoreChoosed = "";

                    var itemScorearr = item?.score?.split(/[-+]/);
                    var ItemscoreEnd = itemScorearr[itemScorearr.length - 1];
                    var ItemscoreStart = item?.score.slice(0, item?.score.indexOf(itemScorearr[itemScorearr.length - 1]));

                    $('.lines .line').each(function () {
                        $(this).find(".row.py-4:not(:first-child) .col-md-2 p strong").each(function () {
                            if ($(this).html().trim() != "Rot" && $(this).html().trim() != "Spread" && $(this).html().trim() != "Total" && $(this).html().trim() != "Money Line") {
                                if ($(this).html().trim() == item?.code) {
                                    $(this).parents(".row.py-4").find(".col-md-2:not(:first-child) label").each(function () {
                                        // console.log($(this).text());// mã tỉ só

                                        const content = $(this);
                                        var strarr = content.text().split(/[-+]/);

                                        var scoreEnd = strarr[strarr.length - 1];
                                        var scoreStart = content.text().slice(0, content.text().indexOf(strarr[strarr.length - 1]));
                                        if (idsportfirst == "" && ItemscoreStart?.toUpperCase() == scoreStart?.toUpperCase() && Number(scoreEnd) <= (Number(ItemscoreEnd) + + Number(max_score))) {
                                           scoreChoosed = $(this).text()?.trim()?.replace(/\s+/g, '');
                                            idsportfirst = $(this).parents(".col-md-2").find(".checkbox-hide").val();
                                        }
                                        if ($(this).text()?.trim()?.replace(/\s+/g, '')?.toUpperCase() == item?.score?.toUpperCase()) {
                                            scoreChoosed = $(this).text()?.trim()?.replace(/\s+/g, '');
                                            // console.log($(this).parents(".col-md-2").find(".checkbox-hide").val());
                                            valueInput = $(this).parents(".col-md-2").find(".checkbox-hide").val();
                                        }

                                    })

                                }
                            }

                        })
                    })
                    if (valueInput == "" && idsportfirst != "") {
                        valueInput = idsportfirst;
                    }

                    if (scoreChoosed == "") {
                        scoreChoosed = item?.score;
                    }

                    if (valueInput != "") {
                        await page.waitForSelector('input[value="' + valueInput + '"]');
                        await page.$eval("input[value='" + valueInput + "']", check => check.checked = true);

                        await page.$eval("input[id='ctl00_WagerContent_btn_Continue1']", form => form.click());
                        await page.waitForNavigation({
                            waitUntil: "networkidle2",
                        })
                        await page.waitForSelector('input[id="WAMT_"]');
                        await page.type("input[id='WAMT_']", '' + amountPet + '', { delay: 100 });
                        // await page.click('input[value="Continue"]', { delay: 1000 });
                        await page.$eval("input[value='Continue']", form => form.click());

                        await page.waitForNavigation({
                            waitUntil: "networkidle2",
                        })
                        const checkerr = (await page.$$("span#ctl00_WagerContent_ctl00_lblError")).length;
                        if (checkerr < 1) {
                            // trường hợp xác nhận password để đánh
                            await page.waitForSelector('input[id="password"]');
                            await page.type("input[id='password']", '' + password + '', { delay: 100 });
                            await page.$eval("input[id='ctl00_WagerContent_btn_Continue1']", form => form.click());
                            await page.waitForNavigation({
                                waitUntil: "networkidle2",
                            })
                            const checkerrgame = (await page.$$("span#ctl00_WagerContent_ctl00_lblError")).length;
                            if (checkerrgame < 1) {
                                await page.waitForSelector('div.line h3');

                                var WagerType = await page.$eval("div.line h3", el => el.textContent);
                                var dateevent = await page.$eval("div.line table tr:nth-child(1) td:nth-child(1)", el => el.textContent)
                                var Team = await page.$eval("div.line table tr:nth-child(1) td:nth-child(2)", el => el.textContent)
                                // var linedesc = await page.$eval("tbody tr td span.line-desc", el => el.textContent)
                                var Tournaments = item?.Tournaments;
                                var amount = await page.$eval("div.line table tr:nth-child(1) td:nth-child(3)", el => el.textContent)

                                var valueevent = [[7, item?.sportname, item?.Tournaments, Team, scoreChoosed, dateevent, item?.date, WagerType, amountPet, item?.id, 1]];

                                await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);

                                await page.waitForSelector('#ctl00_lnkSports');
                                await page.$eval("#ctl00_lnkSports", form => form.click());
                                if (i < res.length - 1) {
                                } else {
                                    // await tools.endconnect();
                                    browser.close();
                                    // callback(1);
                                }
                                // await page.click("#ctl00_lnkSports");
                            } else {
                                // tồn tại lỗi Game đã bắt đầu
                                var valueevent = [[7, item?.sportname, item?.Tournaments, item?.team, item?.score, datetime, item?.date, '', amountPet, item?.id, 0]];
                                await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
                                if (i < res.length - 1) {
                                    // await page.waitForSelector("#ctl00_lnkSports")
                                    // await page.click("#ctl00_lnkSports", { delay: 2000 });
                                    await page.$eval("#ctl00_lnkSports", form => form.click());
                                    await page.waitForSelector(".divSportContainer");
                                    // await page.waitForNavigation({
                                    //     waitUntil: "networkidle2",
                                    // })
                                    // await page.waitForSelector('input[value="Continue"]')
                                } else {
                                    // await tools.endconnect();
                                    browser.close();
                                    // callback(1);
                                }
                            }

                            // Continue

                        } else {
                            // tồn tại lỗi đánh số tiền thấp
                            var valueevent = [[7, item?.sportname, item?.Tournaments, item?.team, item?.score, datetime, item?.date, '', amountPet, item?.id, 0]];
                            await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
                            if (i < res.length - 1) {
                                // await page.waitForSelector("#ctl00_lnkSports")
                                // await page.click("#ctl00_lnkSports", { delay: 2000 });
                                await page.$eval("#ctl00_lnkSports", form => form.click());
                                await page.waitForSelector(".divSportContainer");
                                // await page.waitForNavigation({
                                //     waitUntil: "networkidle2",
                                // })
                                // await page.waitForSelector('input[value="Continue"]')
                            } else {
                                // await tools.endconnect();
                                browser.close();
                                // callback(1);
                            }
                        }
                    } else {
                        var valueevent = [[7, item?.sportname, item?.Tournaments, item?.team, item?.score, datetime, item?.date, '', amountPet, item?.id, 2]];
                        await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
                        if (i < res.length - 1) {
                            await page.waitForSelector("#ctl00_lnkSports");
                            await page.$eval("#ctl00_lnkSports", form => form.click());

                            await page.waitForSelector(".divSportContainer");

                            // await page.click("#ctl00_lnkSports")

                            // await page.waitForNavigation({
                            //     waitUntil: "networkidle2",
                            // })

                        } else {
                            // await tools.endconnect();
                            browser.close();
                            // callback(1);
                        }
                    }
                } else {
                    var valueevent = [[7, item?.sportname, item?.Tournaments, item?.team, item?.score, datetime, item?.date, '', amountPet, item?.id, 2]];
                    await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
                    if (i < res.length - 1) {
                        await page.waitForSelector("#ctl00_lnkSports");
                        await page.$eval("#ctl00_lnkSports", form => form.click());

                        await page.waitForSelector(".divSportContainer");
                        // await page.click("#ctl00_lnkSports")
                        // await page.waitForNavigation({
                        //     waitUntil: "networkidle2",
                        // })

                    } else {
                        // await tools.endconnect();
                        browser.close();
                        // callback(1);
                    }
                }

            }




        }
    });



};
// getHistory(() => { process.exit(); })
module.exports = { getHistory };
// Loginibet();