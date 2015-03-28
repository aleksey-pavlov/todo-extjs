<?php 

	class TasksAction extends Action {

		var $keys = array();

		public function get() {
			$this->acl->is('tasks','view');
			$id = $this->request->getParam('id', 'get');
			$year = $this->request->getParam('year', 'get');
			$month = $this->request->getParam('month', 'get');
			$user = $this->request->getParam('user', 'get');

			$output = array();
			$sql = "SELECT t.*, 
						u.username AS user_name 
					FROM `tasks` AS t 
					JOIN `users` AS u ON u.id=t.user_id WHERE t.enabled=1";

			if($id) {
				$sql .= " AND t.id='{$id}'";
			}

			if($user) {
				$sql .= " AND u.id='{$user}'";
			}

			if(isset($_SESSION['user']) && !empty($_SESSION['user']->filters)) {
				$filters = json_decode($_SESSION['user']->filters, true);
				if(isset($filters['status'])){
					foreach ($filters['status'] as &$val) { $val = "'{$val}'"; }
					
					$status = implode(",", $filters['status']);					
					$sql .= " AND t.status IN({$status})";
				}
			}

			$q = $this->db->q($sql);
			$i = 0;

			while($row = mysqli_fetch_assoc($q)) {
				
				$output[$i] = $row;

				$sql = "SELECT * FROM `task_hours` WHERE `task_id`='{$row['id']}'";
				
				if($year && $month) {
					$start = "{$year}-{$month}-01";
					$finish = "{$year}-{$month}-31";
					$sql.=" AND UNIX_TIMESTAMP(DATE(`key`))>=UNIX_TIMESTAMP('{$start}') AND UNIX_TIMESTAMP(DATE(`key`))<=UNIX_TIMESTAMP('{$finish}')";
				}

				if(count($this->keys) > 0) {
					$keys = implode(',', $this->keys);
					$sql.=" AND `key` IN('{$keys}')";
				}
				
				$q1 = $this->db->q($sql);
				
				while($hour = mysqli_fetch_object($q1)) {
					$output[$i][$hour->key] = array('note'=>$hour->note, 
													'value'=>$hour->value,
													'created'=>$hour->created,
													'updated'=>$hour->updated);													 
				}

				$i++;
			}

			return array('tasks'=>$output);
		}

		public function post() {			
			$this->acl->is('tasks','create');
			$data = $this->getRequestParams();
			$data['created'] = $this->timestamp;
			$data['updated'] = $this->timestamp;			
						
			$id = $this->db->insertFromArray($data, 'tasks');
			
			return array('tasks'=>array('id'=>$id));
		}

		public function put() {
			$this->acl->is('tasks','edit');
			$id = $this->request->getParam('id', 'get');

			$data = $this->getRequestParams();
			$data['updated'] = $this->timestamp;
		
			if($id) {
				$hours = array();
				$params = $this->request->getParams('put');
				foreach ($params as $key => $value) {
					if(preg_match('/[0-9-]{10}/', $key) && $value) {
						if($value['value']>0){
							$hours[] = "('{$id}', '{$key}', '{$value['value']}', '{$value['note']}', NOW(), NOW())";							
						} else {
							$this->db->q("DELETE FROM `task_hours` WHERE `key`='{$key}' AND `task_id`='{$id}'");
						}
						$this->keys[] = $key;
					}
				}

				if($hours) {
					$hours = implode(',', $hours);
					$query = "INSERT INTO `task_hours` (`task_id`, `key`, `value`, `note` ,`created`, `updated`) 
							VALUES {$hours} 
							ON DUPLICATE KEY UPDATE `value`=VALUES(`value`), 
													`note`=VALUES(`note`), 
													`updated`=NOW()";

						$this->db->q($query);
				}

				$this->db->updateFromArray($data, 'tasks', "id='{$id}'");
			}


			return $this->get();	
		}

		public function delete() {
			$this->acl->is('tasks','delete');
			$id = $this->request->getParam('id', 'get');

			$this->db->q("DELETE FROM `tasks` WHERE `id`='{$id}'");
			$this->db->q("DELETE FROM `task_hours` WHERE `task_id`='{$id}'");

			return array('success'=>true);
		}


		private function getRequestParams() {
 			return array(
				'project_id' => $this->request->getParam('project_id', 'put'),
				'user_id' => $this->request->getParam('user_id', 'put'),
				'name' => $this->request->getParam('name', 'put'),
				'description' => $this->request->getParam('description', 'put'),
				'labor' => $this->request->getParam('labor', 'put'),
				'status' => $this->request->getParam('status', 'put'),
				'priority' => $this->request->getParam('priority', 'put'),

			);
		}
	}
?>
