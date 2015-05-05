'use strict';

var Q = require('q'),
    scraperjs = require('scraperjs'),
    mongoose = require('mongoose'),
    SlabConfigSetting = mongoose.model('SlabConfigSetting');

exports.getData = function (settings) {

    var deferred    = Q.defer();

    if(settings.settingId){
        SlabConfigSetting.findById(settings.settingId, function(err, doc){
            deferred.resolve(doc.setting.data);
        });
    }else{
        deferred.resolve([]);
    }

    return deferred.promise;

};
