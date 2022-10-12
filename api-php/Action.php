<?php 
	class Action {

		var $request;
		var $response;
		var $db;
		var $timestamp;	
		var $acl;	

		public function __construct() {

			$this->db = new Db('localhost','root','root','todo');
			$this->request = new Request();
			$this->acl = new Acl();
			$this->timestamp = date('Y-m-d H:i:s');	
		}

		
		

	}
	
?>