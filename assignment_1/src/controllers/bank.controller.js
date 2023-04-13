const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bankService } = require('../services');

// loan model
const Loan = require('../models/loan.model');

// lend
const lend = catchAsync(async (req, res) => {
  const { user_id, loan_amount, interest_rate, loan_period } = req.body;
  const result = await bankService.lend(user_id, loan_amount, interest_rate, loan_period);

  if (result.status === 'rejected') {
    try {
      // delete the loan
      await Loan.findByIdAndDelete(result._id);
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Loan rejected and could not delete the loan');
    }
    throw new ApiError(httpStatus.BAD_REQUEST, 'Loan rejected');
  }

  res.status(httpStatus.CREATED).send(result);
});

// pay
const pay = catchAsync(async (req, res) => {
  const { user_id, loan_id, amount_paid } = req.body;
  const result = await bankService.pay(user_id, loan_id, amount_paid);

  res.status(httpStatus.CREATED).send(result);
});

// show_ledger
const show_ledger = catchAsync(async (req, res) => {
  const { user_id, loan_id } = req.body;
  const result = await bankService.show_ledger(user_id, loan_id);

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'No transactions found');

  res.status(httpStatus.CREATED).send(result);
});

// account_overview
const account_overview = catchAsync(async (req, res) => {
  const result = await bankService.account_overview(req.body.user_id);

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'No account found');

  res.status(httpStatus.CREATED).send(result);
});

module.exports = {
  lend,
  pay,
  show_ledger,
  account_overview,
};
