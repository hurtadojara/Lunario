const express = require('express')
const app = express()
const cors = require('cors')
let {PythonShell} = require('python-shell')

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "https://localhost:3000"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

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
      
      app.get('/oauth', function (req, res, next) {
        const subprocess = runOauth()
        res.set('Content-Type', 'text/plain');
        subprocess.stdout.pipe(res)
        subprocess.stderr.pipe(res)
      })

      app.post('/createevent', function (req, res) {
        const subprocess = runEvent()
        res.set('Content-Type', 'text/plain');
        subprocess.stdout.pipe(res)
        subprocess.stderr.pipe(res)
      });


    app.listen(8080, () => console.log('Server running'));