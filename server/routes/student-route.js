const express = require('express');
const router = express.Router();

//importing student-function
const {
    getAllStudentInfo,
    createStudentInfo,
    searchStudentInfo,
    updateStudentInfo,
    deleteStudentInfo,
    singleStudentInfo
} = require('../controllers/student-function')

router.get('/search', searchStudentInfo);
router.get('/:id', singleStudentInfo);
router.get('/', getAllStudentInfo);
router.post('/enroll', createStudentInfo);
router.patch('/update/:id', updateStudentInfo);
router.delete('/delete/:id', deleteStudentInfo);



module.exports = router;