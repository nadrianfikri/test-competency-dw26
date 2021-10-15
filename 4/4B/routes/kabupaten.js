const router = require('express').Router();
const dbConnection = require('../connection/db');
const pathFile = 'http://localhost:7000/uploads/';
const uploadFile = require('../middlewares/uploadFile');

// render kabupaten page
router.get('/kabupaten', function (req, res) {
  const query = 'SELECT * FROM kabupaten_tb';

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      let dataKab = results.map((result) => {
        result.diresmikan = result.diresmikan.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        result.photo = pathFile + result.photo;

        return result;
      });

      res.render('kabupaten', {
        title: 'Data Kabupaten',
        dataKab,
      });
    });
    conn.release();
  });
});

// render add-kab
router.get('/kabupaten/add', function (req, res) {
  const query = 'SELECT * FROM provinsi_tb';

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, (err, results) => {
      if (err) throw err;

      const dataProv = results.map((result) => result);

      res.render('manageData/add-kab', {
        title: 'Add kabupaten',
        dataProv,
      });
    });
    conn.release();
  });
});

//handle post kabupaten
router.post('/kabupaten/add', uploadFile('photo'), function (req, res) {
  let { kabName, date, provinsi_id } = req.body;
  let photo = req.file.filename;

  const query = 'INSERT INTO kabupaten_tb(nama, provinsi_id, diresmikan, photo) VALUES (?,?,?,?)';

  dbConnection.getConnection((err, conn) => {
    conn.query(query, [kabName, provinsi_id, date, photo], (err, results) => {
      if (err) throw err;
      res.redirect('/kabupaten');
    });

    conn.release();
  });
});

// handle delete kabupaten
router.get('/kabupaten/delete/:id', function (req, res) {
  const { id } = req.params;

  const query = 'DELETE FROM kabupaten_tb WHERE id = ?';

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [id], (err, results) => {
      if (err) throw err;

      res.redirect('/kabupaten');
    });

    conn.release();
  });
});

// render edit-kabupaten
router.get('/kabupaten/edit/:id', function (req, res) {
  const { id } = req.params;

  const queryKab = 'SELECT * FROM kabupaten_tb WHERE id = ?';
  const queryProv = 'SELECT * FROM provinsi_tb';

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(queryKab, [id], (err, results) => {
      if (err) throw err;

      let date = results[0].diresmikan;
      let day = date.getDate().toString();
      let month = (date.getMonth() + 1).toString();
      let year = date.getFullYear().toString();

      if (day.length === 1) {
        day = '0' + day;
      }
      if (month.length === 1) {
        month = '0' + month;
      }
      let newDate = `${year}-${month}-${day}`;

      const dataKab = {
        ...results[0],
        diresmikan: newDate,

        photo: pathFile + results[0].photo,
      };

      conn.query(queryProv, (err, results) => {
        if (err) throw err;

        let dataProv = results.map((result) => {
          result.currentId = results[dataKab.provinsi_id - 1].id;
          result.currentProv = results[dataKab.provinsi_id - 1].nama;

          return result;
        });
        console.log(dataKab);
        console.log(dataProv);

        res.render('manageData/edit-kab', {
          title: 'Edit kabupaten',
          dataKab,
          dataProv,
        });
      });
    });
    conn.release();
  });
});
//handle update kabupaten
router.post('/kabupaten/edit/:id', uploadFile('photo'), function (req, res) {
  let { id, oldImage, kabName, date, provinsi_id } = req.body;

  let photo = oldImage.replace(pathFile, '');

  if (req.file) {
    photo = req.file.filename;
  }
  // nama, provinsi_id, diresmikan, photo
  const query = 'UPDATE kabupaten_tb SET nama = ?, provinsi_id = ?, diresmikan = ?, photo= ? WHERE id = ?';

  dbConnection.getConnection((err, conn) => {
    conn.query(query, [kabName, provinsi_id, date, photo, id], (err, results) => {
      if (err) throw err;

      res.redirect(`/detail/kabupaten/${id}`);
    });

    conn.release();
  });
});

module.exports = router;
