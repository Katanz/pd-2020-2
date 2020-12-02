import cherio from 'cherio'
import chalk from 'chalk'
import transliteration from 'transliteration'

import listItemsHandler from './handlers/listItemsHandler.js'
import {arrayFromLenght} from './helpers/common.js'
import {getPageContent} from './helpers/puppeteer.js'

const {slugify} = transliteration

const SITE = 'https://auto.ru/moskva/cars/porsche/911/all/?page_num=1'
const pages = 2

async function main() {
  try {
    for (const page of arrayFromLenght(pages)) {
      const url = `${SITE}${page}`
      const pageContent = await getPageContent(url)
      const $ = cherio.load(pageContent)
      const carsItems = []
      $('.ListingItemTitle-module__link').each((i, header) => {
        const url = $(header).attr('href')
        const title = $(header).text()
        carsItems.push({
          title,
          url,
          code: slugify(title)
        })
      })
      await listItemsHandler(carsItems)
    }
  } catch (error) {
    console.log(chalk.red('An error has occured \n'))
    console.log(error)
  }
}

main()
