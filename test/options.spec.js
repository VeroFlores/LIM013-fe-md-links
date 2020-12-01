const axios = require('axios');
const {
  checkLinks,
  statsLinks,
  statsValidate,
} = require('../src/options');
// Mock out all top level functions, such as get, put, delete and post:
jest.mock('axios');
// Without using any other libraries:
const newPath = 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\test\\exampleTest';
const links1 = [
  {
    href: 'https://www.w3schools.com/js/js_promise.asp',
    text: 'Promises',
    file: 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\test\\exampleTest\\example1.md',
  },

];
const links2 = [{
  href: 'https://www.w3schools.com/js/js_callback.as',
  text: 'Callbacks',
  file: 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\test\\exampleTest\\example2.md',
}];
// https://jestjs.io/docs/en/mock-functions test con jest
describe('petición HTTP de Axios con respuesta positiva', () => {
  it('good response', (done) => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {}, status: 200, statusText: 'OK' }));
    checkLinks(links1).then((response) => {
      expect(response).toEqual([
        {
          href: 'https://www.w3schools.com/js/js_promise.asp',
          text: 'Promises',
          file: 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\test\\exampleTest\\example1.md',
          status: 200,
          statusText: 'OK',
        },
      ]);
      done();
    });
  });
  it('La petición devuelve un objeto con error', (done) => {
    axios.get.mockImplementation(() => Promise.reject(new Error({ data: {}, status: 404, statusText: 'FAIL' })));
    //
    checkLinks(links2).then((response) => {
      expect(response).toEqual([
        {
          href: 'https://www.w3schools.com/js/js_callback.as',
          text: 'Callbacks',
          file: 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\test\\exampleTest\\example2.md',
          status: 404,
          statusText: 'FAIL',
        },
      ]);
      done();
    });
  });
});
