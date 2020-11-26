const {
  pathExist,
  checkLinks,
  getLinksInFiles,
} = require('./util');

// const note = 'C:/Users/PC USER/Desktop/LABORATORIA/MD-LINKS/LIM013-fe-md-links/prueb';

module.exports = (path, options) => {
  const promise = new Promise((resolve, reject) => {
    if (pathExist(path) === false) {
      reject(new Error('Enter new path'));
    }

    if (pathExist(path) === true && options) {
      resolve(checkLinks(path)).then((arr) => {
        resolve(arr);
      });
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
