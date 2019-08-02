const express = require('express')
const router = express.Router();
const passport = require('passport')

const users = require('../models/Profile');

// router.get('/test', (req, res) => {
//   res.json({msg: 'success'})
// })

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const body = req.body
  console.log(body)
  users.create(body).then((data) => {
    res.json(data)
  }).catch((err) => {
    console.log(err)
  })
})

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  users.find().then((data) => {
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json('没有任何内容')
    }
  }).catch((err) => {
    console.log(err)
  })
})

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  users.findById(req.params.id).then((data) => {
    if (data) {
      res.status(200).json(data)
    } else {
      res.json('没有任何内容')
    }
  }).catch((err) => {
    console.log(err)
  })
})

router.post('/edit/:id', passport.authenticate('jwt', {session: false}),(req, res) => {
  users.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false}, (err, data) => {
    if (err) throw err;
    res.json(data)
  })
})

router.post('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  users.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err, data) => {
    if (err) throw err;
  })
})
module.exports = router