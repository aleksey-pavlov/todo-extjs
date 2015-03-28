<?php 
	ini_set('display_errors','on');
	require_once "Boot.php";

	header("Content-type: application/json; charset=utf-8");
	$init = new Boot();
	$init->init();
	
?>
