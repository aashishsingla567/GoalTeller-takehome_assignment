const httpStatus = require('http-status');
const { Mongoose } = require('mongoose');
const { User, Transaction, Loan } = require('../models');
const ApiError = require('../utils/ApiError');

// lend
const lend = async (user_id, loan_amount, interest_rate, loan_period) => {
  const user = await User.findById(user_id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  // intrest= simple interest= (P x T x R)/100
  // P = principal amount
  // T = time
  // R = rate

  const period_in_years = loan_period / 12;
  const interest_amount = (loan_amount * interest_rate * period_in_years) / 100;
  const total_amount = loan_amount + interest_amount;

  const calculatedEMIs = total_amount / loan_period;

  // create loan
  const loan = await Loan.create({
    user: user_id,
    loan_amount,
    total_amount,
    interest_rate,
    loan_period,
    emis: calculatedEMIs,
    date_issued: Date.now(),
    date_due: Date.now() + loan_period * 30 * 24 * 60 * 60 * 1000,
    status: 'pending',
    loan_balance: total_amount,
  });

  // create transaction
  const transaction = await Transaction.create({
    user: user_id,
    loan: loan._id,
    amount: loan_amount,
    date: Date.now(),
    type: 'out',
  });

  user.balance = total_amount;

  user.loans.push(loan._id);
  user.transactions.push(transaction._id);

  // save
  await user.save();

  return {
    loan,
    total_amount,
    monthly_emi: calculatedEMIs,
  };
};

// pay
const pay = async (user_id, loan_id, amount_paid) => {
  const user = await User.findById(user_id);

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const loan = await Loan.findById(loan_id);

  if (!loan) throw new ApiError(httpStatus.NOT_FOUND, 'Loan not found');

  if (user.loans.indexOf(loan_id) === -1)
    throw new ApiError(httpStatus.BAD_REQUEST, 'TRANSACTION_FAILED::This loan does not belong to this user');

  if (loan.status !== 'pending')
    throw new ApiError(httpStatus.BAD_REQUEST, `TRANSACTION_FAILED::Loan is in ${loan.status} state`);

  if (amount_paid > loan.total_amount)
    throw new ApiError(httpStatus.BAD_REQUEST, 'TRANSACTION_FAILED::Amount paid is greater than the amount to be paid');

  const emisRemaing = Math.ceil((loan.loan_balance - amount_paid) / loan.emis);

  loan.loan_balance -= amount_paid;
  user.balance -= amount_paid;

  // after transaction
  if (loan.loan_balance === 0) {
    // update loan
    loan.status = 'paid';
    loan.date_paid = Date.now();
  }

  // create transaction
  const transaction = await Transaction.create({
    user: user_id,
    loan: loan._id,
    amount: amount_paid,
    date: Date.now(),
    type: 'in',
  });

  user.transactions.push(transaction._id);

  // save
  await user.save();
  await loan.save();

  return {
    balance: user.balance,
    emis_remaining: emisRemaing,
    status: loan.status,
  };
};

/**
 * LEDGER: Customers can check all the transactions for a loan id. Along with all the transactions,
 * It should also return the balance amount, monthly EMI and number of EMI left
 * @param {Mongoose.ObjectId} user_id
 * @param {Mongoose.ObjectId} loan_id
 * @returns {Promise<{
 *  transactions: Array,
 *  balance_amount: Number,
 *  monthly_emi: Number,
 *  emis_remaining: Number
 * }>}
 * @throws {ApiError}
 */
const show_ledger = async (user_id, loan_id) => {
  const user = await User.findById(user_id).populate('transactions');

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  if (user.loans.indexOf(loan_id) === -1)
    throw new ApiError(httpStatus.BAD_REQUEST, 'This loan does not belong to this user');

  const loan = await Loan.findById(loan_id);

  const transactions = user.transactions.filter((transaction) => transaction.loan.toString() === loan_id.toString());

  return {
    transactions,
    balance_amount: user.balance,
    monthly_emi: loan.emis,
    emis_remaining: Math.ceil(loan.loan_balance / loan.emis),
  };
};

/**
 * ACCOUNT OVERVIEW: This should list all the loans customers have taken. For each loan, it
 * should tell the loan amount(P), Total amount(A), EMI amount, Total Interest(I), the amount paid
 * till date, number of EMI left.
 * @param {Mongoose.ObjectId} user_id
 * @returns {Promise<Array<{
 *  loan_amount: Number,
 *  total_amount: Number,
 *  emi_amount: Number,
 *  total_interest: Number,
 *  amount_paid: Number,
 *  emis_remaining: Number
 * }>>}
 * @throws {ApiError}
 */
const account_overview = async (user_id) => {
  const user = await User.findById(user_id).populate('loans');
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  return user.loans;
};

module.exports = {
  lend,
  pay,
  show_ledger,
  account_overview,
};
