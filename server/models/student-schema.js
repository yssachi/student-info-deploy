const mongoose = require('mongoose');



const personalDataSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Must input first name']
    },
    middleName: {
        type: String,
        required: [true, 'Must input middle name']
    },
    lastName: {
        type: String,
        required: [true, 'Must input last name']
    }
}, {_id: false})

// const studentAddress = new mongoose.Schema({
//     country: {
//         type: String,
//         required: [true, 'Must input a country']
//     },
//     province: {
//         type: String,
//         required: [true, 'Must input a province']
//     },
//     municipality: {
//         type: String,
//         required: [true, 'Must input a municipality']
//     },
//     completeAddress: {
//         type: String,
//         require: [true, 'Must input a complete address']
//     }
// })




const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        unique: true,
    },
    name: [personalDataSchema],
    course: {
        type: String,
        required: [true, 'Must input course']
    },
    yearLevel: {
        type: String,
        required: [true, 'Must input year level']
    },
    classification:{
        type: String,
        enum: ['freshman', 'transferee', 'returnee', 'shiftee', 'continuing', 'cross-enrolee'],
        required: [true, 'Must input classification']
    },
    dateEnrolled: {
        type: Date,
        default: Date.now(),
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Must input date of birth']
    },
    placeOfBirth: {
        type: String,
        required: [true, 'Must input a place of birth']
    },
    age: {
        type: Number,
        required: [true, 'Must input an age']
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Must input gender']
    },
    //address: [studentAddress]


});



// Pre-save middleware to generate the studentID
// studentSchema.pre('save', function (next) {
//     const currentDate = new Date().getFullYear().toString();
//     const idPrefix = '01-2122-';
//     const paddingLength = 6;
//     const studentCount = this.constructor.countDocuments();
  
//     studentCount.then((count) => {
//       const incrementedCount = count + 1;
//       const paddedCount = incrementedCount.toString().padStart(paddingLength, '0');
//       this.studentId = idPrefix + paddedCount;
//       next();
//     }).catch((err) => {
//       next(err);
//     });
//   });


//   studentSchema.pre('save', async function (next) {
//     if (!this.isNew) {
//         return next();
//     }

//     try {
//         const currentDate = new Date().getFullYear().toString();
//         const idPrefix = '01-2122-';
//         const paddingLength = 6;
//         const count = await this.model('studentInfo').countDocuments().exec();
//         const incrementedCount = count + 1;
//         const paddedCount = incrementedCount.toString().padStart(paddingLength, '0');
//         this.studentId = idPrefix + paddedCount;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });


studentSchema.pre('save', async function (next) {
    if (!this.isNew || this.studentId) {
        return next();
    }

    try {
        const idPrefix = '01-2122-';
        const paddingLength = 6;
        const lastStudent = await this.model('studentInfo')
            .findOne({}, {}, { sort: { studentId: -1 } })
            .exec();

        if (lastStudent) {
            const lastStudentId = lastStudent.studentId;
            const lastSequenceNumber = parseInt(lastStudentId.substr(-paddingLength));
            const newSequenceNumber = lastSequenceNumber + 1;
            const paddedCount = newSequenceNumber.toString().padStart(paddingLength, '0');
            this.studentId = idPrefix + paddedCount;
        } else {
            this.studentId = idPrefix + '000001';
        }

        next();
    } catch (error) {
        next(error);
    }
});





module.exports = mongoose.model('studentInfo', studentSchema);