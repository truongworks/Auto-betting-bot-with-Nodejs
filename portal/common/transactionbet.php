<?php
require_once 'connect.inc.php';
require_once 'sysenv.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['page'])) {
        $limit = 10;
        $offset = (int) $_POST['page'] * 10;
        $stmt = $conn->prepare($getSQL['gTransactionBet'] . " LIMIT 10 OFFSET " . $offset);
        $stmt->execute();
        $listTrans = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt->closeCursor();
        foreach ($listTrans as $trans) {
            // $datetime = substr($trans['date_event'], 0, 21);
            $datetime = date('d-m-Y', strtotime($trans['timestamp']));
            // $date = substr($datetime, 0, 10);
            // $time = substr($datetime, 11, 20);
?>
<div class="list-group-item bg-transparent">
    <div class="row align-items-center">
        <div class="col-auto pd-0">
            <img src="assets/images/<?php echo $trans['image']; ?>" width="80px" height="50px"><br>
        </div>
        <div class="col pd-r-0">
            <small><strong>Thời gian cược: <?php echo $datetime; ?></strong></small>
            <div class="my-0 text-muted small"><?php echo $trans['Tournaments']; ?></div>
            <div class="my-0 text-muted small">Trận: <?php echo $trans['game']; ?></div>
            <div class="my-0 text-muted small">Đã cược: <?php echo $trans['amount']; ?></div>
            <div class="my-0 text-muted small">Tỉ lệ cược: <?php echo $trans['score']; ?></div>
            <!-- <div class="my-0 text-muted small">Thắng: $50.00</div>
                <div class="my-0 text-muted small">Thua: $30.00</div> -->
        </div>
    </div>
</div>
<?php
        }
    }
}
?>