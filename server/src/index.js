const Express = require('express');
const cors = require('cors')
require('dotenv').config();


const app = Express();
const Router = require('./router');

app.use(cors());
app.use(Express.json())

app.use(Router);


app.listen(3000, () => {
  console.log('listening');
});
