// import from pkg
const http = require('http');
const express = require('express');
const path = require('path');
const hbs = require('hbs'); //viewEngine

const pathFile = 'http://localhost:7000/uploads/';
const dbConnection = require('./connection/db');

// routes
const detailRoute = require('./routes/detail');
const kabupatenRoute = require('./routes/kabupaten');
const provinsiRoute = require('./routes/provinsi');

// call function express instantiate to var
const app = express();

// use express library
// "./static" is a virtual path prefix
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: false }));

// set views location to app
app.set('views', path.join(__dirname, 'views'));
// set view engine
app.set('view engine', 'hbs');
// register view partials directory
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// render index page
app.get('/', function (req, res) {
  const query = 'SELECT * FROM provinsi_tb';

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      let dataProv = results.map((result) => {
        result.diresmikan = result.diresmikan.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        result.photo = pathFile + result.photo;

        return result;
      });

      res.render('index', {
        title: 'Data Provinsi & Kabupaten',
        dataProv,
      });
    });
    conn.release();
  });
});

// mount routes
app.use('/', detailRoute);
app.use('/', kabupatenRoute);
app.use('/', provinsiRoute);

// create server
const server = http.createServer(app);
const port = 7000;
server.listen(port, () => {
  console.log('server running on port: ', port);
});
