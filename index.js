const express = require('express');
const fs = require('fs');
const path=require("path")
const app = express();

app.use(express.static("./public"))

app.get("/videolist",(req,res)=>{
    const directoryPath="./videos"
    const data=[];
    const files= fs.readdirSync(directoryPath)
    files.forEach(file=>{
        const extension=path.extname(file)
        const name=file.replace(extension,"")
        data.push({
            name: name ,
            link: `file.html?name=${file}`,
            imageSrc:`${name}.png`,
            extension: extension.slice(1,extension.length)
        })
    })
    res.send(data)
})
app.get('/playvideo', (req, res) => {
    const videoName=req.query.name  
    const videoExtension=path.extname(videoName).replace('.',"")
    const videoPath = `./videos/${videoName}`;
    const videoSize = fs.statSync(videoPath).size;

    // Get the range header from the request
    const rangeHeader = req.headers.range;

    if (!rangeHeader) {
        return res.status(400).send('Range header is required');
    }

    const parts = rangeHeader.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;

    const chunksize = end - start + 1;
    // Set headers for video streaming
    const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': `video/${videoExtension}`,
    };

    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end });

    stream.pipe(res);
});

app.listen(5000, () => {
    console.log('Server is running...');
});
