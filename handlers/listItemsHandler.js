import cherio from 'cherio'
import chalk from 'chalk'

import saveData from "./saver.js";
import { getPageContent } from "../helpers/puppeteer.js";

export default async function listItemsHandler(data) {
    try {
        for (const initialData of data) {
            console.log(chalk.green(`Getting data from `) + chalk.green.bold(initialData.url));
            const detailContent = await getPageContent(initialData.url)
            const $ = cherio.load(detailContent)
            const price = $('.PriceUsedOffer-module__caption').text()

            await saveData({
                ...initialData,
                price
            })
        }

    } catch (error) {
        throw error
    }
}