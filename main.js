import { crawlPage } from './crawl.js'

// https://nodejs.org/docs/latest/api/process.html#processargv
import { argv } from 'node:process'



function main() {
  // disregard the first two included arguments
  const arg = argv.slice(2)
  // if there is no extra argument
  if (arg.length < 1) {
    console.log('No arguments supplied')
    return
  }
  // if there is more than one extra argument
  if (arg.length > 1) {
    console.log('Too many arguments supplied')
    return
  }
  // Execution
  console.log(`The Web Crawler is starting on ${arg}`)
  try {
    crawlPage(arg)
  } catch (err) {
    console.error(err.message)
  }

}

main()
