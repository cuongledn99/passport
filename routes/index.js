var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todoItem = require('../model/schema').todoItem;
const authRouter = require('./auth');
const { isLoggedIn } = require('../services/checkPermisstion');

// Include authentication routes.
authRouter(router);


/* GET home page. */
router.get('/', async (req, res, next) => {

  try {
    let todoItems = await mongoose.model('todoItem').find();

    if (req.isAuthenticated()) {
      return res.render('index', { todoItems });
    }
    var messages = req.flash("error");
    res.render("login", { messages });
  } catch (error) {
    console.log(error);
    throw error;
  }

});

//insert data
router.post('/insert', (req, res) => {
  try {
    let item = new todoItem();
    item.name = req.body.name;
    item.status = req.body.status;
    item.save((err, item) => {
      if (err) {
        console.log("TCL: err", err)
        throw err;
      }
      res.redirect('/');
    });

  } catch (err) {
    return errorProcess(res, err)
  }
})

//xoa
router.delete('/delete/:item_id', async (req, res) => {
  console.log('delete server side');
  try {
    await mongoose.model('todoItem').findByIdAndDelete(req.params.item_id);
    res.send('asdf');
  } catch (err) {
    console.log(err);
  }
})

router.get('/getById/:item_id', async (req, res) => {
  try {
    let data = await mongoose.model('todoItem').findById(req.params.item_id);
    res.json(data);
  } catch (error) {

  }
})

router.put('/update/:item_id', async (req, res) => {
  try {
    await mongoose.model('todoItem').findByIdAndUpdate(req.params.item_id, { ...req.body })
    res.json({
      message: 'cap nhat thanh cong'
    })
  } catch (err) {

  }
})
router.get('/test', function (req, res) {
  res.send('hello');
})
module.exports = router;
