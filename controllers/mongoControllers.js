const model_user = require('../models/mongoUser')
const jwt = require('jsonwebtoken')

exports.AllUsers = async (req, res) => {
  try {
    const users = await model_user.find()
    res.status(200).send({
      status: 'success',
      result: users
    })  
  } catch (err) {
    console.log(err)
    res.status(500).send({
      status: 'failed'
    })
  }
}

exports.Login = async (req, res) => {
  try {
    const user = await model_user.findOne({ email: req.body.email })
    if(user.password == req.body.password) {
      const token = jwt.sign({
        id: user._id
      }, 'secret', { expiresIn: '1h' })

      await model_user.findByIdAndUpdate(user._id, { token: token})
      res.status(200).send({
        status: 'success',
        result: token
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({})
  }
}

exports.SearchUser = async (req, res) => {
  try {
    const user = await model_user.find({ email: req.params.email })
    res.status(200).send({
      status: 'success',
      result: user
    })
  } catch (err) {
    res.status(500).send({})
  }
}

exports.CreateUser = async (req, res) => {
  try {
    let data = {
      first_name: req.body.first,
      last_name: req.body.last,
      username: req.body.username,
      email: req.body.email,
      phone_number: req.body.phone,
      password: req.body.password,
      token: ''
    }
    const user = new model_user(data)
    await user.save()
    data.password = undefined
    res.status(201).send({
      status: 'success',
      result: data
    })
  } catch (err) {
    res.status(500).send({})
  }
}

exports.UpdateUser = async (req, res) => {
  try {
    const result = await model_user.findByIdAndUpdate(req.params.id, { 
      first_name: req.body.first,
      last_name: req.body.last 
    })

    res.status(203).send({
      status: 'success',
      result: result
    })
  } catch (err) {
    res.status(500).send({})
  }
}

exports.RemoveUser = async (req, res) => {
  try {
    await model_user.findByIdAndDelete({ _id: req.params.id })
    res.status(204).send({
      status: 'success',
      result: ''
    })
  } catch (err) {
    res.status(500).send({})
  }
}