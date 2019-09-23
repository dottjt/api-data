// signup(email: String!, password: String!): AuthPayload
// login(email: String!, password: String!): AuthPayload

// loginUser(email: String!, password: String!): AuthPayload
// logoutUser(): AuthPayload

// createUser(email: String!, password: String!): AuthPayload

// verifyUser(): AuthPayload
// resetPasswordUser(): AuthPayload

module.exports = `
  type Query {
    getPokemon(pokemonName: String): [Pokemon]
    getImages: [Image]
  }

  type Mutation {
    saveAnnotation(annotationInput: AnnotationInput): Boolean
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    display_name: String!
    email: String!
    password: String!
    providers: [Provider]
    admin: Boolean
  }

  type Provider {
    provider: String
    user: String
    id: ID
  }

  type Provider {
    provider: String
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
    image_id: ID
    pokemon_id: ID
    user_id: ID

    name: String
    stroke: String
    key: String

    x: Int
    y: Int
    width: Int
    height: Int
  }

  type Annotation {
    id: ID
    user: User
    image: Image
    pokemon: Pokemon

    name: String
    stroke: String
    key: String

    x: Int
    y: Int
    width: Int
    height: Int
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

// x1y1: Int
// x1y2: Int
// x2y1: Int
// x2y2: Int
