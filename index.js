#!/usr/bin/env node
const path = require('path')
const echo = require('node-echo')
const program = require('commander')
const pkg = require('./package.json')
const tool = require('./module/tool')
program.version(pkg.version)
program.command('ls')
    .description('lyz')
    .action(() => {
        tool.list()
    });

program
    .parse(process.argv);
