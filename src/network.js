import axios from "axios";

async function getPokemonsForPage(page) {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${page *
      20}&limit=20`;
    const response = await axios.get(url);
    return {
      numberOfPages: Math.floor(response.data.count / 20),
      pokemons: response.data.results,
      page: page
    };
  } catch (e) {
    return {
      error: e
    };
  }
}

async function getMachinesforPage(page) {
  try {
    const url = `https://pokeapi.co/api/v2/machine?offset=${page *
      20}&limit=20`;
    const response = await axios.get(url);
    return {
      numberOfPages: Math.floor(response.data.count / 20),
      machines: response.data.results,
      page: page
    };
  } catch (e) {
    return {
      error: e
    };
  }
}

async function getBerriesForPage(page) {
  try {
    const url = `https://pokeapi.co/api/v2/berry?offset=${page * 20}&limit=20`;
    const response = await axios.get(url);
    return {
      numberOfPages: Math.floor(response.data.count / 20),
      berries: response.data.results,
      page: page
    };
  } catch (e) {
    return {
      error: e
    };
  }
}

async function getPokemonWithID(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const response = await axios.get(url);
    const { data } = response;
    if (response.status >= 200 && response.status < 300) {
      return {
        Abilities:
          data["abilities"] &&
          Array.isArray(data["abilities"]) &&
          data["abilities"].reduce((acc, currValue) => {
            console.log(acc);
            if (
              acc["ability"] &&
              acc["ability"]["name"] &&
              currValue["ability"] &&
              currValue["ability"]["name"]
            ) {
              return `${acc["ability"]["name"]} ${
                currValue["ability"]["name"]
              }`;
            } else {
              return acc;
            }
          }),
        "Base Experience": data["base_experience"],
        image: data["sprites"] && data["sprites"]["front_default"],
        name: data["name"],
        Height: data["height"],
        Weight: data["weight"]
      };
    } else {
      return { error: "Error in getting Pokemon" };
    }
  } catch (e) {
    return { error: "Error in getting Pokemon" };
  }
}

async function getBerryWithID(id) {
  const url = `https://pokeapi.co/api/v2/berry/${id}`;
  try {
    const response = await axios.get(url);
    const { data } = response;
    if (response.status >= 200 && response.status < 300) {
      return {
        Item: data["item"] && data["item"]["name"],
        "Growth Time": data["growth_time"],
        "Max Harvest": data["max_harvest"],
        name: data["name"],
        "Natural Gift Power": data["natural_gift_power"],
        Size: data["size"],
        Smoothness: data["smoothness"],
        "Soil Dryness": data["soil_dryness"]
      };
    } else {
      return { error: "Error in getting Berry" };
    }
  } catch (e) {
    return { error: "Error in getting Berry" };
  }
}

async function getMachineWithID(id) {
  const url = `https://pokeapi.co/api/v2/machine/${id}`;
  try {
    const response = await axios.get(url);
    const { data } = response;
    if (response.status >= 200 && response.status < 300) {
      return {
        Item: data["item"] && data["item"]["name"],
        Move: data["move"] && data["move"]["name"],
        VersionGroup: data["version_group"] && data["version_group"]["name"]
      };
    } else {
      return { error: "Error in getting Berry" };
    }
  } catch (e) {
    return { error: "Error in getting Berry" };
  }
}
export {
  getPokemonsForPage,
  getPokemonWithID,
  getBerriesForPage,
  getBerryWithID,
  getMachinesforPage,
  getMachineWithID
};
