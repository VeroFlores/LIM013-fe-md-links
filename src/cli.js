#!/usr/bin/env node

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
const argv = process.argv.slice(2);
// switch (argv) {
//   case argv[0]:
//     mdLinks(argv[0], { validate: false }).then((res) => {
//       console.log(res);
//     }).catch((res) => {
//       console.log(res);
//     });
//     break;
//   case argv[1] && argv[2]:
//     mdLinks(argv[0], { validate: true }).then((res) => {
//       console.log(statsLinks(res));
//       console.log(statsValidate(res));
//     }).catch(() => {
//     });
//     break;
//   default:
//     console.log(`Lo lamentamos, por el momento no disponemos de ${expr}.`);
// }
if (argv.length === 1) {
  mdLinks(argv[0], { validate: false }).then((res) => {
    console.log(res);
  }).catch((res) => {
    console.log(res);
  });
} else if (argv[1] === '--validate' && argv[2] === '--stats') {
  mdLinks(argv[0], { validate: true }).then((res) => {
    console.log(statsLinks(res));
    console.log(statsValidate(res));
  }).catch(() => {
  });
} else
if (argv[1] === '--stats' && argv[2] === '--validate') {
  mdLinks(argv[0], { validate: true }).then((res) => {
    console.log(statsLinks(res));
    console.log(statsValidate(res));
  }).catch(() => {
  });
} else
if (argv[1] === '--validate') {
  mdLinks(argv[0], { validate: true }).then((res) => {
    console.log(res);
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
