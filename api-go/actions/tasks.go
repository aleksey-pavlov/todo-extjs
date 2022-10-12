package actions

import (
	"../app"
)

type TaskModel struct {
	Id int64 `json "id"`
	ProjectId int64 `json "project_id"`
	UserId int64 `json "user_id"`
	Name string `json "name"`
	Description string `json "description"`
	Created string `json "created"`
	Updated string `json "updated"`
	Labor float64 `json "labor"`
	Status string `json "status"`
	Priority string `json "priority"`
	Username string `json "username"` 
}

type TaskRequestModel struct {
	Id int64 `json "id"`
	Year int64 `json "year"`
	Month int64 `json "month"`
	User int64 `json "user"`
}

type Task struct {
	app.Action
}


func (t Task) Get() {

}

func (t Task) Post() {

}

func (t Task) Put() {

}

func (t Task) Delete() {

}
