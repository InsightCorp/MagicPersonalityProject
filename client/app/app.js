angular.module('MP', [
  'MP.services',
  'MP.main',
  'MP.auth',
  'MP.loadingPage',
  'MP.watson',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })

    .when('/loggingin', {
      templateUrl: 'app/auth/loadingPage.html',
      controller: 'loadingPageController'
    })
    
    .when('/main', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    })

    .when('/watson', {
      templateUrl: 'app/playground/index.html',
      controller: 'watController'
    })
});

