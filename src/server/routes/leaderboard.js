exports.getLeaderBoardSummary = function (req, res) {
  res.json([{
      "driver": "Alex Voerman",
      "bestTime": 41.465,
      "bestTimeRank": 1,
      "bestFiveTimes": [41.465, 42.456, 42.567, 42.765, 44.546],
      "avgFive": 42.876,
      "fastFiveRank": 2,
      "bestThreeTimes": [41.465, 42.456, 42.567],
      "avgThree": 41.414,
      "fastThreeRank": 2
    }, {
      "driver": "Brett Linn",
      "bestTime": 42.424,
      "bestTimeRank": 2,
      "bestFiveTimes": [42.145, 42.166, 42.666, 42.765, 43.544],
      "avgFive": 42.656,
      "fastFiveRank": 1,
      "bestThreeTimes": [42.145, 42.166, 42.666],
      "fastThreeRank": 1,
      "avgThree": 42.456
    }]
  )
};
