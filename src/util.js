const fs = require('fs');
const path = require('path');
const axios = require('axios');

// const note = 'C:/Users/PC USER/Desktop/LABORATORIA/MD-LINKS/LIM013-fe-md-links/prueba';

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
const readFile = (newPath) => {
  const getElements = fs.readFileSync(newPath, { encoding: 'utf8', flag: 'r' });
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
// console.log(getAllFiles(note));
// const getLinks = (newPath) => {
//   const arr = [];
//   if (pathExist(newPath) === false) {
//     console.log('ruta no válida');
//   } else {
//     const absPath = convertToAbsolutePath(newPath);
//     console.log(absPath);
//     getAllFiles(absPath).forEach((file) => {
//       const renderer = new marked.Renderer();
//       renderer.link = (href, title, text) => {
//         const objectPerLink = {
//           href,
//           text,
//           file,
//         };
//         arr.push(objectPerLink);
//       };
//       marked(readFile(file), { renderer });
//     });
//   }
//   return arr;
// };
// console.log(getLinks(note));
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
// console.log(getLinksInFiles(note));
// const validate = (url) => {
//   axios.get(url.href)
//     .then((response) => {
//       const newObj = {
//         ...url,
//         status: response.status,
//         statusText: response.statusText,
//       };
//       return newObj;
//     })
//     .catch(() => ({
//       status: 400,
//       statusText: 'FAIL',
//     }));
// };
// console.log(validate('https://developers.google.com/v8/'));
const linkValidate = (url, arrObj) => new Promise((resolve) => axios(url)
  .then((response) => resolve({
    ...arrObj,
    status: response.status,
    statusText: response.statusText,
  }))
  .catch(() => resolve({ ...arrObj, status: 404, statusText: 'FAIL' })));

const checkLinks = (newPath) => {
  const arrValidateLinks = [];
  const arrLink = getLinksInFiles(newPath);
  arrLink.forEach((el) => {
    arrValidateLinks.push(linkValidate(el.href, el));
  });
  return Promise.all(arrValidateLinks);
};
// console.log(checkLinks(note));

// const fetch = require('node-fetch');
// const request = fetch('https://developers.google.com/v8/');

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
  checkLinks,
  getLinksInFiles,
};
