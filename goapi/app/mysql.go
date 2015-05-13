package app

import (
	"log"
	"database/sql"  
   _"github.com/go-sql-driver/mysql"   
)

func Mysql() *sql.DB {

    db, err := sql.Open("mysql", "root:root@/todo")
   
    if err != nil {
    	log.Fatal(err)
    }
    
    return db
}