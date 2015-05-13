package app

import (
    "log"
	"net/http"
	"encoding/json"
	"io/ioutil"
)

type Rest struct {

	Response http.ResponseWriter
	Request *http.Request	
}

func ( rest *Rest ) ResponseJson( data interface{} ) {

    js, err := json.Marshal(data)

    if err != nil {
        log.Fatal(err)  
    }

    rest.Response.Header().Set("Content-Type", "application/json")
    rest.Response.Write(js)
}

func ( rest *Rest ) RequestBody( obj interface{} ) {

    body, err_io := ioutil.ReadAll(rest.Request.Body)
   
    if err_io != nil {
        log.Fatal(err_io)
    }

    err_json := json.Unmarshal(body, &obj)

    if err_json != nil {
        log.Fatal(err_json)
    }
       
}


