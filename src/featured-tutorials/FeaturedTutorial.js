class FeaturedTutorial {
  constructor(props) {
    Object.assign(this, {
      title: props.title,
      description: props.description,
      imageSrc: props.imageSrc,
      backgroundColor: props.backgroundColor,
    })

    this.imageUrl =
      this.imageSrc &&
      this.imageSrc
        .split('.')
        .slice(0, -1)
        .concat(['cover', 'png'])
        .join('.')
  }
}

module.exports = FeaturedTutorial
