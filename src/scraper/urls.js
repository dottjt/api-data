const axios = require('axios');
const cheerio = require('cheerio');

const undecidedUrls = [
  'https://www.reddit.com/r/PokemonTCG/',
  'https://www.reddit.com/r/pkmntcgcollections/',
];

const redditUrls = [
  'https://www.reddit.com/r/pokememes/',
  'https://www.reddit.com/r/Pokemonart/',
  'https://www.reddit.com/r/pokemoe/',
  'https://11ww.reddit.com/r/PokemonGoMystic/',
  'https://www.reddit.com/r/ShinyPokemon/',
  'https://www.reddit.com/r/PokemonLetsGo/',
  'https://www.reddit.com/r/PokemonSwordAndShield/',
];

// https://www.pinterest.com.au/katwomanjulie/pokemon-pictures/

module.exports = {
  redditUrls,
};
