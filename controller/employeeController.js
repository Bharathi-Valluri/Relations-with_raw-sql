const format = require('pg-format')
const { client } = require('../db')

const dataInsertion = async (req, res) => {
  try {
    const resp = await client.query(
      `INSERT INTO employees (employee_id,name,email) VALUES (${req.body.employee_id},'${req.body.name}', '${req.body.email}');
      
      INSERT INTO contacts (contact_id,Street,City,employee_id) VALUES (${req.body.contact_id},'${req.body.Street}','${req.body.City}',${req.body.employee_id});
      `
    )
    console.log(`Added an employee details with the name ${req.body.name}`)
    res.status(200).json({
      response: resp,
      message: 'Data inserted into db successfully!....'
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      response: null,
      message: 'Failed!.....'
    })
  }
}
const getOneRecord = async (req, res) => {
  try {
    const resp = await client.query(
      `SELECT * FROM employees NATURAL JOIN contacts
      WHERE employee_id =${req.body.employee_id}`
    )
    res.status(200).json({
      response: resp,
      message: 'Data inserted into db successfully!....'
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      response: null,
      message: 'Failed to fetch the records!...'
    })
  }
}
const getAllRecords = async (req, res) => {
  try {
    const resp = await client.query(
      `SELECT * FROM employees INNER JOIN contacts
      ON employees.employee_id = contacts.contact_id`
    )
    res.status(200).json({
      response: resp,
      message: 'Data inserted into db successfully!....'
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      response: null,
      message: 'Failed to fetch the records!...'
    })
  }
}

const dataUpdation = async (req, res) => {
  try {
    const resp =
      await client.query(`UPDATE employees SET employee_id=${req.body.employee_id}, email='${req.body.email}' WHERE employee_id=${req.body.employee_id};
   UPDATE contacts SET contact_id=${req.body.contact_id}, Street='${req.body.Street}', City='${req.body.City}' WHERE contact_id=${req.body.contact_id}`)
    console.log(resp)
    res.status(200).json({
      response: resp,
      message: 'Data Updated successfully!....'
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      response: null,
      message: 'Failed to update'
    })
  }
}
const dataDeletion = async (req, res) => {
  try {
    const resp = await client.query(
      `DELETE  FROM contacts  WHERE employee_id = ${req.body.employee_id};DELETE  FROM employees  WHERE employee_id = ${req.body.employee_id};`
    )
    console.log(resp)
    res.status(200).json({
      response: resp,
      message: 'Records deleted successfully!...'
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      response: null,
      message: 'Failed!...'
    })
  }
}

module.exports = {
  dataInsertion,
  getOneRecord,
  getAllRecords,
  dataUpdation,
  dataDeletion
}
