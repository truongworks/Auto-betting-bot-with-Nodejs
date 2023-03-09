<?php
	$host = 'data.bdata.link';
	$port   = '3306';
	$db   = 'dev_redbolt';
	$user = 'bdata_dev';
	$pass = 'bData#123';
	//
	// $host = 'localhost';
	// $port   = '3306';
	// $db   = 'dev_redbolt';
	// $user = 'root';
	// $pass = '';
	$charset = 'utf8mb4';
	$dsn = "mysql:host=$host; port=$port; dbname=$db;charset=$charset";
	$opt = [
	    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
	    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
	    PDO::ATTR_EMULATE_PREPARES   => false,
	];
	try {
	    $conn = new PDO($dsn, $user, $pass);
	} catch (\PDOException $e) {
	    throw new \PDOException($e->getMessage(), (int)$e->getCode());
	}
?>