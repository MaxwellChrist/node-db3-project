const db = require('../../data/db-config');

const checkSchemeId = async (req, res, next) => {
  const schemeIdCheck = await db('schemes').where('scheme_id', req.params.scheme_id).first();
  if (schemeIdCheck) {
    next();
  } else {
    next({ message: `scheme with scheme_id ${req.params.scheme_id} not found`, status: 404 });
  }
}

const validateScheme = (req, res, next) => {
  if (typeof req.body.scheme_name !== "string" || req.body.scheme_name === "") {
    next({ message: "invalid scheme_name", status: 400 });
    return;
  } else {
    next()
  }
}

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