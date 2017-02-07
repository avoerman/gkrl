const jwt = require('express-jwt');

const authCheck = jwt({
    secret: 'i2IoDdhkItf-9oMz8JlW41IQbB-90oyK0kBMtNQwdfv78sKaRdtYJytll1_52JL7',
    audience: 'x7DzOI5eHu3wqs0E8flK15Q7i6NYfWhV'
});

module.exports = {authCheck: authCheck};
