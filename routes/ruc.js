const { Router } = require('express');
const { obtenerSunat } = require('../controllers/sunat');

const router = Router();

router.post("/", (req, res) => {
    res.send("tu documento ess : "+req.body.documento);
});

router.post('/sunat',obtenerSunat);

module.exports = router;