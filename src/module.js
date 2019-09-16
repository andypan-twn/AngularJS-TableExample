angular.module('tableExample', [
    'ngMaterial', 
    'ngMessages',
]).config(function($mdIconProvider) {
    $mdIconProvider
        .defaultFontSet('FontAwesome')
        .fontSet('fa', 'FontAwesome');
});