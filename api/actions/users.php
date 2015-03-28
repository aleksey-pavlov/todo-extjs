<?php 
	class UsersAction extends Action {

		public function get() {
			$this->acl->is('users','view');		
			$output = array();
			$q = $this->db->q("SELECT *	FROM `users`");
			while($row = mysqli_fetch_object($q)) {
				$output[] = $row;
			}

			return array('users'=>$output);
		}

		public function post() {
			$this->acl->is('users','create');
			$data = array(
					'username'=>$this->request->getParam('username', 'put'),					
					'email'=>$this->request->getParam('email', 'put'),
					'password'=>$this->request->getParam('password','put'),
					'role'=>$this->request->getParam('role', 'put'),
					'updated'=>$this->timestamp,
					'created'=>$this->timestamp
				);			
			
			$id = $this->db->insertFromArray($data, 'users');
			
			return array('users'=>array('id'=>$id));
		}

		public function put() {
			$this->acl->is('users','edit');			
			$id = $this->request->getParam('id', 'get');
			$data = array(
					'username'=>$this->request->getParam('username', 'put'),					
					'email'=>$this->request->getParam('email', 'put'),
					'password'=>$this->request->getParam('password','put'),
					'role'=>$this->request->getParam('role', 'put'),
					'filters'=>$this->request->getParam('filters', 'put'),
					'updated'=>$this->timestamp
				);

			$this->db->updateFromArray($data, 'users', "id='{$id}'");
			
			if($_SESSION['user']->id==$id) {
				$q = $this->db->q("SELECT * FROM `users` WHERE `id`='{$id}'");
				$user = mysqli_fetch_object($q);
				$_SESSION['user'] = $user;
			}

			return array('success'=>true);
		}

		public function delete() {
			$this->acl->is('users','delete');
			$id = $this->request->getParam('id', 'get');
			$q = $this->db->q("DELETE FROM `users` WHERE `id`='{$id}'");

			if($q) {
				return array('success'=>true);
			}
		}

		/* Sessions callback functions*/

		/* Авторизация */
		public function auth() {
			$email = $this->request->getParam('email','post');
			$password = $this->request->getParam('password','post');
			$q = $this->db->q("SELECT * FROM `users` WHERE `email`='{$email}' && `password`='{$password}'");
			$user = mysqli_fetch_object($q);
			if($user) {				
				$_SESSION['user'] = $user;
				return array('success'=>true);
			} else {
				return array('success'=>false);
			}
		}

		/* Возвращает сессионные данные */
		public function check() {			
			if(!isset($_SESSION['user'])) {
				return false;
			}
			$output = array();
			$role = $_SESSION['user']->role;
			$_SESSION['user']->acl = $this->acl->{$role};
			return $_SESSION;
		}

		/* Завершить сессию  */
		public function destroy() {			
			session_destroy();
			return array('success'=>true);
		}

		/* Возвращает список ролей */
		public function roles() {			
			$acl_vars = get_class_vars('Acl');
			$roles = array();
			foreach ($acl_vars as $key=>$val) {
				$roles[] = $key;
			}
			return $roles;
		}

	}
?>