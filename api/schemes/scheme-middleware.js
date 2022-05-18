const db = require('../../data/db-config');
const Model = require('./scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/

const checkSchemeId = async (req, res, next) => {
  const schemeIdCheck = await db('schemes').where('scheme_id', req.params.scheme_id).first();
  if (schemeIdCheck) {
    next();
  } else {
    next({ message: `scheme with scheme_id ${req.params.scheme_id} not found`, status: 404 });
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if (typeof req.body.scheme_name !== "string" || req.body.scheme_name === "") {
    next({ message: "invalid scheme_name", status: 400 });
    return;
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  if (typeof req.body.instructions !== "string" || req.body.instructions.trim() === "" ||
      typeof req.body.step_number !== "number" || req.body.step_number < 1
  ) {
    next({ message: "invalid step", status: 400 });
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
