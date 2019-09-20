const fse = require('fs-extra');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const shell = require('shelljs');

const transform = () => {
  try {
    const pokemonFolders = './data/api/v2/pokemon';

    const pokemonCollection = [];

    shell.ls(pokemonFolders).forEach((pokemonFolder) => {
      if (pokemonFolder === 'index.json') return
      console.log(pokemonFolder)
      const pokemonObjectRaw = fse.readJsonSync(`${pokemonFolders}/${pokemonFolder}/index.json`);
      const pokemonObject = createPokemonObject(pokemonObjectRaw);

      pokemonCollection.push(pokemonObject);
    });

    const data = pokemonCollection;

    fse.outputJSONSync('data-new/output.json', data);
  } catch (error) {
    throw new Error('le error ' + error);
  }
};

const createPokemonObject = (pokemonObjectRaw) => ({
  id: pokemonObjectRaw.id,
  name: pokemonObjectRaw.name,
  sprite: pokemonObjectRaw.sprites.front_default,
  types: pokemonObjectRaw.types.map(type => ({
    name: type.type.name
  }))
});

transform();
