const mongoose = require('mongoose');

const loanSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    loan_amount: {
      type: Number,
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    loan_balance: {
      type: Number,
      required: true,
    },
    interest_rate: {
      type: Number,
      // in percentage
      validate(value) {
        if (value < 0) {
          throw new Error('Interest must be a positive number');
        }
      },

      required: true,
    },
    loan_period: {
      // in months
      type: Number,
      required: true,
    },
    emis: {
      type: Number,
      required: true,
    },
    date_issued: {
      type: Date,
      required: true,
    },
    date_due: {
      type: Date,
      required: true,
    },
    date_paid: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'unpaid', 'paid'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
