var db = require('../../db');
var request = require('request');

exports.index = function (req, res) {
    db.Split.find()
        .populate('raceNumber')
        .exec(function (err, splits) {
            if (err) return console.log("Error......" +err);
            res.json(getRaceSummaryFromSplits(splits));
        });
};


exports.details = function (req, res) {
    db.Split.find({
        "raceNumber" : req.params.racenumber
    }).sort('lap').exec(function (err, splits) {
            if (err) return console.log("Error......" +err);
            res.json(combineRaceStats(splits));
        });
};

const combineRaceStats = (splits) => {
    var orderedStats = {
        maxLaps: 0,
        drivers: []
    };
    for(var i = 0; i < splits.length; i++){
        let driverName = splits[i].driverName;
        if(arrayObjectIndexOf(orderedStats.drivers, driverName, "name") != -1) {
            //Adding lap entry
            orderedStats.drivers[arrayObjectIndexOf(orderedStats.drivers, driverName, "name")].laps.push({
                lapNum: splits[i].lap,
                time: splits[i].time
            });             
            
            //Updating max lap
            if(orderedStats.maxLaps < splits[i].lap){            
                orderedStats.maxLaps = splits[i].lap;
            }

        } else {
            orderedStats.drivers.push({ 
                name: driverName,
                laps: [{
                    lapNum: splits[i].lap,
                    time: splits[i].time
                }]
            });
        }
    }

    return orderedStats;
};


function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}


const getUniqueRaceIdsFromSplits = (splits) => {
    return splits.map(item => item.raceNumber._id)
        .filter((value, index, self) => self.indexOf(value) === index);
};

const getThisRaceSplitsSorted = (splits, raceId) => {
    return splits.filter((obj) => {
        return obj.raceNumber._id === raceId;
    }).sort((a, b) => {
        return a.time - b.time
    });
};

const getSplitsSansNames = (sortedSplits, names) => {
    let splitsSans = sortedSplits.filter((o) => {
        return names.indexOf(o.driverName) === -1;
    });
    return {
        time: splitsSans[0] ? splitsSans[0].time : '',
        name: splitsSans[0] ? splitsSans[0].driverName : ''
    };
};

const getRaceSummaryFromSplits = (splits) => {
    const uniqueRaces = getUniqueRaceIdsFromSplits(splits);

    let raceSummaryObj = [];
    for (let raceId of uniqueRaces) {

        //This could probably be done in one function, if I was smarter.
        const thisRaceSplitsSorted = getThisRaceSplitsSorted(splits, raceId);

        const goldTime = thisRaceSplitsSorted[0].time;
        const goldName = thisRaceSplitsSorted[0].driverName;

        const silverSplits = getSplitsSansNames(thisRaceSplitsSorted, [goldName]);
        const bronzeSplits = getSplitsSansNames(thisRaceSplitsSorted, [goldName, silverSplits.name]);

        const summaryObj = {
            raceNumber: raceId,
            date: thisRaceSplitsSorted[0].raceNumber.date,// this should be safe,
            goldTime: goldTime,
            goldName: goldName,
            silverTime: silverSplits.time,
            silverName: silverSplits.name,
            bronzeTime: bronzeSplits.time,
            bronzeName: bronzeSplits.name
        };

        raceSummaryObj.push(summaryObj);
    }
    return raceSummaryObj;
};