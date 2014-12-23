/* global registerModule:true */

registerModule.factory('registerService', ['$http',
  function ($http) {

    return {

      sendMobile: function () {
        return $http({
          url: 'interface/register/success.json',
          method: 'post'
        });
      },

      sendCaptcha: function () {
        return $http({
          url: 'interface/register/success.json',
          method: 'post'
        });
      },

      sendFresh: function () {
        return $http({
          url: 'interface/register/success.json',
          method: 'post'
        });
      }

    };
  }
]);