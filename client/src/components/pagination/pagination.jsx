import React from "react";
import "./pagination.css"


function Pagination({ pokePerPage, pokemons, pagination }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(pokemons/pokePerPage); i++) {
    //la división para saber cuántas páginas tendrá en total
    pages.push(i);
  }

  return (
    <div className={'container'}>
      {pages?.map((e) => (
        <button className={'pagination'} key={e} onClick={() => pagination(e)}>
          {e}
        </button>
      ))}
    </div>
  );
}

export default Pagination;