//1. import node tools for working with files

//'fs' stands for file system and allows us to read, move, and delete files.
const fs = require('fs');
// 'path' helps us build and handle file paths correctly accross different OS's 
const path = require('path');

const chokidar = require('chokidar');

//2. Define folder path

/**
 * '\' is the windows path seperator. Mac/Linux use '/'. So hardcoding '\' would break on other systme.
 * '\' in a script in JavaScript is a special escape character, so writing 'C:\Users...' can cause bugs 
 */
//dynamically get current user's home directory without exposing username
const downloadsFolder = path.join(require('os').homedir(), 'Downloads');

//3. Define sorting rules

//the script will look up the specific file type in the folder map and find it under the specific key/folder and store it there.
const folderMap = {
    Images: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    Videos: ['.mp4', '.mkv', '.mov', '.avi'],
    Music: ['.mp3', '.wav', '.flac', '.aac'],
    Documents: ['.pdf', '.docx', '.doc', '.txt', '.xlsx', '.pptx'],
    Archives: ['.zip', '.rar', '.7z'],
    Code: ['.js', '.html', '.css', '.json', '.py'],
    Others: [],
};

//4. Read files in the Downloads folder

/**
 * 'readdir' reads all the files in a folder and returns them as an array of file names.
 * 'Sync' means it waits until it's done reading before moving to the next line (we don't want to start sorting files before we've finished reading them)
 */
const files = fs.readdirSync(downloadsFolder);

//5. Loop through each file

/**
 * 'forEach' loops through every file in the array
 * 'path.extname()' extracts the extention for the filename
 * '.toLowerCase()' makes it lowercase so '.MP3' and '.mp3' are treated the same.
 */
let count = 0;

files.forEach(file => sortFile(file));

console.log(`Sorting complete! Moved ${count} files.`);

// 'chokidar.watch()' watches Downloads folder
const watcher = chokidar.watch(downloadsFolder, {
    ignoreInitial: true,        //ignores files already present when the watcher starts
    awaitWriteFinish: true,     // waits until a file is fully downloaded before sorting it.
});

//'.on('add')' fires when a new file appears
watcher.on('add', (filePath) => {
    const file = path.basename(filePath);       //extracts the filename from full path given by chokidar
    const destination = sortFile(file);         //assign returned 'destinationFolder' from sortFile()
    /**
     * chokidar usually fires twice, and the second fire tries reading a non existent file.
     * This resulted in logging the same file twice.
     * I made the catch return a null and only log files if destination isn't null.
     */
    if(destination != null){
        console.log(`New file detected: ${file}`);
        console.log(`File: ${file} was moved to ${destination}`);
    }
});

console.log("Watching Downloads folder for new files...");

function sortFile(file) {
    const fileExt = path.extname(file).toLocaleLowerCase();
    let destinationFolder = null;

    //loop through each key in folder map
    for (const folder in folderMap) {

        //'includes()' checks if the folder's extension array contains specified file ext
        if(folderMap[folder].includes(fileExt)) {
            //If it matches, save the folder name and break out of loop
            destinationFolder = folder;
            break;
        }
    }

    /**
     * files were being detected twice.
     * I got an error saying the file doesn't exist when statSync tries to read it because by the time the 2nd event fires, the file was already moved by the 1st one
     * Try/Catch prevents the file from being detected twice
     */
   try{
         /**
         * 'statSYnc' returns info about any file or folder
         * At first I passed 'files' to the method but thats an entire array of all files.
         * So I passed 'file' but stat sync needs the full path to the file and not just the filename.
         * So I join the filename with the entire file path to my downloads folder
         */
        const fileInfo = fs.statSync(path.join(downloadsFolder, file));

        //'isFile()' checks if the item is a file or not, which will items that are false
        if(fileInfo.isFile()){

            //If a file doesn't match any folder in the folderMap, assign it to 'Others'
            if(destinationFolder == null) {
                destinationFolder = 'Others' ;
            }

            //'destFolder' builds the full path to the subfolder
            const destFolder = path.join(downloadsFolder, destinationFolder);

            //'existSync' checks if that subfolder already exists
            if(!fs.existsSync(destFolder)) {
                //mkdir creates that subfolder if it doesn't exist yet
                fs.mkdirSync(destFolder) ;
            }

            //'sourcePath' full path of where file currently is
            const sourcePath = path.join(downloadsFolder, file);
            //'destPath' full path of where we want file to go
            const destPath = path.join(destFolder, file);

            //'renameSync' is what actually moves the file
            fs.renameSync(sourcePath, destPath);
            count++;
        }

        return destinationFolder;       //for logging destination folder in .watcher(). line 62
   }

   catch{
    console.log('File already moved, skipping...')
    return null;
   }
}