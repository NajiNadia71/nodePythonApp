const express = require('express');
const { spawn } = require('child_process');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/form_tosend.html");
});
app.post("/", (req, res) => {
    var Input = req.body.Input;
    console.log('get string is ', Input);

    var largeDataSet = [];
    var fs = require('fs');
    fs.appendFile('src/InputUserFile', Input, function (err) {
        if (err) throw err;
    });
    const python = spawn('python', ['src/main.py', 'src/InputUserFile', 'result.lp']);
    python.stdout.on('data', function (data) {
        // console.log('Pipe data from python script ...');
        largeDataSet.push(data);
    });
    python.on('close', (code) => {
        fs.readFile('result.lp', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            var result = data.toString();
            //   console.log(data);
            var pathFileInput = 'src/InputUserFile';
            var pathFileResult = 'result.lp';
            fs.unlink(pathFileInput, (err) => {
                if (err) throw err
                //  console.log('pathFileInput  was deleted');
            });

            fs.unlink(pathFileResult, (err) => {
                if (err) throw err
                // console.log('pathFileResult  was deleted');
            });
            //  console.log(result);
            res.send({ Result: result });
        });
    });

})
app.listen(3021);