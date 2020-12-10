const {
  pathExist,
  convertToAbsolutePath,
  getLinks,
  getAllFiles,
} = require('./util');
const { checkLinks } = require('./options');

module.exports = (path, options) => {
  const promise = new Promise((resolve, reject) => {
    const absPath = convertToAbsolutePath(path);
    if (pathExist(absPath) === true) {
      if (getAllFiles(absPath).length === 0) {
        reject(new Error(`${path} doesn't have md. files`));
      }
      if (getLinks(absPath).length === 0) {
        reject(new Error(`${path} doesn't have links files`));
      }
      if (options.validate === true) {
        resolve(checkLinks(getLinks(absPath)));
      } else {
        resolve(getLinks(path));
      }
    } else {
      reject(new Error(`${path} doesn't exist\nEnter a new path`));
    }
    // if (pathExist(path) === false) {
    //   reject(new Error(`${path} doesn't exist\nEnter a new path`));
    // } else if (pathExist(path) === true && options.validate === true) {
    //   resolve(checkLinks(getLinksInFiles(getAllFiles(path))));
    // } else {
    //   resolve(getLinksInFiles(getAllFiles(path)));
    // }
  });
  return promise;
};
