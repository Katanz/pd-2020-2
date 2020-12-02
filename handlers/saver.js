import path, { resolve } from 'path'
import fs from 'fs'
import chalk from 'chalk'

export default async function saveData(data) {
    const __dirname = path.resolve();
    const { code } = data
    const fileName = `${code}.json`
    const savePath = path.join(__dirname, '..', 'data', fileName)

    return new Promise((resolve, reject) => {

        fs.writeFile(savePath, JSON.stringify(data, null, 4), err => {
            if (err) {
                console.log('doesn`t work');
                return reject(err)
            }
            console.log('work');
            console.log(chalk.blue('File was successfully saved: ' + chalk.blue.bold(fileName) + '\n'));
            resolve()
        })
    })
}