const db = require('../../data/db-config');

function find() { // EXERCISE A
  return db('schemes')
  .select('schemes.*')
  .leftJoin('steps', 'schemes.scheme_id', '=', 'steps.scheme_id')
  .groupBy('schemes.scheme_id')
  .orderBy('schemes.scheme_id')
  .count('steps.step_id as number_of_steps')
}

async function findById(scheme_id) { // EXERCISE B
  const results = await db('schemes')
    .select('schemes.*', 'step_id', 'step_number', 'instructions')
    .leftJoin('steps', 'schemes.scheme_id', 'steps.scheme_id')
    .where('schemes.scheme_id', scheme_id)
    .orderBy('steps.step_number')

  const result = {
    scheme_id: results[0].scheme_id,
    scheme_name: results[0].scheme_name,
    steps: results.map(item => ({
      step_id: item.step_id, 
      step_number: item.step_number, 
      instructions: item.instructions
    })).filter(item => item.step_id != null)
  }
    return result
  }
  

async function findSteps(scheme_id) { // EXERCISE C
  const results = await db('schemes')
  .select('steps.step_id', 'steps.step_number', 'steps.instructions', 'scheme_name')
  .leftJoin('steps', 'schemes.scheme_id', 'steps.scheme_id')
  .where('schemes.scheme_id', scheme_id)
  .orderBy('steps.step_number')

  if (results.length === 0) {
    return null
  } else {
    return results.filter(item => item.step_id !== null)
  }
}

function add(scheme) { // EXERCISE D
  return db('schemes').insert(scheme)
  .then(result => {
    return findById(result[0])
  })
}

function addStep(scheme_id, step) { // EXERCISE E
  return db('steps').insert({...step, scheme_id})
  .then(result => {
    return findSteps(scheme_id)
  })
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}