import axios from 'axios';
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_NAMES = "GET_NAMES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMONS = "POST_POKEMONS";
export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_CREATION = "FILTER_CREATION";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const DELETE_POKEMON = "DELETE_POKEMON";



export function getPokemons() {
    return async function (dispatch) {
        try {
            const url = await axios.get('http://localhost:3001/pokemons');
            //console.log('arepita', url)
            return dispatch({
                type: GET_POKEMONS,
                payload: url.data,
                loading: false,

            });
        } catch (error) {
            console.log(error);
            return error;
        }
    };
};

export const getNames = (name) => {
    return async (dispatch) => {
      try {
        const json = await axios(`http://localhost:3001/pokemons?name=${name}`);
        return dispatch({ type: GET_NAMES, payload: json.data });
      } catch (error) {
        alert("Pokemon Not Found");
      }
    };
  };
  
  export const getPokemonId = (id) => {
    return async (dispatch) => {
      try {
        const json = await axios.get(`http://localhost:3001/pokemons/${id}`);
        console.log("action id", json.data);
        return dispatch({ type: GET_DETAILS, payload: json.data });
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  export const getTypes = () => {
    return async (dispatch) => {
      try {
        const json = await axios.get("http://localhost:3001/types");
        return dispatch({ type: GET_TYPES, payload: json.data });
      } catch (error) {
        console.log(error);
      }
    };
  };
 export const addPokemon = (payload) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/pokemons",
          payload
        );
        return dispatch({ type: POST_POKEMONS, payload: response });
      } catch (error) {
        console.log(error);
      }
    };
  }; 
  
 export const deletePokemon = (id) => {
    return async (dispatch)=> {
      try {
        const poke = await axios.delete(`http://localhost:3001/pokemons/delete/${id}`)
        return dispatch({
          type: DELETE_POKEMON,
          payload:poke.data
        });
      } catch (error) {
        console.log(error);
      }
    };
  }; 
  
  export const cleanDetail = () => {
    return {
      type: GET_DETAILS,
      payload: [],
    };
  };
  
  export const filterByType = (payload) => {
    return {
      type: FILTER_TYPES,
      payload,
    };
  };
  
  export const filterByCreation = (payload) => {
    return { type: FILTER_CREATION, payload };
  };
  
  export const orderByName = (payload) => ({
    type: ORDER_BY_NAME,
    payload,
  });
  
  export const orderByAttack = (payload) => ({
    type: ORDER_BY_ATTACK,
    payload,
  });
  