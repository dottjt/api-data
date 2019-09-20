const fse = require('fs-extra');
// const fs = require('fs');
// const uuidv4 = require('uuid/v4');
const shell = require('shelljs');

const transform = () => {
  try {
    const pokemonFolders = './api/v2/pokemon';

    const data = [];
    let seedsString = '';

    shell.ls(pokemonFolders).forEach((pokemonFolder) => {
      if (pokemonFolder === 'index.json') return

      const pokemonObjectRaw = fse.readJsonSync(`${pokemonFolders}/${pokemonFolder}/index.json`);
      const pokemonObject = createPokemonJSONObject(pokemonObjectRaw);
      const pokemonSeedObject = createPokemonSeedObject()

      seedsString += pokemonSeedObject;
      data.push(pokemonObject);
    });

    fse.outputJSONSync('../seedsData/pokemonSeedsData.js', templateModuleExports(seedsString));
    fse.outputJSONSync('new/output.json', data);
  } catch (error) {
    throw new Error('le error ' + error);
  }
};

const templateModuleExports = (seedsString) => `
  module.exports = [
    ${seedsString}
  ];
`;

const createPokemonJSONObject = (pokemonObjectRaw) => ({
  id: pokemonObjectRaw.id,
  name: pokemonObjectRaw.name,
  sprite: pokemonObjectRaw.sprites.front_default,
  // types: pokemonObjectRaw.types.map(type => ({
  //   name: type.type.name
  // }))
});

const createPokemonSeedObject = (pokemonObjectRaw) => (
  `{ id: ${pokemonObjectRaw.id}, name: ${pokemonObjectRaw.name}, sprite: ${pokemonObjectRaw.sprites.front_default} },`
);

transform();
