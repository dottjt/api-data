require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga');
const { setupGoogleStrategy, setupDiscordStrategy } = require('./passport');

const { passport, cookieParser, jwtParser, handleJwtError } = require('./middleware');
const { typeDefs, resolvers, context } = './serverOptions';
const authRoutes = './router/auth';

const server = new GraphQLServer({ typeDefs, resolvers, context });

server.express.use(passport.initialize());
server.express.use(passport.session());

server.app.use(cookieParser());
server.app.use('/graphql', jwtParser, handleJwtError);

server.app.use('/auth', authRoutes);

setupGoogleStrategy();
setupDiscordStrategy();

const options = {
  port: 5001,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  cors: {
    credentials: true,
    preflightContinue: true,
    origin: ["https://pokeml.com", "https://api.pokeml.com", "http://localhost:3000", "http://localhost:4000"] // your frontend url.
  }
};

server.start(options, () => console.log('Server is running on localhost:5001'));
