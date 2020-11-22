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
console.log(readFile('C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\prueba\\prueba1.md'));
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
const getLinks = (newPath) => {
  const arr = [];
  if (pathExist(newPath) === false) {
    console.log('ruta no válida');
  } else {
    const absPath = convertToAbsolutePath(newPath);
    console.log(absPath);
    getAllFiles(absPath).forEach((file) => {
      const renderer = new marked.Renderer();
      renderer.link = (href, title, text) => {
        const objectPerLink = {
          href,
          text,
          file,
        };
        arr.push(objectPerLink);
      };
      marked(readFile(file), { renderer });
    });
  }
  return arr;
};
console.log(getLinks(note));
const getLinksInFiles = (newPath) => {
  const array = [];
  if (pathExist(newPath) === false) {
    console.log('ruta no válida');
  } else {
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
        return array;
      });
    });
  }
  return array;
};
console.log(getLinksInFiles(note));

//   const arr = [];
//   const renderer = new marked.Renderer();
//   renderer.link = (href, _, text) => {
//     arr.push({
//       href,
//       text,
//       pathN,
//     });
//   };
//   marked(readFile(), {
//     renderer,
//   });
// };
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
