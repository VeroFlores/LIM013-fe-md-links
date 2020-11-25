#!/usr/bin/env node

const chalk = require('chalk');
const commander = require('commander'); // (normal include)
const process = require('process');
const mdLinks = require('./md-links');

const program = new commander.Command();
program.version('0.0.1');
program
  .command('mdlinks <path>')
  .option('-v, --validate')
  .option('-s, --stats')
  .parse(process.argv);
const argv = process.argv.slice(2);
if (argv.length === 1) {
  mdLinks(argv[0]).then((res) => {
    console.log(res);
  }).catch((res) => {
    console.log(res);
  });
}
