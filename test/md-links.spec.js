const {
  pathExist,
  absolutePath,
  convertToAbsolutePath,
  isFile,
  readFile,
  readDirectory,
  extMd,
  getAllFiles,
} = require('../src/md-links');

describe('Read the path', () => {
  it('Should return a boolean', () => {
    expect(pathExist('README.md')).toEqual('true');
  });
  it('Should return  a boolean', () => {
    expect(absolutePath('README.md')).toEqual('true');
  });
  it('Should return an absolute path', () => {
    expect(convertToAbsolutePath('prueba')).toBe(
      'C:/Users/PC USER/Desktop/LABORATORIA/MD-LINKS/LIM013-fe-md-links/prueba',
    );
  });
});

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
