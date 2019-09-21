module.exports = `
  type Query {
    getPokemon(pokemonName: String): [Pokemon]
    getImages: [Image]
  }

  type Mutation {
    saveAnnotation(annotation: AnnotationInput): Boolean
  }

  type Image {
    id: ID
    url: String
    type: String
    height: Int
    width: Int
    annotations: [Annotation]
    annotationCategories: [String]
  }

  input AnnotationInput {
    pokemon_id: String 

    name: String
    stroke: String
    key: String
    
    x1y1: Int
    x1y2: Int
    x2y1: Int
    x2y2: Int
  }

  type Annotation {
    id: ID
    pokemon: Pokemon

    name: String
    stroke: String
    key: String
    
    x1y1: Int
    x1y2: Int
    x2y1: Int
    x2y2: Int
  }

  input PokemonInput {
    pokemon_id: String
    name: String
    sprite: String
  }

  type Pokemon {
    id: ID
    pokemon_id: String
    name: String
    sprite: String
  }
`;

