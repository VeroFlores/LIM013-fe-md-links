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
  if (argv.length === 1) {
    mdLinks(argv[0], { validate: false }).then((res) => {
      console.log(res);
    }).catch((res) => {
      console.log(res);
    });
  }
  if (argv[1] === '--validate' && argv[2] === '--stats') {
    mdLinks(argv[0], { validate: true }).then((res) => {
      console.log(statsLinks(res));
      console.log(statsValidate(res));
    }).catch(() => {
    });
  }
  if (argv[1] === '--stats' && argv[2] === '--validate') {
    mdLinks(argv[0], { validate: true }).then((res) => {
      console.log(statsValidate(res));
    }).catch(() => {
    });
  }
  if (argv[1] === '--validate') {
    mdLinks(argv[0], { validate: true }).then((res) => {
      console.log(res);
    }).catch((res) => {
      console.log(res);
    });
  }
  if (argv[1] === '--stats') {
    mdLinks(argv[0], { validate: false }).then((res) => {
      console.log(statsLinks(res));
    }).catch(() => {
    });
  }
