var puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const tools = require("../connect.js");
const getHistory = async () => {
  var historysql = "SELECT crh.`id`, crh.`sportname`, crh.`Tournaments`, crh.`team`, crh.`score`, crh.`date`, crh.`amount`, crh.code FROM crawhistory crh  WHERE crh.`id` not in (SELECT crawid FROM `battle` WHERE bot_id= 1)";
  tools.selectSql(historysql, (err, res) => {
    if (err) return err;
    if (res.length > 0) {
      LoginPig11(res);
    } else {
      console.log("data null");
      // callback()
    }
  });
}

const LoginPig11 = async (res = []) => {
  var sqlAcount = "SELECT `id`, `botname`, `username`, `password`, `amount`, `amount_min`, `max_score` FROM `bot` WHERE delf = 0 AND id = 1";
  tools.selectSql(sqlAcount, async (erracc, resacc) => {
    if (erracc) return erracc;
    if (resacc.length > 0) {
      var username = resacc[0]?.username;
      var password = resacc[0]?.password;
      var bet_amount = resacc[0]?.amount;
      var amount_min = resacc[0]?.amount_min;
      var max_score = resacc[0]?.max_score;
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      await page.goto("https://pig11.com/Logins/001/sites/pig11/index.aspx");
      await page.waitForSelector("#txtAccessOfCode");
      await page.type("#txtAccessOfCode", username, { delay: 100 });
      await page.type("#txtAccessOfPassword", password, { delay: 100 });
      await page.waitForSelector("#cmdSignOn");
      await page.click("#cmdSignOn");

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

      await tools.InserSql("INSERT INTO `last_login`( `bot_id`, `time`) VALUES (1, '" + datetime + "')")

      for (let i = 0; i < res.length; i++) {
        var item = res[i];

        await page.waitForSelector("table tbody");

        var contentPage = await page.content();
        var $ = cheerio.load(contentPage);
        $.html();

        // var amount = $("table tbody tr#rowAvailable td").text().trim();
        // console.log("amount",amount);
        // click NFL
        let btn_checkbox = "";
        $("table tbody tr td div.SportMenu_Div").each(function () {
          let menu = $(this).find(".SportMenu_txt").first().text();
          // if (menu.toUpperCase().trim() == item?.sportname) {
          if (menu.toUpperCase().trim().search("FOOTBALL") > -1 || menu.toUpperCase().trim().search("BASKETBALL") > -1) {
            var content = $(this).find("div.category_div .SportMenu_txt");
            content.each(function () {
              if ($(this).text().trim() == item?.Tournaments) {
                btn_checkbox = $(this).parents(".category_div").attr("onclick");
                return;
              }
            });
            return;
          }
        })

        await page.waitForTimeout(2000);
        if (btn_checkbox != "") {
          var continuebt = await page.$(`div[onclick='` + btn_checkbox + `']`);
          await continuebt.click();

          // await page.$eval(`div[onclick='` + btn_checkbox + `']`, form => form.click() );
          //end click NFL

          //click continue
          await page.waitForTimeout(100);
          await page.click("div.main div.content_holder span#lblInfoPrincipal input[type='submit']#cmdContinue.bottomContinue");
          //end continue
          await page.waitForSelector("table tbody tr td.tdTeamName");

          var contentPage1 = await page.content();
          var $ = cheerio.load(contentPage1);
          $.html();

          var valueInput = "";
          var value_Amount = "";
          var idsportfirst = "";
          var idsportfirst_Amount = "";
          var idsportSuggest = "";
          var selectShow = [];

          var itemScorearr = item?.score?.split(/[-+]/);
          var ItemscoreEnd = itemScorearr[itemScorearr.length - 1];
          var ItemscoreStart = item?.score.slice(0, item?.score.indexOf(itemScorearr[itemScorearr.length - 1]));

          $("table tbody tr td.tdTeamName .rotation_number").each(function () {
          if ($(this).html().trim() == item?.code) {
            let content = $(this).parents("tr").find("td table tbody");
            content.each(function () {
              if ($(this).find("tr td select").length > 0) {
                $(this).find("tr td.td3 select").each(function(){
                  selectShow.push($(this).attr("id"));
                })
                return;
                      
              }
            });
          }
          });
          for (let i = 0; i < selectShow.length; i++) {
            await page.hover("select[id='" + selectShow[i] + "']");
          }

          var contentPage12 = await page.content();
          var $ = cheerio.load(contentPage12);
          $.html();
         
          $("table tbody tr td.tdTeamName .rotation_number").each(function () {
            if ($(this).html().trim() == item?.code) {
              let content = $(this).parents("tr").find("td table tbody");
              content.each(function () {
                if ($(this).find("tr td select").length > 0) {
                  $(this).find("tr td.td3 select option").each(function(){
                    var NameScore = $(this).text().trim().replace(/\s+/g, '');
                    var strarr = NameScore.split(/[-+]/);
                    var scoreEnd = strarr[strarr.length - 1];
                    var scoreStart = NameScore.slice(0, NameScore.indexOf(strarr[strarr.length - 1]));
                
                    if (ItemscoreStart?.toUpperCase() == scoreStart?.toUpperCase() && scoreEnd <= (Number(ItemscoreEnd) + Number(max_score))) {
                      idsportfirst = $(this).text().trim();
                      idsportfirst_Amount = $(this).parents("table.TableSpread tbody").find("tr td input").attr("id");
                    }
                })
                } else {

                  if ($(this).find("tr td.td3").text().trim().replace(/\s+/g, "")) {
                    var NameScore = $(this).find("tr td.td3").text().trim().replace(/\s+/g, "");
                    var strarr = NameScore.split(/[-+]/);
                    var scoreEnd = strarr[strarr.length - 1];
                    var scoreStart = (NameScore.slice(0, NameScore.indexOf(strarr[strarr.length - 1])));
                    ;
                    if (scoreStart?.toUpperCase() == ItemscoreStart?.toUpperCase() && scoreEnd <= (Number(ItemscoreEnd) + Number(max_score))) {
                      idsportfirst = $(this).find("tr td.td3").text().trim();
                      idsportfirst_Amount = $(this).find("tr td.td2 input").attr("id");
                    }
                  }
                  if ($(this).find("tr td.td1").text().trim().replace(/\s+/g, "") != "") {
                    var NameScore = $(this).find("tr td.td1").text().trim().replace(/\s+/g, "");
                    var strarr = NameScore.split(/[-+]/);
                    var scoreEnd = strarr[strarr.length - 1];
                    var scoreStart = (NameScore.slice(0, NameScore.indexOf(strarr[strarr.length - 1])));
                    if (scoreStart?.toUpperCase() == ItemscoreStart?.toUpperCase() && scoreEnd <= (Number(ItemscoreEnd) + Number(max_score))) {
                      idsportfirst = $(this).find("tr td.td1").text().trim();
                      idsportfirst_Amount = $(this).find("tr td.td1 input").attr("id");
                    }
                  }
                  if ($(this).find("tr td.td2").text().trim().replace(/\s+/g, "") != "") {
                    var NameScore = $(this).find("tr td.td2").text().trim().replace(/\s+/g, "");
                    var strarr = NameScore.split(/[-+]/);
                    var scoreEnd = strarr[strarr.length - 1];
                    var scoreStart = (NameScore.slice(0, NameScore.indexOf(strarr[strarr.length - 1])));
                    if (scoreStart?.toUpperCase() == ItemscoreStart?.toUpperCase() && scoreEnd <= (Number(ItemscoreEnd) + Number(max_score))) {
                      idsportfirst = $(this).find("tr td.td2").text().trim();
                      idsportfirst_Amount = $(this).find("tr td.td2 input").attr("id");
                    }
                  }
                }

                if ($(this).find("tr td select").length > 0) {
                  if ($(this).find("tr td.td3 select option:selected").text().trim().replace(/\s+/g, "") == item?.score.trim().replace(/\s+/g, "")) {
                    valueInput = $(this).find("tr td.td3 select option:selected").text().trim();
                    value_Amount = $(this).find("tr td input").attr("id");
                  }
                } else {
                  if ($(this).find("tr td.td3").text().trim().replace(/\s+/g, "").toUpperCase() == item?.score.trim().replace(/\s+/g, "").toUpperCase()) {
                    valueInput = $(this).find("tr td.td3").text().trim();
                    value_Amount = $(this).find("tr td.td2 input").attr("id");
                  } else
                    if ($(this).find("tr td.td1").text().trim().replace(/\s+/g, "").toUpperCase() == item?.score.trim().replace(/\s+/g, "").toUpperCase()) {
                      valueInput = $(this).find("tr td.td1").text().trim();
                      value_Amount = $(this).find("tr td.td1 input").attr("id");
                    } else
                    if ($(this).find("tr td.td2").text().trim().replace(/\s+/g, "").toUpperCase() == item?.score.trim().replace(/\s+/g, "").toUpperCase()) {
                      valueInput = $(this).find("tr td.td2").text().trim();
                      value_Amount = $(this).find("tr td.td2 input").attr("id");
                    }
                }

              });
              return;
            }
          });

          // console.log("valueInput", valueInput);
          // console.log("idsportfirst", idsportfirst);

          if (valueInput == "" && idsportfirst != "") {
            valueInput = idsportfirst;
            value_Amount = idsportfirst_Amount;
          }


          if (valueInput != "") {
            await page.waitForTimeout(1000);
            await page.type("input[id= " + value_Amount + "]", "'" + bet_amount + "'", { delay: 100 }); // append amount

            await page.waitForTimeout(100);
            await page.click(
              "div div.submitwager input[type='submit'].Submitbutton"
            );
            await page.waitForNavigation({
              waitUntil: "networkidle2",
            });

            const check_error = (await page.$$("td.error_cell")).length;
            if (check_error < 1) {
              var WagerType = (await page.$eval("table tbody tr td.HeaderTicket", (el) => el.textContent)).trim().split(/\s|&nbsp;/g);
              var Code = await page.$eval("tbody tr td div.TdDetailTicket font.TeamRotationTicket", (el) => el.textContent);
              var Team = await page.$eval("tbody tr td div.TdDetailTicket font.TeamNameTicket", (el) => el.textContent);
              var game = Code + Team;
              var Tournaments = item?.Tournaments;
              var sport = item?.sportname;
              var amount = (await page.$eval("tbody tr td.win_cell", (el) => el.textContent)).trim();
              var dateevent = await page.$eval("tbody tr td div.TdDetailTicket font.TeamDateTicket", (el) => el.textContent);
              var DatePlaced = item?.date;
              var crawid = item?.id;

              //
              await page.type("input[type='password']", password, { delay: 100, });
              await page.waitForTimeout(100);

              /// button hoàn thành đặt cươc
              await page.click("td input[type='submit']#cmdSubmit");

              await page.waitForTimeout(1000);

              const check_error_amount = (await page.$$("span.InvalidPassword")).length;

              if (check_error_amount < 1) {
                console.log("Thành công !");

                if (valueInput == "") {
                  var score = item?.score;
                }else{
                  var score = valueInput;
                }

                var valueevent = [[1, sport, Tournaments, game, score, dateevent, DatePlaced, WagerType[0], amount, crawid, 1,],];
              } else {
                console.log("Sai mật khẩu !");

                var score = item?.score;
                
                var valueevent = [[1, sport, Tournaments, game, score, dateevent, DatePlaced, WagerType[0], amount, crawid, 0,],];
              }

              await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);

              if (i < res.length - 1) {
                await page.click("div.bg2 ul li#current a.red");
                // await page.waitForNavigation({
                //   waitUntil: "networkidle2",
                // });
              } else {
                // await tools.endconnect();
                browser.close();
                // callback()
              }
            } else {
              console.log("Số tiền nhỏ hơn hoặc lớn hơn hạn mức cược");

              var Tournaments = item?.Tournaments;
              var sport = item?.sportname;
              var team = item?.team;
              var date_err = item?.date;
              // var amount = item.amount;
              var amount = bet_amount;
              var crawid = item?.id;
              var score = item?.score;
              var valueevent = [[1, sport, Tournaments, team, score, datetime, date_err, "", amount, crawid, 0,],];

              await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);

              if (i < res.length - 1) {
                await page.click("div.bg2 ul li#current a.red");
                // await page.waitForNavigation({
                //   waitUntil: "networkidle2",
                // });
              } else {
                // await tools.endconnect();
                browser.close();
                // callback()
              }
            }
          } else {
            console.log("Không tìm thấy trận đấu");

            var Tournaments = item?.Tournaments;
            var sport = item?.sportname;
            var team = item?.team;
            var date_err = item?.date;
            // var amount = item.amount;
            var amount = bet_amount;
            var crawid = item?.id;
            var score = item?.score;
            var valueevent = [[1, sport, Tournaments, team, score, datetime, date_err, "", amount, crawid, 2,],];

            await tools.InserSql(
              "INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`,  `score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);
            if (i < res.length - 1) {
              await page.click("div.bg2 ul li#current a.red")
              // await page.waitForNavigation({
              // waitUntil: "networkidle2",
              // })
            } else {
              // await tools.endconnect();
              browser.close();
              // callback()
            }
          }
        } else {
          console.log("Không tìm thấy giải đấu");

          var Tournaments = item?.Tournaments;
          var sport = item?.sportname;
          var team = item?.team;
          var date_err = item?.date;
          // var amount = item.amount;
          var amount = bet_amount;
          var crawid = item?.id;
          var score = item?.score;
          var valueevent = [[1, sport, Tournaments, team, score, datetime, date_err, "", amount, crawid, 2,],];

          await tools.InserSql("INSERT INTO `battle`( `bot_id`, `sport`, `Tournaments`, `team`, `score`, `date`, `DatePlaced`, `WagerType`, `amount`,`crawid`, `status`) VALUES ?", valueevent);

          if (i < res.length - 1) {
            await page.click("div.bg2 ul li#current a.red")
            // await page.waitForNavigation({
            // waitUntil: "networkidle2",
            // })
          } else {
            // await tools.endconnect();
            browser.close();
            // callback()
          }
        }
      }
    }
  })
};

// getHistory();
module.exports = { getHistory };