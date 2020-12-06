const axios = require('axios');
const {
  checkLinks,
  statsLinks,
  statsValidate,
} = require('../src/options');
const mdLinks = require('../src/md-links');

jest.mock('axios');

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
const arrLinks = links1.concat(links2);
const arrayLinks = [
  {
    href: 'https://www.w3schools.com/js/js_promise.asp',
    text: 'Promises',
    file: 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\test\\exampleTest\\example1.md',
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://www.w3schools.com/js/js_callback.as',
    text: 'Callbacks',
    file: 'C:\\Users\\PC USER\\Desktop\\LABORATORIA\\MD-LINKS\\LIM013-fe-md-links\\test\\exampleTest\\example2.md',
    status: 404,
    statusText: 'FAIL',
  },
];
// https://jestjs.io/docs/en/mock-functions test con jest
describe('Request HTTP using Axios', () => {
  it('the request is successfull', (done) => {
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
  it('the request fails', (done) => {
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
describe('options Functions', () => {
  it('Should return total and unique links', () => {
    expect(statsLinks(arrayLinks)).toBe('✔ Total : 2\n✔ Unique : 2');
  });
  it('Should return broken links ', () => {
    expect(statsValidate(arrayLinks)).toBe('✔ Broken : 1');
  });
});
describe('mdLinks Functions', () => {
  it('Should return a fail message', (done) => {
    mdLinks('./tes', { validate: false }).catch((error) => {
      //  jest doc expect(…).rejects.toMatch(…) should handle an Error object
      expect(error).toEqual(new Error('Enter new path'));
      done();
    });
  });
  it('Should return array of object [{ href, text, file, status, message }] ', (done) => {
    axios.get.mockImplementation(() => Promise.resolve({ data: {}, status: 200, statusText: 'OK' }));
    mdLinks('./test/exampleTest/example1.md', { validate: true }).then((response) => {
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
  it('Should return array of object [{ href, text, file }]', (done) => {
    mdLinks('./test', { validate: false }).then((data) => {
      expect(data).toEqual(arrLinks);
      done();
    });
    done();
  });
});
