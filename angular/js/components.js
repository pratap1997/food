/// <reference path="angular.js" />
jsConfigApp.component('jsconfig', {
    template: 'I am in Index JSCONFIG'
})

jsConfigApp.component('jsvalue', {
    template: "<br/>Data after clicking here {{$ctrl.value}} and name is {{$ctrl.name}} !",
    bindings: {
        value: "="
    },
    controller: function () {
        this.name = 'nitin'
    }
})

jsConfigApp.component('login', {
    templateUrl: "./component/login.html",
    controller: function ($scope, loginFact) {
        $scope.formdata = {},
        $scope.sbt = function (formdata) {
            console.log(formdata)
            var result = loginFact.auth(formdata)
        },
        this.username = "I am Nitin"


    }
})

jsConfigApp.component('contact', {
    templateUrl: '/component/contact.html',
    controller: function () {
        this.contacUs = function (contactdata) {
            console.log(contactdata)
            //Its working, but there is no need of this component
        }
    }
})

jsConfigApp.component('user', {
    templateUrl:'component/user.html',
    controller: function ($scope,UserFact) {
        UserFact.fetch().then(function (data) {          
            $scope.users = data.data
            console.log($scope.users)
        })
        $scope.edit = function (ind) {
            $scope.front = true;
            $scope.user = $scope.users[ind];
        }
        $scope.update = function (arr) {      
            dataObj = { name: arr.name, email: arr.email, number: arr.number, user_id: arr.user_id }
            UserFact.update(dataObj).then(function (data) {
                console.log(data.data)
                $scope.front = false;
            },function(dsa){
                console.log(dsa) //for error
            })
        }
    }
})

jsConfigApp.component('shop', {
    templateUrl: './component/shop.html',
    controller: function ($scope,shopFact,areaFact) {
        function load() {
            shopFact.fetch().then(function (data) {
                $scope.shops = data.data;
                console.log($scope.shops)
            })
        } 
        areaFact.fetch().then(function(data){
                $scope.allarea=data.data;
                console.log($scope.allarea)
                $scope.selectedArea=$scope.allarea[0];
            })
        
        $scope.formUpdate=true;
        load();      
        $scope.add = function (shop_name,shop_desc,shop_address,shop_number,shop_numbers,shop_nonveg,area_id) {   
        var arr={
            shop_name:shop_name,
            shop_desc:shop_desc,
            shop_address:shop_address,
            shop_number:shop_number,
            shop_numbers:shop_numbers,
            shop_nonveg:shop_nonveg,
            area_id:area_id
        }       
            console.log(arr)
            shopFact.add(arr).then(function (data) {
                console.log(data.data)
                load();
            })
        }
        $scope.edit = function (ind) {
            $scope.shop = $scope.shops[ind];
            $scope.formUpdate=false;
        }
        $scope.delete = function (shopid) {
            shopFact.delete(shopid).then(function (data) {
                load();
            })
        }
        $scope.update = function (arr) {
            $scope.formUpdate=true; 
            shopFact.update(arr).then(function (data) {
                console.log(data.data)              
            },function(err){
                $scope.formUpdate=false;
            })
        }
    }
})

jsConfigApp.component('shopmenu', {
    templateUrl: './component/menu.html',
    controller: function ($scope,menuFact,shopFact) {    
            shopFact.fetch().then(function (data) {
                $scope.shopData = data.data;
                $scope.selectedShop=$scope.shopData[0];
                console.log($scope.shopData)
            });
        function load() {
            menuFact.fetch().then(function (data) {
            $scope.menus = data.data;
            console.log(data.data)
            });
        } 
        load();

        $scope.add=function(shop_id,menu_name,menu_desc,menu_price,menu_type){
            var dataObj={
                shop_id:shop_id,
                menu_name:menu_name,
                menu_desc:menu_desc,
                menu_price:menu_price,
                menu_type:menu_type
            }
            console.log(dataObj)
            menuFact.add(dataObj).then(function(data){
                console.log(data.data)
                load();
            })
        }
        $scope.delete = function (menuid) {
            menuFact.delete(menuid).then(function (data) {
                console.log(data.data)
                load();
            })
        }
    }
})

jsConfigApp.component('showarea',{
    templateUrl:'./component/area.html',
    controller:function($scope,areaFact){
        function load(){
            areaFact.fetch().then(function(data){
                $scope.areas = data.data;
            })
            console.log("nothing")        
        }
        load();
        $scope.add=function(area){
            areaFact.add(area).then(function(data){
                console.log(data)
            })
        }
        $scope.delete = function (areaid) {
            areaFact.delete(areaid).then(function (data) {
                console.log(data.data)
                load();
            })
        }
    }
})