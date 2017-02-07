const db = require('../../db'),
    Q = require('q');

exports.get = function (req, res) {
    db.Split.find()
        .populate('raceNumber')
        .exec(function (err, splits) {
            if (err) return console.log("Error......" + err);
            res.json(getRaceSummaryFromSplits(splits));
        });
};

exports.add = function (req, res) {
    let driverResults = req.body;
    const race = new db.Race({_id: driverResults[0].raceNumber, date: new Date()});
    race.save(function (err) {
        if (err) res.status(400).json({error: err});

        let promises = driverResults.map((driverResult) => {
            if (err) res.status(400).json({error: err});

            return driverResult.splits.map((split) => {
                const splitObj = new db.Split({
                    raceNumber: driverResult.raceNumber,
                    time: split.time,
                    lap: split.lap,
                    driverName: driverResult.driverName
                });

                return splitObj.save((err) => {
                    if (err) res.status(400).json({error: err});
                });
            });
        });

        Q.all(promises).then((d) => {
            res.status(200).json({status: 'success'});
        });
    });
};


const getUniqueRaceIdsFromSplits = (splits) => {
    debugger;
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
