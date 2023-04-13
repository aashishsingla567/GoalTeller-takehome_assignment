const Joi = require('joi');
const { objectId } = require('./custom.validation');

// lend
const lend = {
  body: Joi.object().keys({
    user_id: Joi.string().required().custom(objectId),
    loan_amount: Joi.number().required(),
    interest_rate: Joi.number().required(),
    loan_period: Joi.number().required(),
  }),
};

// pay
const pay = {
  body: Joi.object().keys({
    user_id: Joi.string().required().custom(objectId),
    loan_id: Joi.string().required().custom(objectId),
    amount_paid: Joi.number().required(),
  }),
};

// show_ledger
const show_ledger = {
  body: Joi.object().keys({
    user_id: Joi.string().required().custom(objectId),
    loan_id: Joi.string().required().custom(objectId),
  }),
};

// account_overview
const account_overview = {
  body: Joi.object().keys({
    user_id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  lend,
  pay,
  show_ledger,
  account_overview,
};
