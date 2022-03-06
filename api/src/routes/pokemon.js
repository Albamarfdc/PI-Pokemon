const axios = require('axios');
const express = require('express');
const { Pokemon, Type } = require('../db')
const url40 = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=40`
const urlQ = `http://pokeapi.co/api/v2/pokemon/`

const router = express.Router();

// TRAERME SOLO 40 POKES
const getPokemonsApi = async () => {
    try {
        const pokes = [];
        const { data } = await axios.get(url40)
        for (let i = 0; i < data.results.length; i++) {
            const poke = data.results[i].url

            const all = await axios.get(poke)
            const allPokes = {
                id: all.data.id,
                name: all.data.name,
                img: all.data.sprites.other.home.front_default,
                attack: all.data.stats[1].base_stat,
                types: all.data.types.map((e) => e.type.name),
            };
            pokes.push(allPokes)
        };
        return pokes;
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
            type: e.types.map((t) => t.name),
            img: e.img,
            createdByUser: e.createdByUser,
        }));
        return findPoke;
    } catch (error) {
        console.log(error)
    }
};


//Unión de API, DB 
const allPokemons = async () => {
  try {
    const apiP = await getPokemonsApi();
    const dataB = await getPokemonsDb();
    const pokeAll = apiP.concat(dataB);
    return pokeAll;
} catch (error) {
    console.log(error);
  }
};


//QUERY
const getApiName = async (name) => {
  try {
    const apiName = await axios.get(`${urlQ}${name}`);
      const names =  await apiName.data
          return {
                  id: names.id,
                  name: names.name,
                  types: names.types.map((t) => t.type.name),
                  img: names.sprites.other.home.front_default,
                  attack: names.stats[1].base_stat,
        }
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
        type: n.types.map((t) => t.name),
        img: n.img,
        attack: n.attack,
        createdByUser: n.createdByUser,
      };
    });
    return filtroName;
  } catch (error) {
    console.log(error);
  }
};
/* 
//QUERY API- DB
const allQueryName = async (name) => {
    const apiDataQ = await getApiName(name)
    const dbDataQ = await getPokemonsName(name)
    const allQuery = dbDataQ.concat(apiDataQ);
    return allQuery;
}; */



  //RUTA POR QUERY
  router.get("/", async (req, res) => {
    try {
      const { name } = req.query;
      const totalPokemons = await allPokemons();
      if (!name) return res.send(totalPokemons);
      const apiN = await getApiName(name);
      if (apiN) return res.send(apiN);
      const dbN = await getPokemonsName(name);
      if (dbN) return res.send(dbN);
      return res.status(404).send({ msg: "Pokemon Not Found" });
    } catch (error) {
      console.log(error);
    }
  });


// ID API
const getIdApi = async (id) => {
  try {
    const apiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
      include: Type,});
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
        if (id.includes('-')) {
            const dbIdInfo = await getIdDb(id);
            return dbIdInfo
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
            return res.status(404).json({msg: "Poke Not Found"})
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
        img ||
        "http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG10.png",
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


//DELETE
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Pokemon.destroy({
        where: { id: id },
      });
    }
    return res.send({ msg: 'Pokemon deleted' });
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
