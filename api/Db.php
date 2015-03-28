<?php 
	
	class Db {

		var $connection;

		public function __construct($host, $user, $pass, $db) {
			$this->connection = mysqli_connect($host, $user, $pass, $db);
			mysqli_query($this->connection, "SET NAMES utf8");
		}

		/**
		* @param Array $array 
		* @param String $table
		* @param String $where
		* @return Boolean - Result mysql update row
		*/
		public function updateFromArray($array, $table, $where) {

			$sets = array();

			foreach ($array as $key => $value) {
				if($value) {
					$sets[] = "`{$key}`='{$value}'";
				}
			}

			$sets = implode(',', $sets);

			$query = "UPDATE `{$table}` SET {$sets} WHERE {$where}";

			return mysqli_query($this->connection, $query);
		}

		/**
		* 
		* @param Array $array
		* @param String $table
		* @return Boolean - Result mysql insert row
		*/
		public function insertFromArray($array, $table) {

			$values = array();
			$columns = array();

			foreach ($array as $key => $value) {
				
				if($value) {
					$columns[] = "`{$key}`";
					$values[] = "'{$value}'";
				}
			}

			$values = implode(',', $values);
			$columns = implode(',', $columns);

			$query = "INSERT INTO `{$table}` ({$columns}) VALUES ({$values})";
			$insert = mysqli_query($this->connection, $query);

			return mysqli_insert_id($this->connection);

		}

		/**
		* @param string $sql
		* @return Resource - result mysql query
		*/
		public function q($sql) {			
			return mysqli_query($this->connection, $sql);
		}

	}

?>