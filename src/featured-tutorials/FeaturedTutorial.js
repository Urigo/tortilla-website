class FeaturedTutorial {
  constructor(props) {
    Object.assign(this, {
      title: props.title,
      description: props.description,
      imageSrc: props.imageSrc,
      backgroundColor: props.backgroundColor,
    })
  }
}

module.exports = FeaturedTutorial
