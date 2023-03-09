var puppeteer = require("puppeteer");
const cheerio = require('cheerio');
const tools = require("../connect.js");


var historysql = "SELECT crh.`id`, crh.`sportname`, crh.`Tournaments`, t.`teamName` team, crh.`score`, crh.`date`, crh.`amount` FROM crawhistory crh JOIN team t ON crh.team = t.teamAcronyms";
tools.selectSql(historysql, (err, res) => {
    if (err) return err;
    if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
            var item = res[i];
            Login10Stack(item)
        }
    } else {
        tool.endconnect()
    }
})


const Login10Stack = async (item) => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const pages = await browser.pages();
    if (pages.length > 1) {//đóng tap trống đầu tiên
        await pages[0].close();
    }
    await page.setDefaultNavigationTimeout(0);//set thời gian chờ tải trang  không giới hạn

    await page.goto("https://www.10stack.com/");
    await page.waitForSelector("input[name='bpLoginUsername']");
    await page.type("input[name='bpLoginUsername']", "Tin1009", { delay: 100 });
    await page.type("input[name='bpLoginPassword']", "5678", { delay: 100 });

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


    var sql = "SELECT `id`, `bot_id`, `sport`, `Tournaments`, `team`, `date`, `DatePlaced`, `linedesc`, `WagerType`, `amount`, `timestamp` FROM `battle` WHERE bot_id= 7 AND sport = '" + item?.sportname + "' AND Tournaments= '" + item?.Tournaments + "' AND team LIKE '%" + item?.team + "%' AND team LIKE '%" + item?.score + "%' AND DatePlaced = '" + item?.date + "'";

    await tools.selectSql(sql, async (err, check) => {

        if (check.length == 0) {
            await page.waitForSelector("section.cont-right.clearfix div.sport-league div.panel-heading div.menu-sport-name h3")
            var contentPage = await page.content();
            var $ = cheerio.load(contentPage);
            $.html();
            var inputval = "";
            var idsubmit = "";
            // console.log(i);
            // console.log($('section.cont-right.clearfix div.sport-league div.panel-heading div.menu-sport-name h3').length);
            $('section.cont-right.clearfix div.sport-league div.panel-heading div.menu-sport-name h3').each(function () {

                if ($(this).text().trim().search(item?.sportname) == 0) {//tìm kiếm ở vị trí đầu tiên
                    const content = $(this).parents('div.sport-league').find('div.panel-body ul li');

                    idsubmit = $(this).parents('div.sport-league').attr('id');
                    content.each(function () {
                        if ($(this).text().trim() == item?.Tournaments) {
                            inputval = $(this).find("input").val();
                            return;
                        }
                    });
                    return;
                }
            });

            if (inputval != "" && idsubmit != "") {
                await page.$eval("input[value='" + inputval + "']", check => check.checked = true)
                // await page.click("input[value='" + inputval + "']");
                await page.waitForTimeout(100)
                await page.waitForSelector(`div#${idsubmit}`);
                var continuebt = await page.$(`div#${idsubmit} .panel-heading .panel-btn button.btn-success`);
                await continuebt.click()
                await page.waitForNavigation({
                    waitUntil: "networkidle2",
                })
                await page.waitForSelector("#lines-form");
                await page.waitForSelector("table.table")
                var contentPage = await page.content();
                const $ = cheerio.load(contentPage);
                var valueInput = '';

                $('tbody tr td span.team-name').each(function () {
                    if ($(this).text().toUpperCase().trim() == item?.team.toUpperCase()) {

                        const content = $(this).parents("tr").find('td.txt-r');
                        content.each(function () {
                            if ($(this).find("span.game-lines span.l-checkbox select").length > 0) {
                                if ($(this).find("span.game-lines span.l-checkbox select option:selected").text().trim() == item?.score) {
                                    valueInput = $(this).find("span.game-lines span.l-checkbox input[type='checkbox']").val();
                                }
                            } else {
                                if ($(this).find("span.game-lines span.l-checkbox").text().trim() == item?.score) {
                                    valueInput = $(this).find("span.game-lines span.l-checkbox input[type='checkbox']").val();
                                }
                            }
                        });
                        return;
                    }
                })


                if (valueInput != "") {
                    await page.click("input[value='" + valueInput + "']");
                    await page.waitForTimeout(100)
                    await page.click('div.panel.panel-primary.row div.panel-btn button[type="button"].btn.btn-success');
                    await page.waitForNavigation({
                        waitUntil: "networkidle2",
                    })

                    await page.type("input[id='same-amt']", `${item?.amount}`, { delay: 100 })
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
                        await page.type("input[type='password']", '5678', { delay: 100 });
                        // await page.click("button[type='button'].btn-success.btn-submit");
                        await tools.InserSql("INSERT INTO `battle`( `bot_id`, `Tournaments`, `team`, `date`, `WagerType`, `amount`) VALUES ?", valueevent);

                    } else {
                        console.log("đánh thất bại");
                        browser.close();
                    }

                } else {
                    console.log("không tìm thấy trận");
                    browser.close();
                }

            } else {
                console.log('không tìm thấy loại môn');
                browser.close();
            }

        } else {
            console.log('không có dữ liệu');
            browser.close();
        }
    })
    // }

}