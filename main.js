// https://nodejs.org/docs/latest/api/process.html#processargv
import { argv } from 'node:process'



function main() {
  const args = argv.slice(2)
  if (args.length < 1) {
    console.log('No arguments supplied')
  } else if (args.length > 1) {
    console.log('Too many arguments supplied')
  } else {
    console.log(`The Web Crawler is starting on ${args[0]}`)
  }
}

main()
