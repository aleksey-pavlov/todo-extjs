<?php 

	class Acl {

		var $GUEST;
		var $USER;
		var $PM;
		var $ADMIN;

		public function __construct() {

			$this->GUEST = array('tasks'=>array('view'));
			$this->USER = array_merge_recursive($this->GUEST, array('tasks'=>array('hours'), 
																	'filters'=>array('view', 'edit')));
			$this->PM = array_merge_recursive($this->USER, array('tasks'=>array('edit','create','full')));
			$this->ADMIN = array_merge_recursive($this->PM, array('projects'=>array('view', 'create', 'edit'), 
																  'users'=>array('view','create','edit','delete'), 
																  'settings'=>array('view'),
																  'tasks'=>array('delete')));
		}

		public function is($action, $method) {
			$role = 'GUEST';
			if(isset($_SESSION['user'])) {
				$role = $_SESSION['user']->role;
			}

			if(isset($this->{$role}[$action]) && 
			   in_array($method, $this->{$role}[$action])) {
					return true;
			}

			exit();
		}
	}
?>