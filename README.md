# tortilla-website

[![CircleCI](https://circleci.com/gh/Urigo/tortilla-website.svg?style=svg&circle-token=f7610ce3a32422af6ba8b56ba27d881adc454001)](https://circleci.com/gh/Urigo/tortilla-website)

To run the app (port 8000):

    yarn app

To run lambda service (port 9000):

    yarn lambda

To clean Gatsby's cache:

    yarn clean

Or alternatively you can clean the cache and run the app:

    yarn clean:app

To build:

    yarn build

## How to deploy a new version of the tutorial

1. Open an issue on tortilla-website repo with the title `dump Urigo/WhatsApp-Clone-Tutorial/master`
2. Label the issue with a `tortilla` label
3. A PR will be automatically opened with a new dump file from the release
4. After all checks on the CI has been done, you will get a link to a temporary deployed version of the website
5. Merge the PR and it will deploy it to the main website

