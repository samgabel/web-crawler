export { normalizeURL };



function normalizeURL(url) {
  const urlObj = new URL(url)
  let fullpath = `${urlObj.hostname}${urlObj.pathname}`
  // remove the trailing '/' if present in the path
  if (fullpath.charAt(fullpath.length - 1) === '/') {
    fullpath = fullpath.slice(0, -1)
  }
  return fullpath
}
