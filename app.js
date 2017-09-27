var app = angular.module("testApp",[]);
app.controller("formController",["$scope","$http", function(scope,http){
	scope.isFormDisplay = false;
	scope.fields;
	scope.isloading = false;
	scope.getForm = function(){
		scope.isloading = true;
		scope.isFormDisplay = false;
		var req = {
			method: "get",
		    url: "destination.com"
		};
		http.get("https://randomform.herokuapp.com/").then(function(res){
			scope.isFormDisplay = true;
			scope.isloading = false;
			var formdata = res.data.data;
			console.log("Data received :: "+ JSON.stringify(formdata));
			scope.id = formdata.form_id;
			scope.name = formdata.form_name;
			scope.fields = formdata.form_fields;
 		});
	}
	scope.isChecked = function(index,opt){
		var match = false;
		if(scope.fields[index].autoselect){
	      	for(var i=0 ; i < scope.fields[index].autoselect.length ; i++) {
			if(scope.fields[index].autoselect[i]== opt){
				match = true;
			}
	      	}
	    }
	    return match;
	}
	scope.submitForm = function(){
		var sendObj = {};
		sendObj.data = {};
		for(i=0;i<scope.fields.length;i++){
			sendObj.data[scope.fields[i].label] = scope.fields[i].value;
  		}
  		sendObj.success = 'true';
  		console.log("submit data /; "+JSON.stringify(sendObj));
  		var req = {
			 method: 'POST',
			 url: 'https://randomform.herokuapp.com/submit',
			 data: sendObj,
			 headers: {
	            'Content-Type': 'application/json; charset=utf-8'
	        }
		};
		
		http.post('https://randomform.herokuapp.com/submit',sendObj).then(function(){
			console.log("successfull submitted");
		});
	}
}]);
