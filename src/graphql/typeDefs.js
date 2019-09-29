const typeDefs = `
  type Query {
    getCurrentUser: User
    
    doesPokemonExist(searchText: String): Boolean
    getPokemon(pokemonName: String): [Pokemon]

    getImages: [Image]
    getNewImage(image_id: String): Image
    getGallerySearch(searchText: String, filterQuery: FilterQuery): [Image]
  }

  type Mutation {
    saveAnnotation(inputAnnotations: [AnnotationInput]): Boolean
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    display_name: String!
    email: String!
    avatar: String
    providers: [Provider]
    admin: Boolean
  }

  type Provider {
    provider: String
    user_id: ID
    id: ID
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
    pokemon_id: ID
    human_id: ID
    image_id: ID
    user_id: ID

    name: String
    type: String
    stroke: String
    key: String

    coordinates: [CoordinateInput]
  }

  input CoordinateInput {
    x: Float
    y: Float
  }

  type Annotation {
    id: ID
    user: User
    image: Image
    pokemon: Pokemon

    name: String
    stroke: String
    key: String

    coordinates: [Coordinate]
  }

  type Coordinate {
    x: Float
    y: Float
  }

  type Human {
    id: ID
    human_id: String
    name: String
    sprite: String
  }

  type Pokemon {
    id: ID
    pokemon_id: String
    name: String
    sprite: String
  }

  input FilterQuery {
    sort: String
  }
`;

module.exports = typeDefs;

// x1y1: Int
// x1y2: Int
// x2y1: Int
// x2y2: Int

// signup(email: String!, password: String!): AuthPayload
// login(email: String!, password: String!): AuthPayload

// loginUser(email: String!, password: String!): AuthPayload
// logoutUser(): AuthPayload

// createUser(email: String!, password: String!): AuthPayload

// verifyUser(): AuthPayload
// resetPasswordUser(): AuthPayload


// x: Int
// y: Int
// width: Int
// height: Int
