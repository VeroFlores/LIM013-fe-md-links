const {
  pathExist,
  absolutePath,
  convertToAbsolutePath,
  isFile,
  readFile,
  readDirectory,
  getAllFiles,
  getLinksInFiles,
} = require('../src/util');

const absPathDir = 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\test\\exampleTest';
const absPathFile = 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\test\\exampleTest\\example1.md';
const absPathFile1 = 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\test\\exampleTest\\example2.md';
const relPathDir = 'test\\exampleTest\\example1.md';
const filesArray = [
  'example1.md',
  'example2.md',
];
const absPathFileArray = [
  absPathFile, absPathFile1,
];
const links = [
  {
    href: 'https://www.w3schools.com/js/js_promise.asp',
    text: 'Promises',
    file: absPathFile,
  },
  {
    href: 'https://www.w3schools.com/js/js_callback.as',
    text: 'Callbacks',
    file: absPathFile1,
  },
];
describe('nodeJs Methods', () => {
  it('Should verify if path exist', () => {
    expect(pathExist(absPathDir)).toBe(true);
  });
  it('Should verify if path is absolute', () => {
    expect(absolutePath(absPathDir)).toBe(true);
  });
  it('verify if is a file', () => {
    expect(isFile(absPathFile)).toBe(true);
  });
  it('Should read a file', () => {
    expect(readFile(absPathFile1)).toBe('[Callbacks](https://www.w3schools.com/js/js_callback.as)');
  });
  it('Should read a directory', () => {
    expect(readDirectory(absPathDir)).toEqual(filesArray);
  });
});
describe('functions', () => {
  it('Should return an absolute path', () => {
    expect(convertToAbsolutePath(relPathDir)).toBe(absPathFile);
  });
  it('Should get all md. files ', () => {
    expect(getAllFiles(absPathDir)).toEqual(absPathFileArray);
  });
  it('Should get all links from md. files ', () => {
    expect(getLinksInFiles(absPathDir)).toEqual(links);
  });
});
