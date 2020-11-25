const {
  pathExist,
  absolutePath,
  convertToAbsolutePath,
  isFile,
  readFile,
  readDirectory,
  extMd,
  getAllFiles,
} = require('../src/util');

const absPathDir = 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\prueba';
const absPathFile = 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\prueba\\prueba1.md';
const absPathFile1 = 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\prueba\\prueba2.md';
const relPathDir = 'prueba';
const filesArray = [
  'prueba1.md',
  'prueba2.md',
];
const absPathFileArray = [
  absPathFile, absPathFile1,
];
describe('Read the path', () => {
  it('Should verify if path exist', () => {
    expect(pathExist(absPathDir)).toEqual(true);
  });
  it('Should verify if path is absolute', () => {
    expect(absolutePath(absPathDir)).toEqual(true);
  });
  it('Should return an absolute path', () => {
    expect(convertToAbsolutePath(relPathDir)).toBe(absPathDir);
  });
});
describe('check file/directory', () => {
  it('verify if is a file', () => {
    expect(isFile(absPathFile)).toBe(true);
  });
  it('Should read a file', () => {
    expect(readFile(absPathFile1)).toBe('[Markdown](https://es.wikipedia.org/wiki/Markdown)');
  });
  it('Should read a directory', () => {
    expect(readDirectory(absPathDir)).toEqual(filesArray);
  });
  it('Should filter with .md ext', () => {
    expect(extMd(absPathFile)).toBe('.md');
  });
  it('Should get all md. files ', () => {
    expect(getAllFiles(absPathDir)).toEqual(absPathFileArray);
  });
});
// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
