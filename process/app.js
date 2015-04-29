'use strict';

var Q = require('q');
var scraperjs = require('scraperjs');






exports.getData = function (settings) {

    var deferred = Q.defer();

    var data = [
        {data:'someData'}
    ];

    deferred.resolve(data);

    return deferred.promise;

};
