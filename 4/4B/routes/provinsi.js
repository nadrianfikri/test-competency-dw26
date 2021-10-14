const router = require('express').Router();
const dbConnection = require('../connection/db');
const pathFile = 'http://localhost:7000/uploads/';
const uploadFile = require('../middlewares/uploadFile');

// render add-prov
router.get('/provinsi/add', function (req, res) {
  res.render('manageData/add-prov', {
    title: 'Add Provinsi',
  });
});

//handle post provinsi
router.post('/provinsi/add', uploadFile('photo'), function (req, res) {
  let { provName, date, pulau } = req.body;
  let photo = req.file.filename;

  const query = 'INSERT INTO provinsi_tb(nama, diresmikan, photo, pulau) VALUES (?,?,?,?)';

  dbConnection.getConnection((err, conn) => {
    conn.query(query, [provName, date, photo, pulau], (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });

    conn.release();
  });
});

// handle delete provinsi
router.get('/provinsi/delete/:id', function (req, res) {
  const { id } = req.params;

  const query = 'DELETE FROM provinsi_tb WHERE id = ?';

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [id], (err, results) => {
      if (err) throw err;

      res.redirect('/');
    });

    conn.release();
  });
});

// render edit-prov
router.get('/provinsi/edit/:id', function (req, res) {
  const { id } = req.params;

  const query = 'SELECT * FROM provinsi_tb WHERE id = ?';

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [id], (err, results) => {
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

      const prov = {
        ...results[0],
        diresmikan: newDate,

        photo: pathFile + results[0].photo,
      };

      res.render('manageData/edit-prov', {
        title: 'Edit Provinsi',
        prov,
      });
    });
    conn.release();
  });
});
//handle update provinsi
router.post('/provinsi/edit/:id', uploadFile('photo'), function (req, res) {
  let { id, oldImage, provName, date, pulau } = req.body;

  let photo = oldImage.replace(pathFile, '');

  if (req.file) {
    photo = req.file.filename;
  }

  const query = 'UPDATE provinsi_tb SET nama = ?, diresmikan = ?, photo= ?, pulau = ? WHERE id = ?';

  dbConnection.getConnection((err, conn) => {
    conn.query(query, [provName, date, photo, pulau, id], (err, results) => {
      if (err) throw err;

      res.redirect(`/detail/provinsi/${id}`);
    });

    conn.release();
  });
});

module.exports = router;
