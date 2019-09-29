const fse = require('fs-extra');
const uuidv4 = require('uuid/v4');
const shell = require('shelljs');

const transform = () => {
  try {
    const pokemonFolders = './data/api/v2/pokemon';

    const data = [];
    let seedsString = '';

    shell.ls(pokemonFolders).forEach((pokemonFolder) => {
      if (pokemonFolder === 'index.json') return

      const id = uuidv4();
      const pokemonObjectRaw = fse.readJsonSync(`${pokemonFolders}/${pokemonFolder}/index.json`);
      const pokemonObject = createPokemonJSONObject(pokemonObjectRaw, id);
      const pokemonSeedObject = createPokemonSeedObject(pokemonObjectRaw, id)

      seedsString += pokemonSeedObject;
      data.push(pokemonObject);
    });

    fse.outputFileSync('./seedsData/pokemonData.js', templateModuleExports(seedsString));
    fse.outputJSONSync('./data/new/output.json', data);
  } catch (error) {
    throw new Error('le error ' + error);
  }
};

const templateModuleExports = (seedsString) => `module.exports = [${seedsString}];`;

const createPokemonJSONObject = (pokemonObjectRaw, id) => ({
  id,
  pokemon_id: pokemonObjectRaw.id,
  name: pokemonObjectRaw.name,
  sprite: pokemonObjectRaw.sprites.front_default,
});

const createPokemonSeedObject = (pokemonObjectRaw, id) => (
  `{ id: "${id}", pokemon_id: "${pokemonObjectRaw.id}", name: "${pokemonObjectRaw.name}", sprite: "${pokemonObjectRaw.sprites.front_default}" },`
);

transform();
