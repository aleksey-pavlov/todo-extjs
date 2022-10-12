<?php 
	class ProjectsAction extends Action {
		
		public function get() {
			$this->acl->is('projects','view');
			$output = array();
			$query = $this->db->q('SELECT * FROM `projects`');
			while ($row = mysqli_fetch_object($query)) {
				$output[] = $row;
			}
			return array('projects'=>$output);
		}

		public function post() {
			$this->acl->is('projects','create');
			$params = array( 
					'name' => $this->request->getParam('name', 'post'),
					'description' => $this->request->getParam('description', 'post')
				);
			
			$id = $this->db->insertFromArray($params, 'projects');

			return array('projects'=>array('id'=>$id));
						
		}

		public function put() {
			$this->acl->is('projects','edit');
			$id = $this->request->getParam('id', 'get');

			$params = array( 
					'name' => $this->request->getParam('name', 'put'),
					'description' => $this->request->getParam('description', 'put')
				);

			$this->db->updateFromArray($params, 'projects', "id={$id}");

			return array('success'=>true);
		}

		public function delete() {
			$this->acl->is('projects','delete');
			$id = $this->request->getParam('id', 'get');
			
			$this->db->q("DELETE FROM `projects` WHERE `id`='{$id}'");

			return array('success'=>true);

		}


	}

  ?>