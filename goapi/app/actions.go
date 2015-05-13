package app

type ActionInterface interface {
	Get()
	Post()
	Put()
	Delete()	
    Call( string )
}


type Action struct {
	Rest Rest
}

func (a Action) Route(inst ActionInterface) {

	action := a.Rest.Request.URL.Query()["action"]
	method := a.Rest.Request.Method

	if action != nil {
		inst.Call(action[0])
	} else {

		switch method {
			case "GET" :
				inst.Get()
			case "POST" :
				inst.Post()
			case "PUT" :
				inst.Put()
			case "DELETE" :
				inst.Delete() 			
		}
	}

}
