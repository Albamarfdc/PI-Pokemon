import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterByCreation,
  filterByType,
  getPokemons,
  getTypes,
  orderByName,
  orderByAttack,
} from "../../redux/actions";
import PokeCard from "../card/card";
import Loader from "../assets/Loader.gif";
import icon from "../assets/refresh.gif";
import NavBar from "../navBar/narBar";
import Pagination from "../pagination/pagination";
import NotFound from "../assets/notFound.gif";
import "./home.css";

function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const isLoading = useSelector((state) => state.isLoading);
  const types = useSelector((state) => state.types);
  const [, setOrder] = useState("");

  /* ---------------------Paginacion----------------- */
  const [page, setPage] = useState(1);
  const [pokePerPage] = useState(12);
  const max = pokemons.length / pokePerPage;

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleTypesFilter(e) {
    dispatch(filterByType(e.target.value));
    setPage(1);
  }

  function handleCreationFilter(e) {
    dispatch(filterByCreation(e.target.value));
    setPage(1);
  }

  function handleOrder(e) {
    dispatch(orderByName(e.target.value));
    setPage(1);
    setOrder(`Orden: ${e.target.value}`);
  }

  function handleAttack(e) {
    dispatch(orderByAttack(e.target.value));
    setPage(1);
    setOrder(`Orden: ${e.target.value}`);
  }

  return (
    <div className={"home"}>
      <NavBar />
      <div className={"creation"}>
        {/*  CREAR EL POKE */}
        <Link to="/create" type="button" className={"btnCreate"}>
          Create Pokemon
        </Link>
        <button className={"btnReload"} onClick={handleClick}>
          {/* Recargar */}
          <img src={icon} alt="Reload" width="50px" />
        </button>
      </div>
      <div>
        <div>
          <div>
            <Pagination page={page} setPage={setPage} max={max} />
          </div>
        </div>
      </div>
      {/* FILTROS  */}
      <div className={"content"}>
        <div className={"filters"}>
          <select className={"selector"} onChange={handleTypesFilter}>
            <option value="All">Types</option>
            {types?.map((e) => {
              return (
                <option key={e.name} value={e.name}>
                  {e.name[0].toUpperCase() + e.name.slice(1)}
                </option>
              );
            })}
          </select>
          <select className={"selector"} onChange={handleCreationFilter}>
            <option value="All">Origen</option>
            <option value="Existing">Existing</option>
            <option value="createdByUser">By User</option>
          </select>{" "}
        </div>
        {/* CARDS Y LOADER */}
        {isLoading ? (
          <img
            className={"loader"}
            src={Loader}
            alt="Loading..."
            width="400px"
            height="400px"
          />
        ) : !pokemons.length ? (
          <img
            className={"notFound"}
            src={NotFound}
            alt="notFound"
            width="400px"
            height="400px"
          />
        ) : (
          <div className={"cards"}>
            {pokemons
              .slice(
                (page - 1) * pokePerPage,
                (page - 1) * pokePerPage + pokePerPage
              )
              ?.map((p) => (
                <div className={"card"} key={p.id}>
                  <PokeCard
                    name={p.name}
                    img={p.img}
                    types={p.types}
                    id={p.id}
                  />
                </div>
              ))}
          </div>
        )}

        <div className={"ordering"}>
          <select className={"selector"} onChange={handleOrder}>
            <option value="All">Order By Name</option>
            <option value="asc">Order A-Z</option>
            <option value="desc">Order Z-A</option>
          </select>
          <select className={"selector"} onChange={handleAttack}>
            <option value="All">Orden By Attack</option>
            <option value="min">Attack Min</option>
            <option value="max">Attack Max</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Home;
