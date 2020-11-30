const {
  pathExist,
  getLinksInFiles,
} = require('./util');
const validate = require('./options');

// const note = 'C:/Users/PC USER/Desktop/LABORATORIA/MD-LINKS/LIM013-fe-md-links/prueb';

module.exports = (path, options) => {
  const promise = new Promise((resolve, reject) => {
    if (pathExist(path) === false) {
      resolve('Enter new path');
    }
    if (pathExist(path) === true && options) {
      resolve(validate.checkLinks(path));
    } else {
      resolve(getLinksInFiles(path));
      // if (options.validate === true) {
      //   checkLinks(path).then((arr) => {
      //     console.log(arr);
      //     resolve(arr);
      //   });
      // }
    }
  });
  return promise;
};
