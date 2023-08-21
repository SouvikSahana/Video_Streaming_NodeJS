const ffmpegStatic = require('ffmpeg-static');//this is only for ffmpeg
const fluentFfmpeg = require('fluent-ffmpeg');

// Set the path to the ffmpeg-static binary
fluentFfmpeg.setFfmpegPath(ffmpegStatic);


function createThumbnail(inputVideoPath,name){
    fluentFfmpeg(inputVideoPath)
  .on('filenames', (filenames) => {
    console.log('Will generate ' + filenames.join(', '));
  })
  .on('end', () => {
    console.log('Screenshot taken');
  })
  .screenshots({
    timestamps: ['00:00:00'], // Time for the initial frame
    filename: name+'.png', // Name of the generated image
    folder: './thumbnail.png',   // Output directory
    size: '640x480'            // Size of the generated image
  });
}

module.exports=createThumbnail;