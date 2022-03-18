const axios = require("axios");
const express = require("express");
const { Pokemon, Type } = require("../db");
const urlQ = `http://pokeapi.co/api/v2/pokemon/`;

const router = express.Router();

// TRAERME SOLO 40 POKES
const getPokemonsApi = async () => {
  try {
    const pokeApi = await axios.get(urlQ);
    const next = await axios.get(pokeApi.data.next);
    const arr40 = pokeApi.data.results.concat(next.data.results).slice(0, 40);
    const info40 = arr40.map(async (d) => await axios.get(d.url));
    let poke40 = await Promise.all(info40).then((promise) => {
      let pokeData = promise.map((e) => e.data);
      let pokemons = pokeData.map((p) => ({
        id: p.id,
        name: p.name,
        attack: p.stats[1].base_stat,
        hp: p.stats[0].base_stat,
        defense: p.stats[2].base_stat,
        speed: p.stats[5].base_stat,
        height: p.height,
        weight: p.weight,
        types: p.types.map((t) => t.type.name),
        img: p.sprites.other.home.front_default,
        
      }));
      return pokemons;
    });
    return poke40;
  } catch (error) {
    console.log(error);
  }
};



// POKE DB
const getPokemonsDb = async () => {
  try {
    const pokeDb = await Pokemon.findAll({
      //Busco todos los pokemon de los modelos
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const findPoke = pokeDb.map((e) => ({
      id: e.id,
      name: e.name,
      attack: e.attack,
      types: e.types.map((t) => t.name),
      img: e.img,
      createdByUser: e.createdByUser,
    }));
    return findPoke;
  } catch (error) {
    console.log(error);
  }
};

//QUERY `http://pokeapi.co/api/v2/pokemon/`
const getApiName = async (name) => {
  try {
    const apiName = await axios.get(`${urlQ}${name}`);
    const names = await apiName.data;
    return [
      {
        id: names.id,
        name: names.name,
        attack: names.stats[1].base_stat,
        height: names.height,
        weight: names.weight,
        types: names.types.map((t) => t.type.name),
        img: names.sprites.other.home.front_default,
      },
    ];
  } catch (error) {
    console.log(error);
  }
};






//QUERY DB
const getPokemonsName = async (name) => {
  try {
    const dbNames = await Pokemon.findAll({
      where: { name: name },
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const filtroName = dbNames.map((n) => {
      return {
        id: n.id,
        name: n.name,
        types: n.types.map((t) => t.name),
        img: n.img,
        attack: n.attack,
        height: n.height,
        weight: n.weight,
        createdByUser: n.createdByUser,
      };
    });
    return filtroName;
  } catch (error) {
    console.log(error);
  }
};

//RUTA POR QUERY
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const lowerName = name.toLocaleLowerCase();
      const apiPokeQ = await getApiName(lowerName);
      if (!apiPokeQ) {
        const dbPokeQ = await getPokemonsName(lowerName);
        if (!dbPokeQ) {
          console.log(dbPokeQ);
          res.status(404).json({ error: "Pokemon not found" });
        } else res.json(dbPokeQ);
      } else res.json(apiPokeQ);
    } else {
      //union db -api
      const apiP = await getPokemonsApi();
      const dataB = await getPokemonsDb();
      const pokeAll = apiP.concat(dataB);
      if (dataB.length > 0) {
        res.json(pokeAll);
      } else res.json(apiP);
    }
  } catch (error) {
    console.log(error);
  }
});








// ID API `http://pokeapi.co/api/v2/pokemon/`
const getIdApi = async (id) => {
  try {
    const apiId = await axios.get(`${urlQ}${id}`);
    const IdDetails = apiId.data;
    return {
      id: IdDetails.id,
      name: IdDetails.name,
      hp: IdDetails.stats[0].base_stat,
      attack: IdDetails.stats[1].base_stat,
      defense: IdDetails.stats[2].base_stat,
      speed: IdDetails.stats[5].base_stat,
      height: IdDetails.height,
      weight: IdDetails.weight,
      type: IdDetails.types.map((t) => t.type.name),
      img: IdDetails.sprites.other.home.front_default,
    };
  } catch (error) {
    console.log(error);
  }
};






//ID-DB
const getIdDb = async (id) => {
  try {
    const findIdDb = await Pokemon.findByPk(id, {
      include: Type,
    });
    return {
      id: findIdDb.id,
      hp: findIdDb.hp,
      name: findIdDb.name,
      attack: findIdDb.attack,
      defense: findIdDb.defense,
      speed: findIdDb.speed,
      height: findIdDb.height,
      weight: findIdDb.weight,
      type: findIdDb.types.map((t) => t.name),
      img: findIdDb.img,
      createdByUser: findIdDb.createdByUser,
    };
  } catch (error) {
    console.log(error);
  }
};

// ID API DB
const allPokeByID = async (id) => {
  try {
    if (id.includes("-")) {
      const dbIdInfo = await getIdDb(id);
      return dbIdInfo;
    } else {
      const apiInfo = await getIdApi(id);
      return apiInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

//RUTA ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fromApi = await allPokeByID(id);
    if (fromApi) {
      return res.send(fromApi);
    } else {
      return res.status(404).json({ msg: "Poke Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
});

//POST
router.post("/", async (req, res) => {
  try {
    const {
      name,
      hp,
      img,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      createdByUser,
    } = req.body;
    const newPokemon = await Pokemon.create({
      name,
      hp,
      img:
        img || "http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG10.png",
      attack,
      defense,
      speed,
      height,
      weight,
      createdByUser,
    });
    const typePokemon = await Type.findAll({
      where: { name: types },
    });

    newPokemon.addType(typePokemon);
    return res.send(newPokemon);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Pokemon.destroy({
        where: { id: id },
      });
    }
    return res.send({ msg: "Pokemon deleted" });
  } catch (error) {
    console.log(error);
  }
});









module.exports = router;
