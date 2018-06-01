const path = require('path')
const echo = require('node-echo')
const fs = require('fs')
const dataFile = path.join(__dirname, '../.pwdrc')
const hasfile = fs.existsSync(dataFile)
const chalk = require('chalk')
const prompt = require('co-prompt')
const co = require('co')
let currdata = JSON.parse(hasfile ? fs.readFileSync(dataFile, 'UTF-8'): `{}`)
module.exports = {
    list () {
        if (!Object.keys(currdata).length) {
          return console.log(chalk.cyan(`you have no account currently`))
        }
        for (let account in currdata) {
            console.log(chalk.cyan(`${account}: ${currdata[account]}`))
        }
    },
    find (account) {
        if (!currdata[account]) {
            return console.log(chalk.yellow(`you have not the account of ${account} \n please add it`))
        }
        return console.log(`${account}: ${currdata[account]}`)
    },
    add (account, pwd) {
        if (hasfile) {
            if (currdata[account]) {
                 return console.log(chalk.yellow(`you has the ${account} already,\n
                if you want update, please use the command of set`))
            }
           return echo(Object.assign(currdata, {[account]: pwd}), '>', dataFile, function (info) {
               return console.log(chalk.green(`add the account of ${account} ok`))
           })
        }
        return echo(JSON.stringify({[account]: pwd}), '>', dataFile, function () {
            return console.log(chalk.green(`add the account of ${account} ok`))
        })
    },
    set (account, pwd) {
        if (!currdata[account]) {
            return console.log(chalk.yellow(`you have not the account of ${account} \n please add it`))
        }
        co(function *() {
            const res = yield prompt.confirm(`are you sure to update the password of ${account} to ${pwd},
            this will cover your origin passward?`)
            if (res) {
                currdata[account] = pwd
                echo(currdata, '>', dataFile, function () {
                    console.log(chalk.green(`you have update the account of ${account} success`))
                    process.exit(1)
                })
            } else {
                process.exit(1)
            }
        })
    
    },
    del (account) {
        co(function *() {
            const res = yield prompt.confirm(`are you sure to del the account of ${account}?`)
            if (res) {
                delete currdata[account]
                echo(currdata, '>', dataFile, function () {
                    console.log(chalk.green(`you have delete the account of ${account} success`))
                    process.exit(1)
                })
            } else {
              process.exit(1)
            }
        })
    }
}