/* global homeModule:true */

homeModule.factory('homeService', ['$http',
  function ($http) {

    return {

      getCatagory: function () {
        return $http({
          url: 'interface/home/catagory.json',
          method: 'get',
          cache: true
        });
      },

      getModules: function () {
        return $http({
          url: 'interface/home/modules.json',
          method: 'get',
          cache: true
        });
      }

    };
  }
]);