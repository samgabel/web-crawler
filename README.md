# Web Crawler




## Overview

This is a Web Crawler meant to test my knowledge of HTTP and web servers. This program will only crawl internal links so it should be used with that in mind. Another thing to note is that the performance will degrade for websites with 100+ pages since the fetching happens in a synchronous manner (I plan to updated this to allow for concurrency of fetching in the future). I think an application that would be useful for this web crawler is to deploy this to a remote server to run against a certain website(s) that I want to watch for updates. We could have cron run this every so often and set up alerts.

![showcase](https://github.com/samgabel/web-crawler/blob/main/showcase.png?raw=true)



## Usage

1. Clone this repo to your client machine
2. Run `npm run start https://<a domain you want to test against>`
