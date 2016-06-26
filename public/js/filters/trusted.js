
'use strict';

/* Filtry */
angular.module('Tracks').filter('trusted', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    }
});

angular.module('Tracks').filter('trustedHtml', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    }
});