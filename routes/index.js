'use strict';

const { Router } = require('express');
const indexRouter = Router();

const passport = require('passport');

const routeGuard = require('./../middleware/route-guard');
const routeRoleGuard = require('./../middleware/routeRoleGuard');

indexRouter.get(
  '/student-dashboard',
  routeGuard,
  routeRoleGuard(['student', 'assistant', 'teacher']),
  (req, res, next) => {
    res.render('student', { title: 'Hello Student!' });
  }
);

indexRouter.get(
  '/assistant-dashboard',
  routeGuard,
  routeRoleGuard(['assistant', 'teacher']),
  (req, res, next) => {
    res.render('assistant', { title: 'Hello Assistant!' });
  }
);

indexRouter.get(
  '/teacher-dashboard',
  routeGuard,
  routeRoleGuard(['teacher']),
  (req, res, next) => {
    res.render('teacher', { title: 'Hello Teacher!' });
  }
);

indexRouter.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

module.exports = indexRouter;
