const {
  pathExist,
  getLinksInFiles,
  getAllFiles,
} = require('./util');
const { checkLinks } = require('./options');

// const note = 'C:/Users/PC USER/Desktop/LABORATORIA/MD-LINKS/LIM013-fe-md-links/prueb';

module.exports = (path, options) => {
  const promise = new Promise((resolve, reject) => {
    if (pathExist(path) === false) {
      reject(new Error('Enter new path'));
    } else if (pathExist(path) === true && options.validate === true) {
      resolve(checkLinks(getLinksInFiles(path)));
    } else {
      resolve(getLinksInFiles(path));
    }
  });
  return promise;
};
