const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect('mongodb://localhost:27017/fullstack', {useNewUrlParser:true, keepAlive: 120})
  .then(() => {
    console.log('connect success')
  })

const StudentSchema = new Schema({
  num: {
    type: String,
    required: true
  },
  member: ObjectId,
  speciality: {
    type: String,
    default: '无'
  },
  job: {
    type: String,
    default: '无'
  },
  ability: {
    type: String,
    default: '无'
  },
  award: {
    type: String,
    default: '无'
  }
})

// module.exports = User = mongoose.model('User', UserName)
module.exports = User = mongoose.model('Student', StudentSchema)