exports.getRaceSummary = function (req, res) {
  // replace this with actual db call.
  res.json([{
      "raceNumber": 1,
      "date": "2017-01-26T00:00:00.000Z",
      "goldName": "Jared Shane",
      "goldTime": 43.824,
      "silverName": "Alex Voerman",
      "silverTime": 43.824,
      "bronzeName": "Michael Hutcheson",
      "bronzeTime": 43.863
    }, {
      "raceNumber": 2,
      "date": "2017-01-27T00:00:00.000Z",
      "goldName": "Alex Voerman",
      "goldTime": 41.456,
      "silverName": "Brett Linn",
      "silverTime": 42.165,
      "bronzeName": "Michael Hutcheson",
      "bronzeTime": 43.114
    }]
  )
};
