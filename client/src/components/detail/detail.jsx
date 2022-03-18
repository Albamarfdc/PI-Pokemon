import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cleanDetail, getPokemonId,deletePokemon } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../assets/Loader2.gif";
import { Link } from "react-router-dom";
import Back from "../assets/back.png";
import "./detail.css";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getPokemonId(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [id, dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();
    const sure = window.confirm('Are you sure ?');
    if (sure) {
      dispatch(deletePokemon(detail.id));
      navigate('/home');
    }
  } 

  return (
    <>
      <div>
        <Link to="/home">
          <img className={"back"} src={Back} alt="Home" width="80px" />
        </Link>
      </div>
      <div className={"detailCard"}>
        {detail.name ? (
          <div className={"name"}>
            <h2>{detail.name}</h2>
            <img src={detail.img} alt="pokemon" width="350px" height="350px" />
            <div className={"types"}>
              {detail.type?.map((e) => (
                <h2 key={e}>{e}</h2>
              ))}
            </div>

            <div id="id">
              id:<span>{detail.id}</span>
            </div>
            <div>
              <div id="hp">
                HP:{" "}
                <progress
                  id="hp"
                  max="255"
                  value={detail.hp}
                  className={"stat"}
                />{" "}
                {detail.hp}
              </div>

              <div id="attack">
                Attack:{" "}
                <progress
                  id="attack"
                  max="190"
                  value={detail.attack}
                  className={"stat"}
                />{" "}
                {detail.attack}
              </div>

              <div id="defense">
                Defense:{" "}
                <progress
                  id="defense"
                  max="250"
                  value={detail.defense}
                  className={"stat"}
                />{" "}
                {detail.defense}
              </div>

              <div id="height">
                Height:{" "}
                <progress
                  id="height"
                  max="200"
                  value={detail.height}
                  className={"stat"}
                />{" "}
                {detail.weight}
              </div>

              <div id="speed">
                Speed:{" "}
                <progress
                  id="speed"
                  max="200"
                  value={detail.speed}
                  className={"stat"}
                />{" "}
                {detail.speed}
              </div>
            </div>
          </div>
        ) : (
          <div className={"loader"}>
            <img src={Loading} alt="loader" width="400px" />
          </div>
        )}
        {detail.createdByUser && (
                <button className={'btnDelete'} onClick={e =>handleDelete(e)}>
                  Delete
                </button>
            )}
      </div>
    </>
  );
}

export default Detail;
