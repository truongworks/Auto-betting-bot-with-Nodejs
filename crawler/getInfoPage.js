// const app = require('express')();
// const http = require('http').Server(app);
var tools = require("./connect.js");
var db_con = tools.con;
// var insert = tools.InserSql("INSERT INTO `info`(`name`, `info1`, `info2`) VALUES ('tuấn', 1,2)");
// var value = tools.selectSql("SELECT `id`, `name`, `info1`, `info2` FROM `info`");
db_con.connect((err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
        return;
    }

    // Here is the query
    let query =
        "SELECT `id`, `name`, `info1`, `info2` FROM `info`";

    db_con.query(query, (err, result) => {
        if (err) throw err;
        console.log(JSON.stringify(result));
    });
});
// http.listen(8888, function () {
//     console.log('listening on *:8888');
// });