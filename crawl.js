import { JSDOM } from 'jsdom'



function normalizeURL(url) {
  // Strip off all URL info besides domain and path
  const urlObj = new URL(url)
  let fullpath = `${urlObj.hostname}${urlObj.pathname}`

  // remove the trailing '/' if present in the path
  if (fullpath[fullpath.length - 1] === '/') {
    fullpath = fullpath.slice(0, -1)
  }

  return fullpath
}


// https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics
// https://github.com/jsdom/jsdom
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model

function getURLsFromHTML(htmlBody, baseURL) {
  // Creates a new DOM document object
  const returnedDocument = new JSDOM(htmlBody).window.document

  // Select all anchor or "a" tags from the document
  const anchors = returnedDocument.querySelectorAll('a')

  // Make an array of valid URLs from the document query
  const urls = []
  // `anchors` is a `NodeList` which can be iterated over (but is not an array)
  for (const anchor of anchors) {
    // .has and .get Attribute to find the anchor attribute 'href' (<a href="https://some-website.com"</a>)
    if (anchor.hasAttribute('href')) {
      let href = anchor.getAttribute('href')

      // Resolve and Parse URLs
      try {
        // new URL object in-case the intermediary href is only a relative path (calling .href after to get full URL)
        let url = new URL(href, baseURL)
        // ensure the protocol is HTTP or HTTPS
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          continue
        }
        // remove pesky fragment identifiers (ie: https://samgabel.com/#a-heading-from-a-post)
        if (url.hash !== '') {
          continue
        }
        urls.push(url.href)
        // if the baseURL parameter is empty or flawed then we will catch the error thrown by the `URL` constructor
      } catch (err) {
        console.log(`${err.message}: ${href}`)
      }
    }
  }

  return urls
}


async function fetchHTML(currentURL) {
  // Fetching the Response object
  let response
  try {
    response = await fetch(currentURL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/html'
      }
    })
  } catch (err) {
    throw new Error(`Got Network error: ${err.message}`)
  }

  // Seeing if the Response is valid
  if (response.status >= 399) {
    throw new Error(`Server Error Status: ${response.status} ${response.statusText}`)
  }

  // Seeing if the Response headers 'Content-Type' is 'text/html'
  if (!response.headers.get('Content-Type').includes('text/html')) {
    throw new Error(`Server Response Content-Type is not 'text/html`)
  }

  return response.text()
}


async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  // Make sure the currentURL is on the same domain as the baseURL (also serves as our base case)
  if (new URL(currentURL).hostname !== new URL(baseURL).hostname) {
    return pages
  }

  // Get a normalized version of our URL
  const normURL = normalizeURL(currentURL)

  // Check against our `pages` object (increment or add new) (also serves as a base case)
  if (pages[normURL]) {
    pages[normURL]++
    return pages
  }
  pages[normURL] = 1

  // Grab the HTML document of the currentURL (fetch and parse) (also serves as a base case)
  console.log(`Crawling: ${currentURL}`)
  let stringHTML
  try {
    stringHTML = await fetchHTML(currentURL)
  } catch (err) {
    console.error(err.message)
    return pages
  }

  // Recursively crawl each URL in the array (make sure we `await` each recursive call)
  const urlArr = getURLsFromHTML(stringHTML, baseURL)
  for (const url of urlArr) {
    // we don't technically need to reassign pages to the return because it is a non-primitive type and passed by reference
    await crawlPage(baseURL, url, pages)
  }

  return pages
}



export { normalizeURL, getURLsFromHTML, crawlPage };

