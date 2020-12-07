#!/usr/bin/env node
/* eslint-disable consistent-return */

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
  .option('--validate')
  .option('--stats')
  .parse(process.argv);

const warningColor = chalk.keyword('orange');
const blue = chalk.hex('#429CA8');
const pink = chalk.hex('#F590C4');
const lightBlue = chalk.hex('#78E6F5');
const lightYellow = chalk.hex('#F5E35F');
const darkYellow = chalk.hex('#A89F41');

const argv = process.argv.slice(2);
const newPath = (argv.length === 1);
// Not work with argv[0]
// console.log(newPath);
// const valStat = (argv[1] === '--validate' && argv[2] === '--stats');
// const statVal = (argv[1] === '--stats' && argv[2] === '--validate');
// const val = (argv[1] === '--validate');
// const stat = (argv[1] === '--stats');
const validateCommand = argv.indexOf('--validate') > 0;
// console.log(validateCommand);
const statCommand = argv.indexOf('--stats') > 0;
// console.log(statCommand);

function cli(path, ValOpt, statOp) {
  if (path) {
    return mdLinks(argv[0], { validate: false }).then((res) => {
      res.forEach((obj) => {
        const printLinks = `${blue(argv[0])} ${pink(obj.href)} ${lightBlue(obj.text)}`;
        console.log(printLinks);
      });
    }).catch((error) => console.log(warningColor(error.message)));
  } if (ValOpt && statOp) {
    return mdLinks(argv[0], { validate: true }).then((res) => {
      console.log(lightBlue(statsLinks(res)));
      console.log(yellow(statsValidate(res)));
    }).catch((error) => {
      console.log(warningColor(error.message));
    });
  } if (ValOpt) {
    return mdLinks(argv[0], { validate: true }).then((res) => {
      res.forEach((obj) => {
        const printValidate = `${blue(argv[0])} ${pink(obj.href)} ${darkYellow(obj.statusText)} ${lightYellow(obj.status)} ${lightBlue(obj.text)}`;
        console.log(printValidate);
      });
    }).catch((error) => {
      console.log(warningColor(error.message));
    });
  } if (statOp) {
    return mdLinks(argv[0], { validate: false }).then((res) => {
      console.log(lightBlue(statsLinks(res)));
    }).catch((error) => {
      console.log(warningColor(error.message));
    });
  }
}
cli(newPath, validateCommand, statCommand);
