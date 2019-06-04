// https://offbyone.tech/lighthouse-circleci
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const { createServer } = require('http-server')

jest.setTimeout(60000)

const launchChromeAndRunLighthouse = (
  url,
  opts = { chromeFlags: [] },
  config = null
) =>
  chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
    opts.port = chrome.port
    return lighthouse(url, opts, config).then(results =>
      chrome.kill().then(() => results)
    )
  })

let server

beforeEach(async () => {
  server = createServer()
  server.listen()

  // https://github.com/flatiron/union/blob/master/test/simple-test.js#L28
  await new Promise((resolve) => {
    server.server.stdout.on('data', resolve)
  })
})

afterEach(async () => {
  server.close()
})

test('Meaningful first paint score', async () => {
  const { audits } = await launchChromeAndRunLighthouse('http://localhost:8080')

  expect(audits['first-meaningful-paint'].score).toBeGreaterThanOrEqual(50)
})
