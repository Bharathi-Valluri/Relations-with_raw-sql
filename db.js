const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432
})
client.connect(function (err) {
  if (err) throw err
  console.log('Connected!')

  var sqlQuery = `CREATE TABLE if not exists employees(employee_id INT , name VARCHAR(255),email VARCHAR(255), PRIMARY KEY(employee_id));
    CREATE TABLE if not exists  contacts(contact_id INT, Street VARCHAR(255), City VARCHAR(255), Primary key(contact_id), employee_id INT unique ,CONSTRAINT FK_employees_contacts  FOREIGN KEY(employee_id) REFERENCES employees(employee_id));`

  client.query(sqlQuery, function (err, result) {
    if (err) throw err
    console.log('Table created')
  })
})

module.exports = { client }
