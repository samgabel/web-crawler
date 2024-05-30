import { JSDOM } from 'jsdom'



function normalizeURL(url) {
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
  // creates a new DOM document object
  const returnedDocument = new JSDOM(htmlBody).window.document
  // select all anchor or "a" tags from the document
  const anchors = returnedDocument.querySelectorAll('a')
  const urls = []
  // `anchors` is a `NodeList` which can be iterated over (but is not an array)
  for (const anchor of anchors) {
    // .has and .get Attribute to find the anchor attribute 'href' (<a href="https://some-website.com"</a>)
    if (anchor.hasAttribute('href')) {
      let href = anchor.getAttribute('href')
      // resolve if the HTML document "href" is a relative path -> convert to absolute path
      try {
        // new URL object in-case the intermediary href is only a relative path (calling .href after to get full URL)
        href = new URL(href, baseURL).href
        urls.push(href)
        // if the baseURL parameter is empty or flawed then we will catch the error thrown by the `URL` constructor
      } catch (err) {
        console.log(`${err.message}: ${href}`)
      }
    }
  }
  return urls
}



export { normalizeURL, getURLsFromHTML };

