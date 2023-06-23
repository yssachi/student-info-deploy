//importing the model - to be able to create a data manipulation
const studentInfo = require('../models/student-schema')

const getAllStudentInfo = async(req, res) => {
    try {
        //add skip and limit
        // let result = studentInfo.findOne({}).sort('name')
      
        // const page = Number(req.query.page) || 1
        // const limit = Number(req.query.limit) || 10
        // const skip = (page - 1) * limit
        // results = result.skip(skip).limit(limit)
        // const allStudentInfo = await result;
        // res.status(200).json({allStudentInfo})

        const page = Number(req.query.page) || 0;
        const resultPerPage = 20;

        let result = studentInfo
          .find({})
          .sort('name')
          .skip(page * resultPerPage) //pagination
          .limit(resultPerPage)

        const allStudentInfo = await result;
        res.status(200).json({allStudentInfo})

    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}


const singleStudentInfo = async (req, res) => {
  try {
    const {id:dataId} = req.params;
    const singleStudent = await studentInfo.findOne({_id:dataId})
    res.status(200).json({singleStudent})
  } catch (error) {
    res.status(404).json({msg: error.message})
  }
}



const createStudentInfo = async(req, res) => {
    try {
        const createInfo = await studentInfo.create(req.body);
        res.status(201).json({createInfo})
    } catch (error) {
        console.log(error, 'failed to create student info');
    }
}


const searchStudentInfo = async (req, res) => {
    try {
      const { name, studentId } = req.query; //name and student extracted in the wuery parameter

      const nameParts = name ? name.split(' ') : [];
      //here is ternary operator
      // check if name exist
      // if name does exit then it will splits the 'name string into individual part using the .split(' ') e.g 'alyssa, 'joy, 'flores and then assign it to the nameParts array
      // otherwise it will assign an empty array '[]' to the name parts
      const nameRegexPatterns = nameParts.map(part => new RegExp(part, 'i'));
      const queryObject = {}; // an empty objet to store the search conditions
  
      if (name) {
        queryObject['name'] = {
          $elemMatch: {
            $or: [
              { 'firstName': { $in: nameRegexPatterns } },
              { 'middleName': { $in: nameRegexPatterns } },
              { 'lastName': { $in: nameRegexPatterns } }
            ]
          }
        }
      } else if (!name){
        return res.status(400).json({ error: 'Please provide a name' });
      }
  
      if (studentId) {
        queryObject['studentId'] = studentId;
      }

      
      const page = Number(req.query.page) || 0;
      const resultPerPage = 10;
  
      let resultSearch = await studentInfo
        .find(queryObject)
        .sort('name')
        .skip(page * resultPerPage) //pagination
        .limit(resultPerPage)

      res.status(200).json({ resultSearch });
    } catch (error) {
      console.log(error, 'failed to search student info');
    }
  };
  
  

const updateStudentInfo = async(req, res) => {
    try {
      const {id:studentID} = req.params;
      const student = await studentInfo.findOneAndUpdate({_id:studentID}, req.body.updateData, {
        new: true,
        runValidators: true
      })
      if (!student) {
        return res.status(404).send(`No student found with id ${studentID}`);
      }
      res.status(200).json({student});
    } catch (error) {
      res.status(500).send(error);
    }
}


const deleteStudentInfo = async(req, res) => {
    try {
      const {id:studentID} = req.params;
      const student = await studentInfo.findOneAndDelete({_id:studentID});
      if(!student) {
        res.status(404).send(`no student found with id ${studentID}`)
      } else {
        res.status(200).json({student})
      }
    } catch (error) {
      res.status(500).send(error);
    }
}


module.exports = {
    getAllStudentInfo,
    createStudentInfo,
    searchStudentInfo,
    updateStudentInfo,
    deleteStudentInfo,
    singleStudentInfo
}