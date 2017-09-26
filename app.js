var app = angular.module("testApp",[]);
app.controller("formController",["$scope","$http", function(scope,http){
	scope.isFormDisplay = false;
	scope.fields;
	scope.getForm = function(){
		scope.isloading = true;
		scope.isFormDisplay = false;
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
	scope.checkOption = function(index, opt){
		if(scope.fields[index].component == 'checkbox'){
			scope.fields[index].value.push(opt);
		};

	}
	scope.submitForm = function(){
		var sendObj = {};
		tempArray = [];
		angular.forEach(scope.fields, function(val, key) {
			var temp = {};
  			temp.label = val.label;
  			temp.data = val.value;
  			tempArray.push(temp);  	
  		});
  		sendObj.data = JSON.parse(JSON.stringify(tempArray));
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
		
		http.post(req).then(function(){
			console.log("successfull submitted");
		});
	}
}]);
