const axios = require('axios');
const {
  getLinksInFiles,
} = require('./util');

const linkValidate = (url, arrObj) => new Promise((resolve) => axios(url)
  .then((response) => resolve({
    ...arrObj,
    status: response.status,
    statusText: response.statusText,
  }))
  .catch(() => resolve({ ...arrObj, status: 404, statusText: 'FAIL' })));

module.exports = (newPath) => {
  const arrValidateLinks = [];
  const arrLink = getLinksInFiles(newPath);
  arrLink.forEach((el) => {
    arrValidateLinks.push(linkValidate(el.href, el));
  });
  return Promise.all(arrValidateLinks);
};
