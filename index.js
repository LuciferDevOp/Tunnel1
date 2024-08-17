
const express = require('express');
const path = require('path');

const getdb = require('./database/get');
const putdb = require('./database/put');
const deldb = require('./database/delete');
const addtoken = require('./database/addtoken');

const app = express();
const port = process.env.PORT || process.argv[3] || 8080;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/get', getdb);
app.use('/put', putdb);
app.use('/delete', deldb);
app.use('/addtoken', addtoken);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})