import { quickSortObject } from './utils.js'



function printReport(pages) {
  console.log('==========================')
  console.log('REPORT')
  console.log('==========================')
  const sortedPagesArr = quickSortObject(pages, true)
  for (const page of sortedPagesArr) {
    console.log(`Found ${pages[page]} internal links to ${page}`)
  }
}



export { printReport }
