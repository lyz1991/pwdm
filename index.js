#!/usr/bin/env node

const program = require('commander')
const pkg = require('./package.json')
const tool = require('./module/tool')
program.version(pkg.version)
program.command('ls')
    .description('show all the account')
    .action(tool.list)
program.command('add account pwd')
    .description('add data')
    .alias('a')
    .action(tool.add);
program.command('find account')
    .description('find the pwd of the account')
    .alias('f')
    .action(tool.find)
program.command('del account')
    .description('del the account')
    .alias('d')
    .action(tool.del)
program.command('set account pwd')
    .description('set the account')
    .alias('s')
    .action(tool.set)
program.command('clear')
  .description('clear all the account')
  .action(tool.clear)

program
    .parse(process.argv);
