const FeaturedTutorial = require('./FeaturedTutorial')

const featuredMap = {
  'chatty': {
    title: 'A chat app with React Native',
    description: 'Chat clone using React Native, GraphQL, Apollo, SQL and Sequelize',
    imageSrc: '/img/love.svg',
    backgroundColor: [133, 133, 255]
  },
  'whatsapp': {
    title: 'An angular based Whatsapp clone',
    description: 'Using Angular, GraphQL, Apollo, PostgreSQL and TypeORM',
    imageSrc: '/img/whatsapp.svg',
    backgroundColor: [39, 224, 192]
  },
  'node-addon': {
    title: 'Building a native Node.JS addon',
    description: 'Native NodeJS add-on creation tutorial using C++ for improved performance',
    imageSrc: '/img/destination.svg',
    backgroundColor: [255, 210, 4]
  },
  'radial-snake': {
    title: 'A Tron-style snake game',
    description: 'How to implement a game engine in JS and build a style game',
    imageSrc: '/img/snake-1.svg',
    backgroundColor: [255, 89, 109]
  },
  // Will help reset metadata
  'default': {
    title: 'tortilla.academy | Full JavaScript tutorials for free',
    description: 'The best JavaScript tutorial-base in the world for absolutely FREE',
    imageSrc: '/Logo/logo.svg',
    backgroundColor: [77, 130, 249],
  }
}

module.exports = Object.keys(featuredMap).reduce((wrappedFeaturedMap, name) => {
  const featured = featuredMap[name]
  const wrappedFeatured = new FeaturedTutorial(featured)
  wrappedFeaturedMap[name] = wrappedFeatured

  return wrappedFeaturedMap
}, {})
