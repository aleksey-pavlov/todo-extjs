package app

import (
	"log"
	"database/sql"  
        _ "github.com/go-sql-driver/mysql"
)

func Mysql() *sql.DB {

    db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/todo")
   
    if err != nil {
    	log.Fatal(err)
    }
    
    return db
}