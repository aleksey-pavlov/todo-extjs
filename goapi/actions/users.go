package actions

import (
		"log"
		"fmt"
		"../app"
	)

type UserModel struct {

	Id int64 `json "id"`
	Role string `json "role"`
	Filters string `json "filters"`
	Username string `json "username"`
	Email string `json "email"`
	Password string `json "password"`
	Created string `json "created"`
	Updated string `json "updated"`
}

type User struct { 
	app.Action
}

func (u User) Call(action string) {

	switch action {
		case "auth" :
			u.Auth()
	}
}

func ( u User ) Get() {

	db := app.Mysql()

	rows, err := db.Query("SELECT * FROM `users`")

	if err != nil {
		log.Fatal(err)
	}

	users := []UserModel{}

	for rows.Next() {

			user := UserModel{}

			rows.Scan(  &user.Id, 
						&user.Role, 
						&user.Filters, 
						&user.Username, 
						&user.Email, 
						&user.Password, 
						&user.Created, 
						&user.Updated  )

			users = append( users, user )
	}
	
	u.Rest.ResponseJson( users )
}

func (u User) Post() { 

	 user := UserModel{}
	 db := app.Mysql()

	 u.Rest.RequestBody(&user)

	 sql := fmt.Sprintf("INSERT INTO `users` ( `username`, "+ 
												"`email`, "+
												"`password`, "+
												"`role`, "+
												"`filters`,"+
												"`created`, "+
												"`updated`) VALUES ('%s', '%s', '%s', '%s', '', NOW(), NOW())", 
						user.Username, user.Email, user.Password, user.Role)

	 result, err := db.Exec(sql)
	 
	 if err != nil {
	 	log.Fatal(err)
	 }

	 user.Id, _ = result.LastInsertId()


	 u.Rest.ResponseJson( user )
}

func (u User) Put() {
		 
	 user := UserModel{}
	 db := app.Mysql()

	 u.Rest.RequestBody(&user)

	 sql := fmt.Sprintf("UPDATE `users` SET `username`='%s', "+
											 "`email`='%s', "+
											 "`password`='%s', "+
											 "`role`='%s', "+
											 "`filters`='%s', "+
											 "`updated`=NOW() "+
						"WHERE `id`='%d'",
						user.Username, user.Email, user.Password, user.Role, user.Filters, user.Id)

	 _, err := db.Exec( sql )

	 if err != nil {
	 	log.Fatal(err)
	 }

	 u.Rest.ResponseJson( user )
}

func (u User) Delete() {
		
		user := UserModel{}
		db := app.Mysql()

		u.Rest.RequestBody(&user)

		_, err := db.Exec("DELETE FROM `users` WHERE `id`=?", user.Id)

		if err != nil {
			log.Fatal(err)
		}

		u.Rest.ResponseJson( user )
}  

func (u *User) Auth() {
	u.Rest.ResponseJson(u)
}
