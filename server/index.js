const express = require('express')
const app = express()
const cors = require('cors')
let {PythonShell} = require('python-shell')

    app.use(cors());
    var whitelist = ['hhtp://localhost:3000']
    var corsOptions = {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) != -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    }

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
      
      app.get('/oauth', cors(corsOptions),function (req, res) {
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