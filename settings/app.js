var mongoose = require('mongoose'),
    SlabConfigSetting = mongoose.model('SlabConfigSetting'),
    Baby = require('babyparse'),
    pretty = require('js-object-pretty-print').pretty;


exports.post = function(req, res){

    var csvData;
    var result;
    var parseConfig = {header:true};

    var slabConfigId = req.body.slabConfigId;
    var networkId = req.body.networkId;

    if(req.body.pasteText){
        csvData = req.body.pasteText;
        parsed = Baby.parse(csvData, parseConfig);
        result = parsed.data;
    }

    if(req.body.file){
        csvData = req.body.file;
        parsed = Baby.parse(csvData, parseConfig);
        result = parsed.data;
    }


    var saveObject = {
        network_id:networkId,
        slab_guid:slabConfigId,
        setting:{
            data:result
        }
    };

    SlabConfigSetting.findOneAndUpdate({
        network_id:networkId,
        slab_guid:slabConfigId
    }, saveObject, { upsert:true, new:true }, function(err, doc){

        if(err){
            res.status(400);
            res.send(err);
            return;
        }

        res.json({
            settingId:doc._id,
            data:result
        });

    });


};
