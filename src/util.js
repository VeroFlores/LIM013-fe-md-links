const fs = require('fs');
const path = require('path');
// Check if path exist(method)
// Return boolean
const pathExist = (newPath) => {
  const checkPathExist = fs.existsSync(newPath);
  return checkPathExist;
};
// Check if Path is absolute(method)
// return boolean
const absolutePath = (newPath) => {
  const checkAbsolutePath = path.isAbsolute(newPath);
  return checkAbsolutePath;
};
// This function convert a relative path to absolute path
// return an absolute path
const convertToAbsolutePath = (newPath) => (
  absolutePath(newPath) ? newPath : path.resolve(newPath)
);
// Check if path is a file(method)
// return a boolean
const isFile = (newPath) => {
  const checkIsFile = fs.statSync(newPath).isFile();
  return checkIsFile;
};
// read File(method)
// return strings if you use encoding and flag
const readFile = (newPath) => {
  const getElements = fs.readFileSync(newPath, { encoding: 'utf8', flag: 'r' });
  return getElements;
};
// return relative path of all documents found in the directory(method)
const readDirectory = (newPath) => {
  const getDoc = fs.readdirSync(newPath);
  return getDoc;
};
// path.extname('users/joe/notes.txt')(method)
// return .txt
const extMd = (newPath) => {
  const mdFile = path.extname(newPath);
  return mdFile;
};
// this function get all files md. from a file or directory
// return an array of paths
const getAllFiles = (absPath) => {
  let arrFiles = [];
  if (isFile(absPath)) {
    arrFiles.push(absPath);
  } else {
    readDirectory(absPath).forEach((file) => {
      const completePath = path.join(absPath, file);
      const recursive = getAllFiles(completePath);
      arrFiles = arrFiles.concat(recursive);
    });
  }
  const mdPath = arrFiles.filter((el) => extMd(el) === '.md');
  return mdPath;
};

// this function get  all links from md files
// return an array of object
const getLinksInFiles = (newPath) => {
  const array = [];
  const absPath = convertToAbsolutePath(newPath);
  getAllFiles(absPath).forEach((file) => {
    const regex = /\[(.*)\]\(((?!#).+)\)/gi;
    const links = readFile(file).match(regex).map((v) => v.split('](')[1].slice(0, -1));
    const text = readFile(file).match(regex).map((v) => v.split('](')[0].slice(1));
    links.forEach((link, i) => {
      array.push({
        href: link,
        text: text[i],
        file,
      });
    });
  });

  return array;
};

module.exports = {
  pathExist,
  absolutePath,
  convertToAbsolutePath,
  isFile,
  readFile,
  readDirectory,
  extMd,
  getAllFiles,
  getLinksInFiles,
};
