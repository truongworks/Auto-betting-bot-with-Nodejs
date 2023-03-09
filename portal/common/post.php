<?php
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Key");
header("Access-Control-Allow-Origin: *");
require_once 'connect.inc.php';
require_once 'sysenv.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['func'])) {

	$sqlQuery = $getSQL[$_POST['func']];

	$stmt = $conn->prepare($sqlQuery);

	foreach ($_POST as $name => $value) {

		if ($name != "func") {

			$stmt->bindValue(':' . $name, $value ? $value : null);
		}
	}

	$stmt->execute();

	$stmt->closeCursor();

	$stmt = null;

	$conn = null;

	print json_encode(0);

	die();
}
