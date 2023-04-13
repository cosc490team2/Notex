const express = require("express")
const app = express()
const fs = require("fs");
const Moralis = require("moralis").default;
var formidable = require('formidable');
var multer  =   require('multer');
const { EvmChain } = require('@moralisweb3/common-evm-utils');
var fileTOIPFS = null;
let alert = require('alert'); 
var bodyParser = require('body-parser');
var startedMoralis = false;
var storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './uploads');  
  },  
  filename: function (req, file, callback) {  
    fileTOIPFS = file.originalname
    console.log(fileTOIPFS)
    callback(null, file.originalname);  
  }  
});  
var upload = multer({ storage : storage}).single('myfile'); 
var coin_balance=0.0;

async function startMoralis()
{
  await Moralis.start({
    apiKey: "8eORD5qJgGXoxwFGWjHVI7SualZIcBu174kozRijTRU8PvszGdN3txAKHMes4kGW",
});
}
async function getWalletBalance()
{
  const address = '0x5591DbD938DC9e81cDA5a92807D2d268743dC16b';
  const chain = EvmChain.SEPOLIA;
  const response = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain,
  });
  const jsonstr = JSON.stringify(response.toJSON());
  console.log(jsonstr);
  const indBalance = jsonstr.lastIndexOf("balance");
  const indNum = indBalance+10;
  const balanceStr = jsonstr.substring(indNum,indNum+20);
  coin_balance =parseFloat(balanceStr);
  coin_balance = coin_balance/Math.pow(10,18);

  const content = " "+coin_balance.toString();

  fs.writeFile('uploads/current.txt', content, err => {
    if (err) {
      console.error(err);
    }});

  console.log(balanceStr);
  console.log(coin_balance);
}

async function uploadToIpfs(filename) {

  

  const uploadArray = [
      {
          path: filename,
          content: fs.readFileSync('./uploads/'+filename, {encoding: 'base64'})
      },
      
  ];

  const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
  });

  console.log(response.result)
  console.log(typeof response.result)
  var s = JSON.stringify(response.result).trim()
  s= s.substring(1,s.length-1)
  console.log(s)

  fs.appendFile('pics/message.txt',','+ s, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}
  



app.use(express.static(__dirname, { // host the whole directory
    extensions: ["html", "htm", "gif", "png", "txt"],
}))

app.get("/", (req, res) => {
  if(!startedMoralis) 
  {startMoralis();
    startedMoralis = true;
    getWalletBalance();
  }

fs.readFile('upload.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  data = '<!DOCTYPE html>'+
  '<html lang="en">'+
  '<head>'+
     ' <meta charset="UTF-8">'+
     ' <meta http-equiv="X-UA-Compatible" content="IE=edge">'+
     ' <meta name="viewport" content="width=device-width, initial-scale=1.0">'+
     ' <link rel="stylesheet" type="text/css"   href="/style.css">'+
     ' <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">'+
     ' <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>'+
     '<link'+
     'rel="stylesheet"'+
     'href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"'+
   '/>'+
     '<title>Boot example</title>'+
     '<style>'+
         '@media(min-width:768px){'+
     '.news-input{'+
        ' width: 50%;'+
     '}'+
     '}'+
     'body::before{'+
      'display: block;'+
      'content: \'\';'+
      'height: 60px;'+
  '}'+
      '</style>'+
  '</head>'+
  
  '<body>'+
      
 
      '<nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">'+
         ' <div class="container">'+
           '<a href="/landin2" class="navbar-brand">Notex</a>'+
          
          ' <button class="navbar-toggler" type="button" data-bs-toggle'+
           '="collapse" data-bs-target="#navmenu">'+
           '<span class="navbar-toggler-icon"></span>'+
           '</button>'+
           '<div class="collapse navbar-collapse" id = "navmenu">'+
              '<ul class="navbar-nav mr-auto">'+
          '<li class="nav-item">'+
            '<a class="nav-link" href="/">Upload</a>'+
          '</li>'+
          '<li class="nav-item">'+
            '<a class="nav-link" href="/howto">About</a>'+
            '</li>'+

            '<li class="nav-item">'+
'            <a class="nav-link" href="/review2">Review</a>'+
'            </li>'+
        '</ul>'+
               '<ul class="navbar-nav ms-auto"> '+
                   
                   '<li class="nav-item" href="/pics/current.txt">'+
                      '<a href="#" class="nav-link lead">  '+coin_balance+
     data;
  res.send(data)

});
/*
  if(!startedMoralis) 
  {startMoralis();
    startedMoralis = true;
    getWalletBalance();
  }
  if(coin_balance!=0)
  res.sendFile(__dirname + "/upload.html",{"coin_balance":coin_balance});
  else
  res.sendFile(__dirname + "/upload.html");*/

})

app.get("/landin2", (req, res) => {


  if(!startedMoralis) 
  {startMoralis();
    startedMoralis = true;
    getWalletBalance();
  }

fs.readFile('mike.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  data = '<!DOCTYPE html>'+
  '<html lang="en">'+
  '<head>'+
  '<meta charset="UTF-8">'+
  '<title>Names</title>'+
  '<!-- ADDING BOOTSTRAP CSS -->'+
  ''+
  '<meta charset="UTF-8">'+
  '    <meta http-equiv="X-UA-Compatible" content="IE=edge">'+
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0">'+
  '    <link rel="stylesheet" type="text/css"   href="/style.css">'+
  '    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">'+
  '    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>'+
  '    '+
  '    <!--bootstrap icons-->'+
  '    <link'+
  '    rel="stylesheet"'+
  '    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"'+
  '  />'+
  ''+
  '<script src= "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js">'+
  '</script>'+
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js">'+
  '</script>'+
  '</head>'+
  ''+
  '<script>'+
  ''+
  'function search_animal() { '+
  '	let input = document.getElementById(\'searchbar\').value; '+
  '	input=input.toLowerCase(); '+
  '	let x = document.getElementsByClassName(\'animals\'); 	  '+
  '	for (i = 0; i < x.length; i++) {  '+
  '		if (!x[i].innerHTML.toLowerCase().includes(input)) { '+
  '		x[i].style.display="none"; '+
  '		} '+
  '		else { '+
  '		x[i].style.display="list-item";                  '+
  '		} '+
  '		} '+
  '}   '+
  '	  '+
  '</script>'+
  ''+
  '<style>'+
  ''+
  ''+
  '@media(min-width:768px){'+
  '    .news-input{'+
  '        width: 50%;'+
  '    }'+
  '}'+
  '/*ghost element to push down main content*/'+
  'body::before{'+
  '    display: block;'+
  '    content: \'\';'+
  '    height: 60px;'+
  '}'+
  ''+
  '	.main {'+
  '	text-align: center;'+
  '	margin: 2rem;'+
  '}'+
  '  '+
  '  /* what you need */'+
  '  '+
  '  #searchbar{ '+
  ''+
  '	   margin-left: 2%; '+
  '	   padding:8px; '+
  '	   border-radius: 10px; '+
  '	   '+
  '} '+
  '   '+
  '  '+
  '	 input[type=text] { '+
  '		width: 30%; '+
  '		-webkit-transition: width 0.15s ease-in-out; '+
  '		transition: width 0.15s ease-in-out; '+
  '} '+
  '   '+
  '	 /* When the input field gets focus, '+
  '		  change its width to 100% */'+
  '	 input[type=text]:focus { '+
  '	   width: 70%; '+
  '} '+
  '   '+
  '	#list{ '+
  '	  list-style-type: none;'+
  '} '+
  '   '+
  '  .animals{ '+
  '	 display: list-item;     '+
  '	}  '+
  '</style>  '+
  ''+
  '<body style="background-color: #0275d8;">'+
  ''+
  '<nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">'+
  '	<div class="container">'+
  '		<a href="/landin2" class="navbar-brand">Notex</a>'+
  '		<button class="navbar-toggler" type="button" data-bs-toggle'+
  '		="collapse" data-bs-target="#navmenu">'+
  '		<span class="navbar-toggler-icon"></span>'+
  '		</button>'+
  '	'+
  '		<div class="collapse navbar-collapse" id = "navmenu">'+
  ''+
  '			<ul class="navbar-nav mr-auto">'+
  '				<li class="nav-item">'+
  '				  <a class="nav-link" href="/">Upload</a>'+
  '				</li>'+
  '				<li class="nav-item">'+
  '					<a class="nav-link" href="/howto">About</a>'+
  '				  </li>'+
  '<li class="nav-item">'+
'            <a class="nav-link" href="/review2">Review</a>'+
'            </li>'+
  '			</ul>'+
  '		  <ul class="navbar-nav ms-auto">'+
  '			'+
  '			<li class="nav-item" href="/landin2">'+
  '				<a href="#" class="nav-link lead" id="balanceToCheck"> '+
  +coin_balance+
     data;
  res.send(data)

});


  
 // res.sendFile(__dirname + "/mike.html");

})

app.get("/howto", (req, res) => {
  
  res.sendFile(__dirname + "/howto.html");

})

app.get("/review2", (req, res) => {
  if(!startedMoralis) 
  {startMoralis();
    startedMoralis = true;
    getWalletBalance();
  }

fs.readFile('rate.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  data = '<!DOCTYPE html>'+
  '<html lang="en">'+
  '<head>'+
  '<meta charset="UTF-8">'+
  '<title>Names</title>'+
  ''+
  ''+
  '<meta charset="UTF-8">'+
  '    <meta http-equiv="X-UA-Compatible" content="IE=edge">'+
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0">'+
  '    <link rel="stylesheet" type="text/css"   href="/style.css">'+
  '    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">'+
  '    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>'+
  '    '+
  ''+
  '    <link'+
  '    rel="stylesheet"'+
  '    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"'+
  '  />'+
  ''+
  '<script src= "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js">'+
  '</script>'+
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js">'+
  '</script>'+
  '</head>'+
  ''+
  ''+
  ''+
  '<style>'+
  ''+
  ''+
  '@media(min-width:768px){'+
  '    .news-input{'+
  '        width: 50%;'+
  '    }'+
  '}'+
  'body::before{'+
  '    display: block;'+
  '    content: \'\';'+
  '    height: 60px;'+
  '}'+
  ''+
  '	.main {'+
  '	text-align: center;'+
  '	margin: 2rem;'+
  '}'+
  '  '+
  '  '+
  ' '+
  '   '+
  '  '+
  '	 input[type=text] { '+
  '		width: 30%; '+
  '		-webkit-transition: width 0.15s ease-in-out; '+
  '		transition: width 0.15s ease-in-out; '+
  '} '+
  '   '+
  '	'+
  '	 input[type=text]:focus { '+
  '	   width: 70%; '+
  '} '+
  '   '+
  '	#list{ '+
  '	  list-style-type: none;'+
  '} '+
  '   '+
  '  .animals{ '+
  '	 display: list-item;     '+
  '	}  '+
  '</style>  '+
  ''+
  '<body onload="setTimeout(loadingFunc,60000);" style="background-color: #0275d8;">'+
  ''+
  '<nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">'+
  '	<div class="container">'+
  '		<a href="/landin2" class="navbar-brand">Notex</a>'+
  '		<button class="navbar-toggler" type="button" data-bs-toggle'+
  '		="collapse" data-bs-target="#navmenu">'+
  '		<span class="navbar-toggler-icon"></span>'+
  '		</button>'+
  '	'+
  '		<div class="collapse navbar-collapse" id = "navmenu">'+
  ''+
  '			<ul class="navbar-nav mr-auto">'+
  '				<li class="nav-item">'+
  '				  <a class="nav-link" href="/">Upload</a>'+
  '				</li>'+
  '				<li class="nav-item">'+
  '					<a class="nav-link" href="/howto">About</a>'+
  '				  </li>'+
  ''+
  '          <li class="nav-item">'+
  '            <a class="nav-link" href="/review2">Review</a>'+
  '            </li>'+
  '			</ul>'+
  '		  <ul class="navbar-nav ms-auto">'+
  '			'+
  '			<li class="nav-item" href="/landin2">'+
  '				<a href="#" class="nav-link lead" id="balanceToCheck">0.5 '
  +
     data;
  res.send(data)

});
  
  //res.sendFile(__dirname + "/rate.html");

})
app.post('/uploadjavatpoint',function(req,res){ 
  
  coin_balance++;
  console.log(coin_balance)

  fs.readFile('upload_success.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = '<!DOCTYPE html>'+
    '<html lang="en">'+
    '<head>'+
       ' <meta charset="UTF-8">'+
       ' <meta http-equiv="X-UA-Compatible" content="IE=edge">'+
       ' <meta name="viewport" content="width=device-width, initial-scale=1.0">'+
       ' <link rel="stylesheet" type="text/css"   href="/style.css">'+
       ' <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">'+
       ' <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>'+
       '<link'+
       'rel="stylesheet"'+
       'href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"'+
     '/>'+
       '<title>Boot example</title>'+
       '<style>'+
           '@media(min-width:768px){'+
       '.news-input{'+
          ' width: 50%;'+
       '}'+
       '}'+
       'body::before{'+
        'display: block;'+
        'content: \'\';'+
        'height: 60px;'+
    '}'+
        '</style>'+
    '</head>'+
    
    '<body>'+
        
   
        '<nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">'+
           ' <div class="container">'+
             '<a href="/landin2" class="navbar-brand">Notex</a>'+
            
            ' <button class="navbar-toggler" type="button" data-bs-toggle'+
             '="collapse" data-bs-target="#navmenu">'+
             '<span class="navbar-toggler-icon"></span>'+
             '</button>'+
             '<div class="collapse navbar-collapse" id = "navmenu">'+
                '<ul class="navbar-nav mr-auto">'+
            '<li class="nav-item">'+
              '<a class="nav-link" href="/">Upload</a>'+
            '</li>'+
            '<li class="nav-item">'+
              '<a class="nav-link" href="/howto">About</a>'+
              '</li>'+
              '<li class="nav-item">'+
'            <a class="nav-link" href="/review2">Review</a>'+
'            </li>'+
          '</ul>'+
                 '<ul class="navbar-nav ms-auto"> '+
                     
                     '<li class="nav-item" href="/pics/current.txt">'+
                        '<a href="#" class="nav-link lead">  '+coin_balance+
       data;

    
       upload(req,res,function(err) {  
        if(err) {  
            return res.end("Error uploading file.");  
        }  
        //res.end("File is uploaded successfully!"); 
        uploadToIpfs(fileTOIPFS);
        res.send(data)
    });
    })

  /*
  coin_balance++;
  console.log(coin_balance)
  upload(req,res,function(err) {  
      if(err) {  
          return res.end("Error uploading file.");  
      }  
      //res.end("File is uploaded successfully!"); 
      console.log(req.body);
      uploadToIpfs(fileTOIPFS);
      res.sendFile(__dirname + "/upload_success.html")
  });  */

  
});  

app.get("*", (req, res) => {
return res.sendStatus(404)
})


const server = app.listen(8080, () => { // create a HTTP server on port 3000
  console.log(`Express running → PORT ${server.address().port}`)
  });