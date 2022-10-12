<?php 
	
	require_once "Db.php";
	require_once "Action.php";
	require_once "Request.php";
	require_once "Acl.php";

	class Boot {

		public function init() {			

			session_start();

			$action = trim($_GET['action']);
						
			if($action) {

				$class = ucfirst($action).'Action';

				require_once 'actions/'.$action.'.php';
					
				$class = new $class;				

				if(isset($_GET['callback']))
				{
					$cb = $class->{trim($_GET['callback'])}();
				} else {
					$cb = $class->{$_SERVER['REQUEST_METHOD']}();
				}
				
				$this->response = $cb;			
			}

			echo json_encode($this->response);
		}

	}
?>