const models = require('../models/race.model.js');

const getUniqueDriverIdsFromSplits = (splits) => {
    return splits.map(item => item.driverName)
        .filter((value, index, self) => self.indexOf(value) === index);
};

const getSplitsFromDriverSorted = (splits, driverName) => {
    return splits.filter((obj) => {
        return obj.driverName === driverName;
    }).sort((a, b) => {
        return a.time - b.time;
    });
};

const sortDescFromMap = (map) => {
    return Array.from(map).sort(function (a, b) {
        return a - b;
    });
};

const getTimesRank = (bestTimes, rec, prop) => {
    const bestTimesMap = new Set(Object.keys(bestTimes).map(function (key) {
        return bestTimes[key][prop];
    }));

    const bestTimesMapSorted = sortDescFromMap(bestTimesMap);

    return bestTimesMapSorted.indexOf(rec[prop]) + 1;
};

const getLeaderboardRecordsFromSplits = (splits) => {
    const uniqueDrivers = getUniqueDriverIdsFromSplits(splits);
    let bestTimes = [];
    for (let driver of uniqueDrivers) {
        const driverSplits = getSplitsFromDriverSorted(splits, driver);

        const bestThree = driverSplits.slice(0, 3).map((key) => {
            return key.time;
        });
        const bestFive = driverSplits.slice(0, 5).map((key) => {
            return key.time;
        });

        const bestTimesObj = {
            driver: driver,
            bestTime: driverSplits[0] ? driverSplits[0].time : 0,
            bestFiveTimes: bestFive,
            avgFive: bestFive.reduce((a, b) => a + b) / bestFive.length,
            bestThreeTimes: bestThree,
            avgThree: bestThree.reduce((a, b) => a + b) / bestThree.length,
        };

        bestTimes.push(bestTimesObj);
    }

    let leaderboardRecords = [];
    for (let bestTimeRec of bestTimes) {

        const leaderboardRecord = {
            driver: bestTimeRec.driver,
            bestTime: bestTimeRec.bestTime,
            bestFiveTimes: bestTimeRec.bestFiveTimes,
            avgFive: bestTimeRec.avgFive,
            bestThreeTimes: bestTimeRec.bestThreeTimes,
            avgThree: bestTimeRec.avgThree,
            bestTimeRank: getTimesRank(bestTimes, bestTimeRec, 'bestTime'),
            fastFiveRank: getTimesRank(bestTimes, bestTimeRec, 'avgFive'),
            fastThreeRank: getTimesRank(bestTimes, bestTimeRec, 'avgThree')
        };
        leaderboardRecords.push(leaderboardRecord);
    }
    return leaderboardRecords.sort((a, b) => {
        return a.bestTime - b.bestTime;
    });
};

exports.getLeaderBoardSummary = function (req, res) {
    models.Split
        .find()
        .populate('raceNumber')
        .exec(function (err, splits) {
            if (err) return console.log(err);
            res.json(getLeaderboardRecordsFromSplits(splits));
        });

};
