import {
  GET_POKEMONS,
  GET_NAMES,
  GET_DETAILS,
  GET_TYPES,
  POST_POKEMONS,
  FILTER_TYPES,
  FILTER_CREATION,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  DELETE_POKEMON
} from "../actions";

const initialState = {
    allPokemons: [],
    pokemons: [],
    detail: [],
    types: [],
    isLoading: true,
};
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_POKEMONS:
        return {
          ...state,
          pokemons: action.payload,
          allPokemons: action.payload,
          isLoading: action.loading,
        };
      case GET_NAMES:
        return {
          ...state,
          pokemons: [action.payload],
        };
      case GET_DETAILS:
        console.log("reducer id", action.payload);
        return {
          ...state,
          detail: action.payload,
        };
      case GET_TYPES:
        return {
          ...state,
          types: action.payload,
        };
      case POST_POKEMONS:
        return {
          ...state,
        };
      
      case FILTER_TYPES:
        const allPokemonTypes = state.allPokemons;
        const filtType =
          action.payload === "All"
            ? allPokemonTypes
            : allPokemonTypes.filter((e) => e.types.includes(action.payload));
  
        console.log("type", filtType);
        return {
          ...state,
          pokemons: filtType,
        };
      
      case FILTER_CREATION:
        const allPokemonCreations = state.allPokemons;
        const filtCreation =
          action.payload === "createdByUser"
            ? allPokemonCreations.filter((p) => p.createdByUser) //filtro por atributo de db
            : allPokemonCreations.filter((p) => !p.createdByUser);
        return {
          ...state,
          pokemons: filtCreation,
        };
      case ORDER_BY_NAME:
        const orderNames =
          action.payload === "All"
            ? state.allPokemons
            : action.payload === "asc"
            ? state.pokemons.sort((a, b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
              })
            : state.pokemons.sort((a, b) => {
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
              });
        return {
          ...state,
          pokemons: orderNames,
        };
      case ORDER_BY_ATTACK:
        const orderAttack =
          action.payload === "All"
            ? state.allPokemons
            : action.payload === "max"
            ? state.pokemons.sort((a, b) => {
                return b.attack - a.attack;
              })
            : state.pokemons.sort((a, b) => {
                return a.attack - b.attack;
              });
        return {
          ...state,
          pokemons: orderAttack,
        };
      case DELETE_POKEMON:
        return {
          ...state,
        };
      default:
        return { ...state };
    }
  };
  
  export default rootReducer;
  