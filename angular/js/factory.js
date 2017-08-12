/// <reference path="angular.js" />
jsConfigApp.factory('loginFact', function ($http) {
    var fact = {};
    fact.auth = function (formdata) {
        $http.post("http://extrameal.in/dev/api/login", formdata).then(function (data) {
            console.log(data.data)
            if (data.data.status == true) {
                return true
            } else {
                return false
            }
        })
    }
    return fact;
})

jsConfigApp.factory('UserFact', function ($http) {
    var fact={};
    fact.fetch=function(){
        return $http.get("http://extrameal.in/dev/api/get/user")
    }
    fact.update = function (dataObj) {
        return $http.post('http://extrameal.in/dev/api/update/user', dataObj)
    }
    return fact;
})

jsConfigApp.factory('shopFact', function ($http) {
    var fact = {};
    fact.add = function (dataObj) {
        return $http.post("http://localhost:8080/api/shops",dataObj)
    }
    fact.fetch = function () {
        return $http.get("http://localhost:8080/api/shops")
    }
    fact.delete = function (id) {
        return $http.delete("http://localhost:8080/api/shops/" + id)
    }
    fact.update = function (dataObj) {
        return $http.put('http://localhost:8080/api/shops', dataObj)
    }
    return fact;
})

jsConfigApp.factory('menuFact', function ($http) {
    var fact = {};
    fact.fetch = function () {
        return $http.get("http://localhost:8080/api/menus")
    }
    fact.add=function(dataObj){
        return $http.post("http://localhost:8080/api/menus",dataObj)
    }
    fact.delete = function (id) {
        return $http.delete("http://localhost:8080/api/menus/" + id)
    }
    return fact;
})

jsConfigApp.factory('areaFact',function($http){
    var fact={};
    fact.fetch = function () {
        return $http.get("http://localhost:8080/api/areas")
    }
    fact.add=function(dataObj){
        return $http.post("http://localhost:8080/api/areas",dataObj)
    }
    fact.delete = function (id) {
        return $http.delete("http://localhost:8080/api/areas/" + id)
    }
    return fact;
})