const router = require('express').Router();
const dbConnection = require('../connection/db');
const pathFile = 'http://localhost:7000/uploads/';

// render detail provinsi
router.get('/detail/provinsi/:id', function (req, res) {
  const { id } = req.params;

  const query = 'SELECT * FROM provinsi_tb WHERE id = ?';

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(query, [id], (err, results) => {
      if (err) throw err;

      const details = {
        ...results[0],

        diresmikan: results[0].diresmikan.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),

        photo: pathFile + results[0].photo,
      };

      res.render('details/detailProv', {
        title: 'Detail',
        details,
      });
    });
    conn.release();
  });
});

// render detail Kabupaten
router.get('/detail/kabupaten/:id', function (req, res) {
  const { id } = req.params;

  const queryKab = 'SELECT * FROM kabupaten_tb WHERE id = ?';
  const queryProv = 'SELECT * FROM provinsi_tb';

  dbConnection.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(queryKab, [id], (err, results) => {
      if (err) throw err;

      const detailKab = {
        ...results[0],

        diresmikan: results[0].diresmikan.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),

        photo: pathFile + results[0].photo,
      };

      conn.query(queryProv, (err, results) => {
        if (err) throw err;

        const detailProv = {
          ...results[detailKab.provinsi_id - 1],
        };

        res.render('details/detailKab', {
          title: 'Detail',
          detailKab,
          detailProv,
        });
      });
    });
    conn.release();
  });
});

module.exports = router;
