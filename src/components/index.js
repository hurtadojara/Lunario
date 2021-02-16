const express = require('express')
const app = express()
let {PythonShell} = require('python-shell')

    function runOauth(){
        return ('./scripts_API/Oauth2.js', null, function (err) {
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
      
      app.get('/oauth', function (req, res) {
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