const express = require('express');
const path = require('path');
let {PythonShell} = require('python-shell')

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
function runOauth(){
    return PythonShell.run('./scripts_API/oauth.py', null, function (err) {
    if (err) throw err;
    console.log('finished');
  });
  }

  function runEvent(){
    return PythonShell.run('./scripts_API/create_event.py', null, function (err) {
    if (err) throw err;
    console.log('finished');
  });
  }
  app.get('/prueba', function (req, res, next) {
    alert("pana yaaa");
    res.set('Content-Type', 'text/plain');
    subprocess.stdout.pipe(res);
    subprocess.stderr.pipe(res);
    next();
  });

  app.get('/oauth', function (req, res, next) {
    const subprocess = runOauth()
    res.set('Content-Type', 'text/plain');
    subprocess.stdout.pipe(res);
    subprocess.stderr.pipe(res);
    next();
  })

  app.post('/createevent', function (req, res) {
    const subprocess = runEvent()
    res.set('Content-Type', 'text/plain');
    subprocess.stdout.pipe(res);
    subprocess.stderr.pipe(res);
  });

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
