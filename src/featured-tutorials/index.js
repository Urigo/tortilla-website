const FeaturedTutorial = require('./FeaturedTutorial')

const featuredMap = {
  'srtucker22/chatty/master': {
    title: 'A chat app with React Native',
    description:
      'Chat clone using React Native, GraphQL, Apollo, SQL and Sequelize',
    imageSrc: '/img/love.svg',
    backgroundColor: [133, 133, 255],
  },
  'Urigo/whatsapp-textrepo-angularcli-express/master': {
    title: 'An Angular based Whatsapp clone',
    description: 'Using Angular, GraphQL, Apollo, PostgreSQL and TypeORM',
    imageSrc: '/img/whatsapp-angular.svg',
    backgroundColor: [39, 224, 192],
  },
  'Urigo/WhatsApp-Clone-Tutorial/master': {
    title: 'A React based Whatsapp clone',
    description: 'Using React, GraphQL, Apollo, PostgreSQL and TypeORM',
    imageSrc: '/img/whatsapp-react.svg',
    backgroundColor: [39, 224, 192],
  },
  'DAB0mB/node-distance-addon/master': {
    title: 'Building a native Node.JS addon',
    description:
      'Native NodeJS add-on creation tutorial using C++ for improved performance',
    imageSrc: '/img/destination.svg',
    backgroundColor: [255, 210, 4],
  },
  'DAB0mB/radial-snake/master': {
    title: 'A Tron-style snake game',
    description: 'How to implement a game engine in JS and build a style game',
    imageSrc: '/img/snake-1.svg',
    backgroundColor: [255, 89, 109],
  },
}

// Will help reset metadata
Object.defineProperty(featuredMap, 'default', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: {
    title: 'Full JavaScript tutorials for free',
    description:
      'The best JavaScript tutorial-base in the world for absolutely FREE',
    imageSrc: '/Logo/logo.svg',
    backgroundColor: [255, 255, 255],
  },
})

module.exports = Object.getOwnPropertyNames(featuredMap).reduce(
  (wrappedFeaturedMap, name) => {
    const descriptor = Object.getOwnPropertyDescriptor(featuredMap, name)
    descriptor.value = new FeaturedTutorial(descriptor.value)
    Object.defineProperty(wrappedFeaturedMap, name, descriptor)

    return wrappedFeaturedMap
  },
  {}
)
