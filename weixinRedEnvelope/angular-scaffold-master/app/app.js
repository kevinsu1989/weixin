/* global serialize:true */
var callback=function(res) {
	__callback__=res;
}
// Initialize
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'angular-growl', 'templates', 'homeModule', 'registerModule', 'decorateModule', 'redEnvelopeModule']);

// bootstrap
angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});