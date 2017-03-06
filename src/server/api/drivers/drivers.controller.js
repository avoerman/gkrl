const db = require('../../db'),
    Q = require('q');

const getTotalRacesFromSplits = (splits) => {
    const uniqueRaces = splits.filter((ele, i, arr) => {
        return arr.map(ele => ele['raceNumber']).indexOf(ele['raceNumber']) === i;
    });

    return uniqueRaces.length;
};

const getDriverDetailsFromSplits = (splits) => {
    return {
        totalRaces: getTotalRacesFromSplits(splits)
    };
};

exports.details = function (req, res) {
    const driverName = decodeURI(req.params.id);
    db.Split.find({
        "driverName": driverName
    }).exec((err, splits) => {
        if (err) return console.log("Error......" + err);
        const raceDetailStats = getDriverDetailsFromSplits(splits);
        res.json(Object.assign({ driverName: driverName }, raceDetailStats));
    });
};
