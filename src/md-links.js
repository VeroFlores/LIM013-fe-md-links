const fs = require('fs');
const path = require('path');
const marked = require('marked');

const note = 'C:/Users/PC USER/Desktop/LABORATORIA/MD-LINKS/LIM013-fe-md-links/prueba';
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
const isFile = (newPath) => {
  const checkIsFile = fs.statSync(newPath).isFile();
  return checkIsFile;
};
console.log(isFile(note));
const readFile = (newPath) => {
  const getElements = fs.readFileSync(newPath, { encoding: 'utf8', flag: 'r' });
  return getElements;
};
const readDirectory = (newPath) => {
  const getDoc = fs.readdirSync(newPath);
  return getDoc;
};
console.log(readDirectory(note));
const extMd = (newPath) => {
  const mdFile = path.extname(newPath);
  return mdFile;
};
/* --get all files from all directories--*/
const getAllFiles = (absPath) => {
  let arrFiles = [];
  if (isFile(absPath) === true) {
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
console.log(getAllFiles(note));
module.exports = {
  pathExist,
  absolutePath,
  convertToAbsolutePath,
  isFile,
  readFile,
  readDirectory,
  extMd,
  getAllFiles,
};
// const getMdFiles = (arrFiles) => {
//   const mdPath = arrFiles.filter((el) => extMd(el) === '.md');
//   return mdPath;
// };
// const getLinks = (route) => {
//   const content = getMdFiles(route).forEach((file) => readFile(file));
//   return content;
// };
// console.log(getLinks(note));
// const data = fs.readFileSync('C:/Users/PC USER/Desktop/LABORATORIA/MD-LINKS/LIM013-fe-md-links/README.md',
//   { encoding: 'utf8', flag: 'r' });
// console.log(data);
// const getLinks = (route) => {
//   const arrLinks = [];
//   getMdFiles(route).forEach((file) => {
//     const renderer = new marked.Renderer();
//     renderer.link = (href, text, file) => {
//       const newObj = {
//         href,
//         text,
//         file,
//       };
//       arrLinks.push(newObj);
//     };
//     marked(readFile(file), { renderer });
//   });
//   return arrLinks;
// };
// console.log(getLinks(getMdFiles(getAllFiles(note))));
// Create reference instance

// Override function
// const renderer = {
//   heading(text, level) {
//     const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

//     return `
//             <h${level}>
//               <a name="${escapedText}" class="anchor" href="#${escapedText}">
//                 <span class="header-link"></span>
//               </a>
//               ${text}
//             </h${level}>`;
//   },
// };

// marked.use({ renderer });

// // Run marked
// console.log(marked('# heading+'));
// // JS DOM
// const jsdom = require('jsdom');

// const { JSDOM } = jsdom;
// const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
// console.log(dom.window.document.querySelector('p').textContent);
