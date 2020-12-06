const axios = require('axios');

const checkLinks = (arrLink) => {
  const arrValidateLinks = [];
  arrLink.forEach((element) => {
    arrValidateLinks.push(axios.get(element.href).then((response) => ({
      ...element,
      status: response.status,
      statusText: response.statusText,
    }))
      .catch(() => ({ ...element, status: 404, statusText: 'FAIL' })));
  });
  return Promise.all(arrValidateLinks);
};

const statsLinks = (arr) => {
  const links = [];
  arr.map((arrObj) => links.push(arrObj.href));
  const total = links.length;
  const unique = [...new Set(links)].length;
  return `✔ Total : ${total}\n✔ Unique : ${unique}`;
};
const statsValidate = (arr) => {
  const broken = arr.filter((obj) => obj.statusText === 'FAIL').length;
  return `✔ Broken : ${broken}`;
};
module.exports = {
  checkLinks,
  statsLinks,
  statsValidate,
};
