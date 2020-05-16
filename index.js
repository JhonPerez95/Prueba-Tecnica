var getApi = {
  method: 'GET',
  mode: 'cors',
  cache: 'default',
};

const UrlApi = 'http://swapi.dev/api';

fetch(`${UrlApi}/films`, getApi)
  .then((res) => res.json())
  .then(async (data) => {
    const films = data.results;
    for (let i = 0; i < films.length; i++) {
      const filmData = {
        Nombre: films[i].title,
        Planetas: await infoPlanets(films[i].planets),
        Actores: await infoActores(films[i].characters),
      };

      console.log(filmData);
    }
  })
  .catch((err) => console.log(err));

async function infoPlanets(planets) {
  dataPlanet = [];

  for (let i = 0; i < planets.length; i++) {
    const res = await fetch(planets[i]);
    let data = await res.json();
    const planet = {
      Nombre: data.name,
      Terreno: data.terrain,
      Gravedad: data.gravity,
      Diametro: data.diameter,
      Poblacion: data.population,
    };
    dataPlanet.push(planet);
  }

  return dataPlanet;
}

async function infoActores(characters) {
  dataCharacters = [];

  for (let i = 0; i < characters.length; i++) {
    const res = await fetch(characters[i]);
    let data = await res.json();
    const character = {
      Nombre: data.name,
      Genero: data.gender,
      'Color Cabello': data.hair_color,
      'Color Piel': data.skin_color,
      Altura: data.height,
      Planeta: data.homeworld,
    };
    dataCharacters.push(character);
  }

  return dataCharacters;
}
