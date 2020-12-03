#!/usr/bin/env node

const { yellow } = require('chalk');
const chalk = require('chalk');
const commander = require('commander'); // (normal include)
const process = require('process');
const mdLinks = require('./md-links');
const {
  statsLinks,
  statsValidate,
} = require('./options');

const program = new commander.Command();
program.version('0.0.1');
program
  .command('mdlinks <path>')
  .option('-v, --validate')
  .option('-s, --stats')
  .parse(process.argv);

const warningColor = chalk.keyword('orange');
const blue = chalk.hex('#429CA8');
const pink = chalk.hex('#F590C4');
const lightBlue = chalk.hex('#78E6F5');
const lightYellow = chalk.hex('#F5E35F');
const darkYellow=chalk.hex('#A89F41');

const argv = process.argv.slice(2);
// const options = argv[1];
// switch (options) {
//   case '':
//     mdLinks(argv[0], { validate: false }).then((res) => {
//       console.log(res);
//     }).catch((res) => {
//       console.log(res);
//     });
//     break;
//   case '--validate':
//     mdLinks(argv[0], { validate: true }).then((res) => {
//       console.log(res);
//     }).catch((res) => {
//       console.log(res);
//     });
//     break;
//   case '--stats':
//     mdLinks(argv[0], { validate: false }).then((res) => {
//       console.log(statsLinks(res));
//     }).catch(() => {
//     });
//     break;
//   case '--stats --validate':
//   case '--validate --stats':
//     mdLinks(argv[0], { validate: true }).then((res) => {
//       console.log(statsLinks(res));
//       console.log(statsValidate(res));
//     }).catch(() => {
//     });
//     break;
//   default:
//     console.log('Ingresa lo siguiente');
// }
if (argv.length === 1) {
  mdLinks(argv[0], { validate: false }).then((res) => {
    res.forEach((obj) => {
      const printLinks = `${blue(argv[0])} ${pink(obj.href)} ${lightBlue(obj.text)}`;
      console.log(printLinks);
    });
  }).catch((rejected) => console.log(warningColor(rejected)));
} else if (argv[1] === '--validate' && argv[2] === '--stats') {
  mdLinks(argv[0], { validate: true }).then((res) => {
    console.log(lightBlue(statsLinks(res)));
    console.log(yellow(statsValidate(res)));
  }).catch(() => {
  });
} else
if (argv[1] === '--stats' && argv[2] === '--validate') {
  mdLinks(argv[0], { validate: true }).then((res) => {
    console.log(lightBlue(statsLinks(res)));
    console.log(yellow(statsValidate(res)));
  }).catch(() => {
  });
} else
if (argv[1] === '--validate') {
  mdLinks(argv[0], { validate: true }).then((res) => {
    res.forEach((obj) => {
      const printValidate = `${blue(argv[0])} ${pink(obj.href)} ${darkYellow(obj.statusText)} ${lightYellow(obj.status)} ${lightBlue(obj.text)}`;
      console.log(printValidate);
    });
  }).catch((res) => {
    console.log(res);
  });
} else
if (argv[1] === '--stats') {
  mdLinks(argv[0], { validate: false }).then((res) => {
    console.log(statsLinks(res));
  }).catch(() => {
  });
}
