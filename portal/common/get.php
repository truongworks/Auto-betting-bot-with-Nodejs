<?php
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Key");
header("Access-Control-Allow-Origin: *");
require_once 'connect.inc.php';
require_once 'sysenv.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['func'])) {

	$sqlQuery = $getSQL[$_GET['func']];

	if (strpos($sqlQuery, '1=1')) {

		$condition = "1=1";

		foreach ($_GET as $name => $value) {

			if ($name != "func" && $value != null && $value != "" && $name != "limit" && $name != "offset") {

				$condition .= " and " . $name . "=:" . $name;

			}

		}

		$sqlQuery = str_replace("1=1", $condition, $sqlQuery);
	}
	if (isset($_GET['limit']) && isset($_GET['offset'])) {
		$sqlQuery .= " LIMIT " . $_GET['limit'] . " OFFSET " . $_GET['offset'];
	}

	$stmt = $conn->prepare($sqlQuery);

	foreach ($_GET as $name => $value) {

		if ($name != "func" && $value != null && $value != "" && $name != "limit" && $name != "offset") {

			$stmt->bindValue(':' . $name, $value);

		}

	}

	$stmt->execute();

	$result = $stmt->fetchAll();

	$stmt->closeCursor();

	$stmt = null;

	$conn = null;

	$json = array();

	foreach ($result as $value) {

		array_push($json, $value);

	}

	print json_encode($json);

	die();

} else {

	print json_encode(0);

	die();

}

?>