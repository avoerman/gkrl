const models = require('../models/race.model.js');

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


exports.getRaceSummary = function (req, res) {

    models.Split
        .find()
        .populate('raceNumber')
        .exec(function (err, splits) {
            if (err) return console.log(err);

            res.json(getRaceSummaryFromSplits(splits));
        });
};
