const fs = require('fs');

const base = 'dist/';
const pathPackage = base+"package.json";

const p = {
         "name": "semiring",
          "description": "A simple library for defining semirings and evaluating expressions",
        "version": "1.2.0",
        "main": "index.js",
        "types": "index.d.ts",
        "repository": "git@github.com:digitalheir/semiring-js.git",
        "author": "Maarten Trompper",
        "license": "MIT",
        "dependencies": {
        }
};
    
function writePackageFileInDist(){
    fs.writeFile(pathPackage, JSON.stringify(p, null, 2), "utf8", (err) => {
        if(err) console.error(err);
        else console.log("Written "+pathPackage);
    });
}

writePackageFileInDist();