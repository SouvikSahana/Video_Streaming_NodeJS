const fs = require('fs');
const path = require('path');
const createThumbnail = require('./initialImage');

// Specify the directory path
const directoryPath = './videos'; 

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Print the list of file names
    console.log('Files in the directory:');
    files.forEach(file => {
        const extension = path.extname(file);
        const name = file.replace(extension, "");
        const filePath = path.join(directoryPath, file); // Full path to the file
        createThumbnail(filePath, name); // Pass the full path and name to createThumbnail
    });
});
