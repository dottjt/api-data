# ReadeUses

graphql graphql-tag graphql-yoga knex pg pm2 require-graphql-file dotenv

passport passport-facebook-token passport-google-token jsonwebtoken

passport-google-oauth20 passport-discord cookie-parser express-jwt


// reddit-pokeml bucket id 2cf9e1356fe464b063d40d1a

<!-- A great example. -->
git clone https://github.com/antoniojps/graphql-authentication.git



http://abashev.com/articles/oauth2-refresh-tokens-in-passport-js/
passport-oauth2-refresh

// migrate
knex migrate:latest

// run seed
knex seed:run

[![CircleCI](https://circleci.com/gh/PokeAPI/api-data.svg?style=shield)](https://circleci.com/gh/PokeAPI/api-data)

# PokeAPI Data

This repository contains:

 - [data/api](data/api): a static copy of the JSON data generated with the above script
 - [data/schema](data/schema): a static copy of the PokeAPI schema generated from the above data
 - [updater](updater): a [Ditto][1] based bot that runs in docker and can update the data stored in this repo

# Usage

If you'd like to use the JSON for your own purposes, you can apply your own base URL using [Ditto][1]:

```
ditto transform --base-url='https://pokeapi.co'
```

# Updater Bot

You can manually update the data if necessary. See [the updater bot](updater).
You can run the bot in docker, or read and adapt its update script yourself.


[1]: https://github.com/pokeapi/ditto
