const express = require('express');
const userRoute = require('./user.route');
const bankRoute = require('./bank.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/bank',
    route: bankRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
