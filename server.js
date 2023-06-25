const express = require('express');
const { spawn } = require('child_process');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3020;
const fs = require('fs');
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
app.get("/", (req, res) => {
    res.send("Welcome to CNL2ASP API, to convert please use /convert endpoint with POST method");
});
app.post("/convert", (req, res) => {
    try {
        let Input = req.body.input;
        console.log(req.body, {Input});
        let largeDataSet = [];

        fs.appendFile('src/InputUserFile', Input, function (err) {
            if (err) throw err;
        });
        const python = spawn('python', ['src/main.py', 'src/InputUserFile', 'result.lp']);
        python.stdout.on('data', function (data) {
            largeDataSet.push(data);
        });
        python.on('close', () => {
            fs.readFile('result.lp', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let result = data.toString();
                let pathFileInput = 'src/InputUserFile';
                let pathFileResult = 'result.lp';
                fs.unlink(pathFileInput, (err) => {
                    if (err) throw err
                });

                fs.unlink(pathFileResult, (err) => {
                    if (err) throw err
                });
                res.send({Result: result});
            });
        });
}
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
})