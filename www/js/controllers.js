angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$state,$http,$ionicModal) {
	$scope.search=function(){
		if($scope.dbarea_id ==null){
			alert('Please Select Area')
		}
		else{
			$state.go('tab.chats')
		}
	}
	$scope.dbarea_id = localStorage.getItem("areaid")
	$scope.dbarea = localStorage.getItem("area")
	$scope.dbcity = localStorage.getItem("city")
	
	$http.get("https://extrameal.herokuapp.com/api/areas/distinct").then(function(data){
		console.log(data.data)
		$scope.abc=data.data;
		$scope.location=$scope.abc[0];
		$scope.loadarea($scope.location);	
	})

	$scope.loadarea=function(location){
		console.log(location)
		$scope.showload();
		$http.get("https://extrameal.herokuapp.com/api/areas/"+location).then(function(data){
		$scope.areas=data.data;
		console.log($scope.areas);
		$scope.hideload();
		})
	}
	
	$scope.savearea=function(area){
		console.log(area)
		localStorage.setItem("areaid",area._id)
		localStorage.setItem("area",area.child_area)
		localStorage.setItem("city",area.parent_area)
		$scope.dbarea_id = localStorage.getItem("areaid")
		$scope.dbarea = localStorage.getItem("area")
		$scope.dbcity = localStorage.getItem("city")
	}

	$http.get("https://extrameal.herokuapp.com/api/version").then(function(result){
		if(result.data.version != "2.0.0"){
			$scope.vermodal.show();
			}else{
			console.log("same version");
		}
	});

})

.controller('ChatsCtrl', function($scope, $http) {
		$scope.dbarea_id = localStorage.getItem("areaid")
		$scope.dbarea = localStorage.getItem("area")
		$scope.dbcity = localStorage.getItem("city")

		$scope.showload();
		$http.get('https://extrameal.herokuapp.com/api/shops/areas/'+$scope.dbarea_id).then(function(data){
			console.log(data)
			$scope.shops=data.data;
			$scope.hideload();
		})
})

.controller('ChatDetailCtrl', function($scope, $http, $stateParams) {
	$scope.shop_id = $stateParams.chatId;

	var nmbr = Math.floor(Math.random() * 10) + 1;
	console.log(nmbr)
	$scope.image="http://extrameal.in/meal/image/"+nmbr+".jpg";

	$scope.showload();
	$http.get('https://extrameal.herokuapp.com/api/shops/'+$scope.shop_id).then(function(result){
		console.log(result.data)
			$scope.shopdetails=result.data[0];
			$scope.hideload();
	})
	$http.get('https://extrameal.herokuapp.com/api/menus/shops/'+$scope.shop_id).then(function(data){
			$scope.menudata=data.data;
	})

	$scope.rating=0;
	$scope.testing=function(index){
		$scope.rating=index;
		console.log(index)
		var dataObj={
			user_id:localStorage.getItem("realid"),
			shop_id:$scope.shop_id,
			rating:index
		}
		$http.post('https://extrameal.herokuapp.com/api/rate',dataObj).then(function(result){
			alert(result.data.message)
		})
	}

})

.controller('AccountCtrl', function($scope, $ionicModal, $http, $timeout, $window) {

	  $ionicModal.fromTemplateUrl('templates/contact.html', {
		scope: $scope
	  }).then(function(modal) {
		$scope.conmodal = modal;
	  });
	  $ionicModal.fromTemplateUrl('templates/profile.html', {
		scope: $scope
	  }).then(function(modal) {
		$scope.promodal = modal;
	  });  

	  $scope.contact = function() {
		$scope.conmodal.show();
	  };
	  $scope.closeContact = function() {
		$scope.conmodal.hide();
	  };
	  $scope.profilemo = function() {
		$scope.promodal.show();
		$scope.showload();
		$http.get("https://extrameal.herokuapp.com/api/users/"+$scope.user_id).success(function(response){
			$scope.profile=response;
			$scope.hideload();
		})
	  };
	  $scope.closeProfile = function() {
		$scope.promodal.hide();
	  };

	


})

.controller('commonctrl', function($scope,$http,$ionicLoading,$ionicModal){
	$scope.showload=function() {
		$ionicLoading.show({
		  template: '<ion-spinner icon="android"></ion-spinner>'
			});
		};
	$scope.hideload=function(){
			$ionicLoading.hide();
		};	
		
	$ionicModal.fromTemplateUrl('templates/version.html', {
		scope: $scope,
		hardwareBackButtonClose: false
	  }).then(function(modal) {
		$scope.vermodal = modal;
	  });
	$scope.test=function(){
		ionic.Platform.exitApp()
	}

	$scope.user_id=localStorage.getItem("realid");
	  if($scope.user_id == null){
		  $scope.loggedin=false;
	  }else{
		  $scope.loggedin=true;
	  }
	  $scope.loginData = {};
	  $scope.regData = {};

	  $ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	  }).then(function(modal) {
		$scope.modal = modal;
	  });
	  
	  $ionicModal.fromTemplateUrl('templates/register.html', {
		scope: $scope
	  }).then(function(modal) {
		$scope.regmodal = modal;
	  });
	  
	  $scope.closeLogin = function() {
		$scope.modal.hide();
	  };
	  $scope.login = function() {
		$scope.modal.show();
	  };
	  $scope.closeRegister = function() {
		$scope.regmodal.hide();
	  };
	  $scope.register = function() {
		$scope.regmodal.show();
	  };

	$scope.doLogin = function(loginData) {
	$scope.showload();
		$http.post('https://extrameal.herokuapp.com/api/users/login', loginData).then(function(result) {
			console.log(result.data);
			if(result.data.status){
				localStorage.setItem("realid", result.data.realid);
				$scope.user_id=localStorage.getItem("realid");
				$scope.hideload();
				$scope.modal.hide();
				if($scope.user_id == null){
					  $scope.loggedin=false;
				}else{
					  $scope.loggedin=true;
				}
			}else{
				alert("Wrong Credentials..")
				$scope.hideload();
			}
		})  
	}

	$scope.doRegister = function(regData) {
	$scope.showload()
    	console.log(regData)
		$http.post('https://extrameal.herokuapp.com/api/users',regData).then(function(result) {
			console.log(result.data);
			if(result.data.status=="true"){
				localStorage.setItem("realid", result.data.realid);
				$scope.user_id=localStorage.getItem("realid");
				if($scope.user_id == null){
					  $scope.loggedin=false;
				  }else{
					  $scope.loggedin=true;
				}	
				$scope.hideload();
				$scope.regmodal.hide();	
			}else{
				$scope.hideload();
				alert(result.data.message)
			}		
		})
	}

	$scope.logout = function() {		
		localStorage.removeItem("realid");
		$scope.loggedin=false;
	}	
})
