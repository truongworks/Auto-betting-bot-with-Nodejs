<?php
$getSQL['gAdmin'] = "SELECT `id`, `username`, `password`, `phone`, `email`, `address`, `role`, `status`, `delf` FROM `admin` WHERE username = :username AND delf = 0";

// $getSQL['gAllCrawHistory'] = "SELECT ba.`id`, ba.`bot_id`, ba.`sport`, ba.`Tournaments`, ba.`team`, ba.`date`, ba.`DatePlaced`, ba.`linedesc`, ba.`WagerType`, ba.`amount`, ba.`crawid`, ba.status, bot.botname, cra.sportname, cra.Tournaments, cra.team AS team_cra, cra.game, cra.score, cra.date, cra.date_event, cra.amount, bot.image FROM `battle` AS ba 
//     JOIN bot ON ba.bot_id = bot.id 
//     JOIN crawhistory AS cra ON ba.crawid = cra.id
//     WHERE bot.delf = 0 ORDER BY bot.sort DESC";

$getSQL['gAllCrawHistoryById'] = "SELECT ba.`id`, ba.`bot_id`, ba.`sport`, ba.`Tournaments`, ba.`team`, ba.`date`, ba.`DatePlaced`, ba.`linedesc`, ba.`WagerType`, ba.`amount`, ba.`crawid`, ba.status, bot.botname, cra.sportname, cra.Tournaments, cra.team AS team_cra, cra.game, cra.score, cra.date, cra.date_event,  ba.amount, bot.image FROM `battle` AS ba 
    JOIN bot ON ba.bot_id = bot.id 
    JOIN crawhistory AS cra ON ba.crawid = cra.id
    WHERE bot.delf = 0 AND bot.id = :id";


$getSQL['gCrawHistoryBotId'] = "SELECT ba.`id`, ba.`bot_id`, ba.`sport`, ba.`Tournaments`, ba.`team`, ba.`date`, ba.`DatePlaced`, ba.`linedesc`, ba.`WagerType`, ba.`amount`, ba.`crawid`, ba.status, bot.botname, cra.sportname, cra.Tournaments, cra.team AS team_cra, cra.game, ba.score, cra.date, cra.date_event,  ba.amount, bot.image FROM `battle` AS ba 
JOIN bot ON ba.bot_id = bot.id 
JOIN crawhistory AS cra ON ba.crawid = cra.id
WHERE bot.delf = 0 AND bot.id = :id AND cra.id = :id_cra";

$getSQL['glistbot'] = "SELECT `id`, `botname`, `username`, `password`, `sort`, `image`, `amount_min`, `amount` FROM `bot` WHERE delf = 0 ORDER BY sort";

$getSQL['gAllCrawHistory'] = "SELECT cra.id, cra.sportname, cra.Tournaments, cra.team AS team_cra, cra.game, cra.score, cra.date, cra.date_event, cra.amount FROM crawhistory cra WHERE STR_TO_DATE(SUBSTRING(cra.date_event,1,21),'%M %d, %Y %h:%i %p') >= DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s') ORDER BY id DESC";

$getSQL['gbattlebybotID'] = "SELECT bt.`id`, bt.`bot_id`, bt.`sport`,bt.`score`, bt.`Tournaments`, bt.`team`, bt.`date`, bt.`DatePlaced`, bt.`linedesc`, bt.`WagerType`, bt.`amount`, bt.`crawid`, bt.`status`, bot.botname, bot.image FROM battle bt JOIN bot ON bt.bot_id = bot.id WHERE crawid = :crawid AND bot_id = :bot_id";

$getSQL['gCrawHistoryBotMain'] = "SELECT `id`, `sportname`, `Tournaments`, `code`, `team`, `game`, `score`, `date`, `date_event`, `amount` FROM `crawhistory` WHERE id=:id";

$getSQL['gTransactionBet'] = "SELECT bt.`id`, bt.`bot_id`, bot.botname, bot.image, bt.`sport`, bt.`Tournaments`, bt.`team`, bt.`date`, bt.`DatePlaced`, bt.`linedesc`, bt.`WagerType`, bt.`amount`, bt.`crawid`, bt.`status`, bt.`timestamp`, crh.game, crh.score, crh.date_event FROM battle bt JOIN crawhistory crh ON bt.crawid = crh.id JOIN bot ON bt.bot_id = bot.id WHERE bt.status = 1 ORDER BY bt.id DESC";

//DucLG-221227
$getSQL['uDelBetById'] = "UPDATE bot SET delf = 1, timestamp = :timestamp WHERE id = :id";
//End DucLG-221227

//DucLG-221228
$getSQL['gEditBetById'] = "SELECT * FROM bot WHERE id = :id";
$getSQL['uEditBetById'] = "UPDATE bot SET username = :username, password = :password, timestamp = :timestamp WHERE id = :id";
//End DucLG-221228

//DucLG-230104
$getSQL['uEditAmountBetById'] = "UPDATE bot SET amount_min = :amount_min, amount = :amount, timestamp = :timestamp WHERE id = :id";
//End DucLG-230104
?>