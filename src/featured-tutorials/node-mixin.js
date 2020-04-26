const { createCanvas, Image } = require('canvas')
const fs = require('fs')
const svg2png = require('svg2png')

const FeaturedTutorial = require('./FeaturedTutorial')

const width = 600
const height = 315
const imageSize = 80

// baseUrl might change depending on the environment. During SSR we will need to
// provide the static dir path. This method is currently only compatible with Node.JS,
// but with few tweaks can be called on the client with ease.
FeaturedTutorial.prototype.load = function (baseUrl = '') {
  return (this.loading =
    this.loading ||
    (async () => {
      const image = new Image()

      const imageBuffer = await new Promise((resolve, reject) => {
        fs.readFile(`${baseUrl}${this.imageSrc}`, (err, buffer) => {
          if (err) {
            reject(err)
          } else {
            svg2png(buffer, { height: imageSize }).then(resolve).catch(reject)
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

      const canvas = createCanvas(width, height)
      const ctx = canvas.getContext('2d')
      const scale = imageSize / image.height

      // Draw background
      ctx.beginPath()
      ctx.rect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = `rgb(${this.backgroundColor.toString()})`
      ctx.fill()

      // Draw image in middle
      ctx.translate(width / 2 - image.width / 2, height / 2 - image.height / 2)
      ctx.drawImage(image, 0, 0)

      // Stream canvas contents into a file that can be served from the public dir
      const coverImageFullPath = `${baseUrl}${this.imageUrl}`
      const coverImageWS = fs.createWriteStream(coverImageFullPath)

      await new Promise((resolve, reject) => {
        coverImageWS.on('error', reject)
        coverImageWS.on('finish', resolve)
        canvas.createPNGStream().pipe(coverImageWS)
      })
    })())
}
