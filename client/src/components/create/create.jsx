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
    const types = useSelector((state) => state.types);
    const pokemons = useSelector((state) => state.pokemons);
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      dispatch(getPokemons());
      dispatch(getTypes());
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
  
    let validateName = /^[a-zA-Z\s]+$/;
  
    const validate = (input) => {
      let errors = {};
      if (
        !input.name ||
        !validateName.test(input.name) ||
        input.name.length < 3
      ) {
        errors.name =
          "Special characters or numbers are not allowed";
      }
      if (pokemons.find((p) => p.name === input.name)) {
        errors.name = "This pokemon already exists!";
      }
      if (!input.hp || input.hp < 1) {
        errors.hp = "Must be a number between 1-100";
      }
      if (!input.attack || input.attack < 1) {
        errors.attack = "Must be a number between 1-100";
      }
      if (!input.defense || input.defense < 1) {
        errors.defense = "Must be a number between 1-100";
      }
      if (!input.speed || input.speed < 1) {
        errors.speed = "Must be a number between 1-100";
      }
      if (!input.height || input.height < 1) {
        errors.height = "Must be a number between 1-20";
      }
      if (!input.weight || input.weight < 1) {
        errors.weight = "Must be a number between 1-100";
      }
      return errors;
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if ( Object.keys(errors).length === 0 && input.name.length && input.types.length <= 2) {
        dispatch(addPokemon(input));
        alert("Pokemon created successfully!");
        setInput({
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
        navigate("/home");
      } else {
        alert("All fields must be completed");
      }
    };
  
    const handleDelete = (e) => {
      setInput({
        ...input,
        types: input.types.filter((type) => type !== e),
      });
    };
  
    return (
      <div>

        <NavBar />
        {pokemons.length === 0 ? (
          <img
            className={'loader'}
            src={Loader}
            alt="Loading..."
            width="300px"
            height="300px"
          />
        ) : (
          <div className={'form'}>
            <form
              onSubmit={
                  handleSubmit}
              >
              <h2 className={'title'}>Create a Pokémon!</h2>
              <div>
                <div>
                  <label htmlFor="name">Name: </label>
                  <input
                    type="text"
                    value={input.name.trim().toLowerCase()}
                    autoComplete="off"
                    name="name"
                    onChange={
                      handleChange}
                    placeholder=" Name..."
                    className={'fields'}
                  />
                  <p>{errors.name}</p>
                  <label htmlFor="img">Image: </label>
                  <input
                    type="url"
                    autoComplete="off"
                    value={input.img}
                    name="img"
                    onChange={handleChange}
                    placeholder=" URL Image..."
                    className={'fields'}
                  />
                  <p> </p>
                  <label htmlFor="hp"> HP: </label>{" "}
                  <input
                    type="range"
                    value={input.hp}
                    name="hp"
                    onChange={handleChange}
                    placeholder=" HP..."
                    className={'fields'}
                  />
                  {input.hp}
                  <p>{errors.hp}</p>
                  <label htmlFor="attack">Attack: </label>{" "}
                  <input
                    type="range"
                    value={input.attack}
                    name="attack"
                    onChange={handleChange}
                    placeholder=" Attack..."
                    className={'fields'}
                  />
                  {input.attack}
                  <p>{errors.attack}</p>
                  <label htmlFor="defense">Defense: </label>{" "}
                  <input
                    type="range"
                    value={input.defense}
                    name="defense"
                    onChange={
                      handleChange
                    }
                    placeholder=" Defense..."
                    className={'fields'}
                  />
                  {input.defense}
                  <p>{errors.defense}</p>
                </div>
                <div>
                  <label htmlFor="speed">Speed: </label>{" "}
                  <input
                    type="range"
                    value={input.speed}
                    name="speed"
                    onChange={handleChange}
                    placeholder=" Speed..."
                    className={'fields'}
                  />
                  {input.speed}
                  <p>{errors.speed}</p>
                  <label htmlFor="height">Height: </label>{" "}
                  <input
                    type="range"
                    value={input.height}
                    name="height"
                    onChange={handleChange}
                    placeholder=" Height..."
                    className={'fields'}
                    />
                  {input.height}
                  <p>{errors.height}</p>
                  <label htmlFor="weight">Weight: </label>
                  <input
                    type="range"
                    value={input.weight}
                    name="weight"
                    onChange={handleChange}
                    placeholder=" Weight..."
                    className={'fields'}
                  />
                  {input.weight}
                  <p>{errors.weight}</p>
                </div>
              </div>
              <div>
                <select
                  onChange={handleSelect}
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
                  <p>{errors.types}</p>
                </select>
                {
                  input.types.map((e) => {
                    return (
                      <div key={e}>
                        <span>{e} </span>
                        {""}
                        <button
                          onClick={
                            e =>handleDelete(e)}
                          className={'btn'}
                        >
                          {""}x{""}
                        </button>
                      </div>
                    );
                  }) 
                }
              </div>
              <button type="submit" className={'btn'}>
                Create
              </button>
            </form>
          </div>
        )}
        </div>
    );
  }
export default Create;