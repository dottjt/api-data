const uuidv4 = require('uuid/v4');

module.exports = [
  { 
    id: uuidv4(),
    url: 'http://localhost:4000/images/pokemon_image_1.png',
    type: 'na',
    width: 500,
    height: 931,
  },
  { 
    id: uuidv4(),
    url: 'http://localhost:4000/images/pokemon_image_2.png',
    type: 'na',
    width: 430,
    height: 221,
  },
  { 
    id: uuidv4(),
    url: 'http://localhost:4000/images/pokemon_image_3.jpeg',
    type: 'na',
    width: 1200,
    height: 800,
  },
]