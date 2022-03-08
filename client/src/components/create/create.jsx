import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, getPokemons, getTypes } from '../../redux/actions';
import NavBar from '../navBar/narBar';
import Loader from "../img/Loader2.gif";
import './create.css'


function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pokemons,types} = useSelector((state) => state);
  const [errors, setErrors] = useState({});
  
    useEffect(() => {
      dispatch(getTypes());
      dispatch(getPokemons());
    }, [dispatch]);
  
    const [input, setInput] = useState({
      name: "",
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
      img: "",
    });

    const resetInput = () => {
      setInput({
        name: "",
        image: "",
        hp: "0",
        attack: "0",
        defense: "0",
        speed: "0",
        height: "0",
        weight: "0",
        types: [],
      });
    };
  
    const validate = (input) => {
      const error = {};
      const validName = /^[a-zA-ZñÑ]+$/i;
      const validNum = /^\d+$/;
      const validUrl = /^(ftp|http|https):\/\/[^ "]+\.\S+$/;
    
      if (!input.name) error.name = "Name is required.";
      else if (!validName.test(input.name))
        error.name = "Name can only contain letters.";
      else if (input.name.length < 4)
        error.name = "Name must have a minimum length of 4.";
      else if (!validUrl.test(input.image) && input.image)
        error.image = "Image field must have a valid URL or be empty.";
      else if (
        !validNum.test(input.hp) ||
        parseInt(input.hp) < 5 ||
        parseInt(input.hp) > 255
      )
        error.hp = "HP must be a number between 5 and 255.";
      else if (
        !validNum.test(input.attack) ||
        parseInt(input.attack) < 5 ||
        parseInt(input.attack) > 190
      )
        error.attack = "Attack must be a number between 5 and 190.";
      else if (
        !validNum.test(input.defense) ||
        parseInt(input.defense) < 5 ||
        parseInt(input.defense) > 250
      )
        error.defense = "Defense must be a number between 5 and 250.";
      else if (
        !validNum.test(input.speed) ||
        parseInt(input.speed) < 5 ||
        parseInt(input.speed) > 200
      )
        error.speed = "Speed must be a number between 5 and 200.";
      else if (
        !validNum.test(input.height) ||
        parseInt(input.height) < 5 ||
        parseInt(input.height) > 1000
      )
        error.height = "Height must be a number between 5 and 1000.";
      else if (
        !validNum.test(input.weight) ||
        parseInt(input.weight) < 5 ||
        parseInt(input.weight) > 10000
      )
        error.weight = "Weight must be a number between 5 and 10000."
      return error;
    };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      pokemons.some((e) => e.name.toLowerCase() === input.name.toLowerCase())
    ) {
      alert("That name already exists!");
    } else if (!Object.keys(errors).length && input.name.length) {
      dispatch(addPokemon(input));
      resetInput();
      alert("Pokémon created succesfully!");
      navigate("/home");
    } else alert("Please, check the form!");
  };


  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    if (input.types.length < 2) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
      e.target.value = "Select type";
    } else {
      alert("More than 2 types are not allowed");
    }
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== e),
    });
  };

    return (
      <>
        <NavBar />
        {pokemons.length === 0 ? (
          <img
            className={'oader'}
            src={Loader}
            alt="Loading..."
            width="300px"
            height="300px"
          />
        ) : (
<div className={'form'}>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h2 className={'title'}>Create a Pokémon!</h2>
            <div>
              <div>
                <label htmlFor="name">Name: </label>
                <input
              type="text"
              value={input.name}
              name="name"
              id="name"
                      onChange={(e) => {
                        handleChange(e)
                      }}
                  placeholder=" Name..."
                  className={'fields'}
                />
                <p>{errors.name}</p>
                <label htmlFor="image">Image: </label>
            <input
              type="text"
              value={input.image}
              name="image"
              id="image"
                      onChange={(e) => {
                        handleChange(e)
                      }}
              placeholder=" Url Optional..."
              className={'fields'}
            />
                <p> </p>
                <label htmlFor="hp">HP:</label>
            <input
              type="range"
              value={input.hp}
              name="hp"
              id="hp"
              min="0"
              max="255"
              step="1"
              onChange={(e) => {
                handleChange(e)
              }}
              placeholder=" HP..."
              className={'fields'}
          />
                {input.hp}
              <p>{errors.hp}</p>
        <label htmlFor="attack">Attack:</label>
            <input
              type="range"
              value={input.attack}
              name="attack"
              id="attack"
              min="0"
              max="190"
              step="1"
              onChange={(e) => {
                handleChange(e)
              }}
              placeholder=" Attack..."
              className={'fields'}
            />
                {input.attack}
                <p>{errors.attack}</p>
                <label htmlFor="defense">Defense:</label>
            <input
              type="range"
              value={input.defense}
              name="defense"
              id="defense"
              min="0"
              max="250"
              step="1"
              onChange={(e) => {
                handleChange(e)
              }}
              placeholder=" Defense..."
              className={'fields'}
            />
                {input.defense}
                <p>{errors.defense}</p>
              </div>
                  <div>
                    
                  <label htmlFor="speed">Speed:</label>
            <input
              type="range"
              value={input.speed}
              name="speed"
              id="speed"
              min="0"
              max="200"
              step="1"
              onChange={(e) => {
                handleChange(e)
              }}
              placeholder=" Speed..."
              className={'fields'}
            />
            {input.speed}
            <p>{errors.speed}</p>
                    
            <label htmlFor="height">Height:</label>
            <input
              type="range"
              value={input.height}
              name="height"
              id="height"
              min="0"
              max="1000"
              step="1"
              onChange={(e) => {
                handleChange(e)
              }}
              placeholder=" Height..."
              className={'fields'}
            />
          {input.height}
          <p>{errors.height}</p>
          <label htmlFor="weight">Weight:</label>
            <input
              type="range"
              value={input.weight}
              name="weight"
              id="weight"
              min="0"
              max="1000"
              step="1"
              onChange={(e) => {
                handleChange(e)
              }}
              placeholder=" Weight..."
              className={'fields'}
            />
                 {input.weight}
                <p>{errors.weight}</p>
              </div>
            </div>
            <div>
              <select
                onChange={(e) => {
                  handleSelect(e);
                }}
                className={'selector'}
              >
                <option>Select type</option>
                {types?.map((e) => {
                  return (
                    <option key={e.name} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              <p>{errors.types}</p>
              {
                input.types.map((e) => {
                  return (
                    <div key={e}>
                      <span>{e} </span>
                      {""}
                      <button
                        onClick={() => {
                          handleDelete(e);
                        }}
                        className={"btn"}
                      >
                        {""}x{""}
                      </button>
                    </div>
                  );
                }) //para poder ver que fui seleccionando
              }
            </div>
            <button type="submit" className={"btn"}>
              Create
            </button>
          </form>
        </div>
      )}
    </>
  );
}
export default Create;