import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cleanDetail, deletePokemon, getPokemonId } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../navBar/narBar'
import Loader from '../img/Loader2.gif'
import './detail.css'


function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detail = useSelector((state) => state.detail);
  //console.log('detail', detail.createdByUser);

  useEffect(() => {
    dispatch(getPokemonId(id));
    return () => {
      dispatch(cleanDetail())
    };
  }, [id, dispatch]);

const handleDelete = (e) => {
    e.preventDefault();
    const sure = window.confirm('Are you sure ?');
    if (sure) {
      dispatch(deletePokemon(Detail.id));
      navigate('/home');
    }
  } 

  return (
    <>
      <NavBar />
      <div className={'detailCard'}>
        {getPokemonId.length < 0 ? (
          <img src={Loader} alt='loader' width='120px' height='120px' />
        ) : (
            <div className={'name'}>
              <h2>{detail.name}</h2>
              <img src={detail.img} alt='pokemon' width='350px' height='350px' />
              <div className={'types'}>
                {detail.type?.map((e) => (
                  <h2 key={e}>{e}</h2>
                ))}
              </div>
              <div id='id' >
                id:<span>{detail.id}</span>
              </div>
              <div>
                <div id='hp'>
                  HP: {' '}
                  <progress
                    id='hp'
                    max='255'
                    value={detail.hp}
                    className={'stat'}
                  /> {' '}
                  {detail.hp}
                </div>

                <div id='attack'>
                  Attack:{' '}
                  <progress
                    id='attack'
                    max='190'
                    value={detail.attack}
                    className={'stat'}
                  /> {' '}
                  {detail.attack}
                </div>

                <div id='defense'>
                  Defense: {' '}
                  <progress
                    id='defense'
                    max="250"
                  value={detail.defense}
                    className={'stat'}
                  /> {' '}
                  {detail.defense}
                </div>

                <div id='height'>
                  Height:{' '}
                  <progress
                    id='height'
                    max='20'
                    value={detail.height}
                    className={'stat'}
                  /> {' '}
                  {detail.weight}  
                </div>
                <div id='speed'>
                  Speed:{' '}
                  <progress
                    id='speed'
                    max='200'
                    value={detail.speed}
                    className={'stat'}
                  />{' '}
                  {detail.speed}
              </div>
              </div>
           {detail.createdByUser && (
                <button className={'btnDelete'} onClick={e =>handleDelete(e)}>
                  Delete
                </button>
            )}
        </div>
        )}
      </div>
    </>
    );
  }


export default Detail;