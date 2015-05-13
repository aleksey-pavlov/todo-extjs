package main

import (
    "./actions"
    "./app"
    "net/http"
    "fmt"
)

func main() { 
    
    http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {		

		user := actions.User { app.Action { app.Rest { w, r } } }
		user.Route(user)
			
    } )    
    
 	fmt.Println("Server start on port 8000")
	http.ListenAndServe(":8000", nil)
}