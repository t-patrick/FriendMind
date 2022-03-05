const Express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const test = require('./model/testingfile');
const app = Express();
const router = require('./router');
app.use(cors());
app.use(router);
app.listen(3000, () => {
    console.log('listening');
});
//# sourceMappingURL=index.js.map