import React from "react";
import "./pagination.css";
import { useState } from "react";


/* function Pagination({ pokemonsPerPage, pokemons, pagination }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(pokemons / pokemonsPerPage); i++) {
    //la división para saber cuántas páginas tendrá en total
    pages.push(i);
  }

  return (
    <div>
      {pages?.map((e) => (
        <button className={s.pagination} key={e} onClick={() => pagination(e)}>
          {e}
        </button>
      ))}
    </div>
 */

function Pagination({ page, setPage, max }) {
  const [input, setInput] = useState(1);

  const prevPage = () => {
    setInput(parseInt(input) - 1);
    setPage(parseInt(input) - 1);
  };

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPage(parseInt(input) + 1);
  };

  const onKeyDown = (e) => {
    //ENTER
    if (e.keyCode === 13) {
      setPage(parseInt(e.target.value));
      if (
        Number(e.target.value < 1) ||
        parseInt(e.target.value) > Math.ceil(max) ||
        isNaN(parseInt(e.target.value))
      ) {
        setPage(1);
        setInput(1);
      } else {
        setPage(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={"container"}>
      <button
        className={"pagination"}
        disabled={page === 1 || page < 1}
        onClick={prevPage}
      >
        {" "}
        prev{" "}
      </button>
      <input
        className={"box"}
        onChange={onChange}
        onKeyDown={onKeyDown}
        name="page"
        autoComplete="off"
        maxLength={1}
        value={input}
      />
      <p className={"number"}> de {Math.ceil(max)}</p>
      <button
        disabled={page === Math.ceil(max) || page > Math.ceil(max)}
        className={"pagination"}
        onClick={nextPage}
      >
        next{" "}
      </button>
    </div>
  );
}

export default Pagination;
