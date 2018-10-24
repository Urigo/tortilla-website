const FeaturedTutorial = require('./FeaturedTutorial')

const width = 600
const height = 315
const margin = 20

// baseUrl might change depending on the environment. During SSR we will need to
// provide the static dir path. This method is currently only compatible with Node.JS,
// but with few tweaks can be called on the client with ease.
FeaturedTutorial.prototype.load = function (baseUrl = '') {
  const { createCanvas, Image } = require('canvas')
  const fs = require('fs')
  const svg2png = require('svg2png')

  return this.loading = this.loading || (async () => {
    const image = new Image()

    const imageBuffer = await new Promise((resolve, reject) => {
      fs.readFile(`${baseUrl}${this.imageSrc}`, (err, buffer) => {
        if (err) {
          reject(err)
        }
        else {
          svg2png(buffer).then(resolve).catch(reject)
        }
      })
    })

    const imageLoading = new Promise((resolve, reject) => {
      image.onload = resolve
      image.onerror = reject
    })

    // If this fails it means that the SVG didn't have explicit dimensions
    image.src = imageBuffer

    await imageLoading

    {
      const imageRatio = image.width / image.height
      const imageCandiWidth = Math.min(image.width, width - margin)
      const imageCandiHeight = Math.min(image.height, height - margin)
      const candiRatio = imageCandiWidth / imageCandiHeight

      // Wider than it should be
      if (candiRatio > imageRatio) {
        image.width *= imageRatio / candiRatio
        image.height = imageCandiHeight
      }
      // Longer than it should be
      else if (candiRatio < imageRatio) {
        image.height *= imageRatio / candiRatio
        image.width = imageCandiWidth
      }
    }

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // Draw background
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = `rgb(${this.backgroundColor.toString()})`
    ctx.fill()

    // Draw image in middle
    ctx.translate(width / 2 - image.width / 2, height / 2 - image.height / 2)
    ctx.drawImage(image, 0, 0)

    this.imageUrl = canvas.toDataURL('image/png')
  })()
}
