const path = require('path');
const fs = require('fs-extra');
const child_process = require('child_process');
var os = require('os');

const sourcePath = path.resolve('./dist');
const deployPath = path.resolve('./../server/data/public/admin');

console.log(`Build will be deployed
from: ${sourcePath}
to: ${deployPath}`);

// console.log(`platform: ${os.platform()}`);
if( fs.existsSync(deployPath) ) {
    fs.removeSync(deployPath);    
} else {
    fs.mkdirSync(deployPath);    
}

fs.copySync(sourcePath, deployPath);

if( os.platform() === 'win32' ) {
    child_process.exec(`start "" "${deployPath}"`);
}

if( os.platform() === 'darwin' ) {
    child_process.exec(`open "${deployPath}"`);     // As you have sold your Mac, this line needs testing
}
