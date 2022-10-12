<?php 
	class Request {

		private $request;
		public function __construct() {

			$this->request['type'] = $_SERVER['REQUEST_METHOD'];
			$this->request['put'] = json_decode(file_get_contents("php://input"), true);
			$this->request['post'] = $_POST;
			$this->request['get'] = $_GET;

		}

		public function getParam($name, $type) {
			return isset($this->request[$type][$name]) ? $this->request[$type][$name] : null;
		}

		public function getParams($type) {
			return isset($this->request[$type]) ? $this->request[$type] : null;
		}

		public function getType() {
			return $this->request['type'];
		}
	}
?>