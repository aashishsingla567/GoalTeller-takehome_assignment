const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const bankController = require('../../controllers/bank.controller');
const bankValidation = require('../../validations/bank.validation');

const router = express.Router();

router.post('/lend', validate(bankValidation.lend), bankController.lend);
router.post('/pay', validate(bankValidation.pay), bankController.pay);
router.post('/show_ledger', validate(bankValidation.show_ledger), bankController.show_ledger);
router.post('/account_overview', validate(bankValidation.account_overview), bankController.account_overview);

module.exports = router;
