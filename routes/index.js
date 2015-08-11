var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/ajaxTest', function(req, res) {
  // console.log("this is a get request");
   // console.log(req.body);
   // res.status(200).json({message:"get is working"})

});
router.get('/syncURL', function(req, res) {
    console.log("this is a get request");
    console.log(req.body);
    console.log("response",res.body);
    res.status(200).json("message test")

});

router.post('/getParse', function(req, res) {
    console.log("this is a post request");
    console.log(req.body);
    console.log(res.body);
    res.status(200).json({message:"IMPL_101 post"});

});

router.get('/getParseData', function(req, res) {
    console.log("this is a get request");

    res.status(200).json({message:"IMPL_101 get"});

});
router.post('/postJSON', function(req, res) {
    console.log("this is a get request");

    res.status(200).json({message:"IMPL_101 post"});

});

router.post('/postXML', function(req, res) {
    console.log("this is a post request");

    res.status(200).json({message:"IMPL_101 post"});

});
router.get('/upload', function(req, res){
    res.render('uploadfiles');
})

router.post('/files/upload', upload.array('info',10),function(req, res){
    console.log(req.body);
    console.log(req.files);
    res.status(200).json({ message: 'IMPL_101' });
});
router.get('/helloWorld', function(req, res){

    res.status(200).json({ message: 'helloWorld' });
    res.render('sayHello');
})


module.exports = router;
