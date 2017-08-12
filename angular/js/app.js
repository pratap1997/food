/// <reference path="angular.js" />
var jsConfigApp = angular.module('my-app', ['ngRoute'])

jsConfigApp.config(function ($routeProvider) {
    $routeProvider
    .when('/first', {
        templateUrl: './html/First.html'
    })
    .when('/second', {
        templateUrl: './html/Second.html'
    })
    .when('/', {
        templateUrl: './html/Home.html'
    })
    .when('/contact', {
        template: '<contact><contact>'
    })
    .when('/user',{
        template: '<user></user>'
    })
    .when('/shop', {
        template:'<shop></shop>'
    })
    .when('/menu', {
        template:'<shopmenu></shopmenu>'
    })
    .when('/area', {
        template:'<showarea></showarea>'
    })
    .otherwise({
        redirectTo:'/'
    })
})