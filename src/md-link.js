const fs = require('fs');
const path = require('path');

const note = 'C:/Users/PC USER/Desktop/LABORATORIA/MD-LINKS/LIM013-fe-md-links/README.md';
// const pathExist = (route) => {
//   fs.existsSync(route);
// };
// const absolutePath = (route) => {
//   if (!path.isAbsolute(route)) {
//     path.resolve(route);
//   } else {
//     path.isAbsolute(route);
//   }
// };
// exports.module = {
//   pathExist,
//   absolutePath,

// };
/* --Check if path exist -return boolean--*/
const pathExist = (newPath) => {
  const checkPathExist = fs.existsSync(newPath);
  return checkPathExist;
};
const absolutePath = (newPath) => {
  const checkAbsolutePath = path.isAbsolute(newPath);
  return checkAbsolutePath;
};
/* --Convert relativePath to Absolute return absolutePath--*/
const convertToAbsolutePath = (newPath) => (
  absolutePath(newPath) === 'true' ? newPath : path.resolve(newPath)
);
const prueba = convertToAbsolutePath(note);
console.log(prueba);

const isFile = (newPath) => {
  const checkIsFile = fs.statSync(newPath).isFile();
  return checkIsFile;
};
console.log(isFile(note));
const isDirectory = (newPath) => {
  const checkIsDirectory = fs.statSync(newPath).isDirectory();
  return checkIsDirectory;
};
const readFile = (newPath) => {
  const getElements = fs.readFileSync(newPath);
  return getElements;
};
const readDirectory = (newPath) => {
  const getDoc = fs.readdirSync(newPath);
  return getDoc;
};
const extMd = (newPath) => {
  const mdFile = path.extname(newPath);
  return mdFile;
};
console.log(extMd(note));
const markdownFiles = (newPath) => {
  const arrayFiles = [];
  const changedPath = convertToAbsolutePath(newPath);
  console.log(changedPath);
  if (isFile(changedPath) === true && extMd(changedPath) === '.md') {
    return arrayFiles.push(changedPath);
  }
  if (isDirectory(changedPath) === true) {
    return readDirectory(changedPath);
  }else{
    markdownFiles(changedPath);
  }
  return arrayFiles;
};

console.log(markdownFiles(note));
// const mdLink = (notes) => {
//   if (fs.existsSync(notes) === true) {
//     if (path.isAbsolute(notes) === false) {
//       return path.resolve(notes);
//     }
//   }
// };
