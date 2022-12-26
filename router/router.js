const employee_controller = require('../controller/employeeController')
const router = require('express').Router()
router.post('/insertTableData', employee_controller.dataInsertion)
router.get('/getAllRecords', employee_controller.getAllRecords)
router.put('/updateRecords', employee_controller.dataUpdation)
router.delete('/deleteRecords', employee_controller.dataDeletion)

module.exports = router
