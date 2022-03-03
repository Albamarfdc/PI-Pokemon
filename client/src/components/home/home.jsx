import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterByCreation, filterByType, getPokemons, getTypes, orderByName, orderByAttack, cleanPokemons} from '../../redux/actions';
import PokeCard from '../card/card';
import Loader from '../img/Loader.gif';
import icon from '../img/refresh.gif';
import NavBar from '../navBar/narBar'
import Pagination from '../pagination/pagination'
import './home.css'

function Home() {
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemons);
    const isLoading = useSelector((state) => state.isLoading)
    const types = useSelector((state) => state.types)


    /* ---------------------Paginacion----------------- */
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokePerPage, setPokePerPage] = useState(12)
    const indexLastPoke = currentPage * pokePerPage
    const indexFirstPoke = indexLastPoke - pokePerPage
    const currentPokes = pokemons?.slice(indexFirstPoke, indexLastPoke)

    const pagination = (page) => {
        setCurrentPage(page);
      };

        useEffect(() => {
            dispatch(getPokemons());
            dispatch(getTypes())
            return () => {
                dispatch(cleanPokemons)
            };
        }, [dispatch]);


        const handleClick = (e) => {
            e.preventDefault();
            dispatch(getPokemons());
        };

        const handleTypesFilter = (e) => {
            dispatch(filterByType(e.target.value));
            setCurrentPage(1)
        }

        const handleCreationFilter = (e) => {
            dispatch(filterByCreation(e.target.value));
            setOrder(`Orden: ${e.target.value}`);
        };

        const handleOrder = (e) => {
            dispatch(orderByName(e.target.value));
            setOrder(`Orden: ${e.target.value}`);
        };

        const handleAttack = (e) => {
            dispatch(orderByAttack(e.target.value));
            setCurrentPage(1);
            setOrder(`Orden: ${e.target.value}`);
    };
    
        return (
            <div className={"home"}>
                <NavBar />
                <div className={'creation'} >
                    {/*  CREAR EL POKE */}
                    <Link to='/create' type='button' className={'btnCreate'}>
                        Create Pokemon
                    </Link>
                    <button className={'btnReload'} onClick={handleClick}>
                        {/* Recargar */}
                        <img src={icon} alt='Reload' width='100px' />
                    </button>
            </div>
            
                {/* FILTROS  */}
                <div className={'content'}>
                    <div className={'filters'}>
                        <select className={'selector'} onClick={handleTypesFilter}>
                            <option value='All'>Types</option>
                            {types?.map((e) => {
                                return (
                                    <option key={e.name} value={e.name}>
                                        {e.name[0].toUpperCase() + e.name.slice(1)}
                                    </option>
                                );
                            })}
                        </select>
                        <select className={'selector'} onClick={handleCreationFilter}>
                            <option value='All'>Creation</option>
                            <option value='createdByUser'>By User</option>
                            <option value='Existing'>Existing</option>
                        </select>{' '}
              </div>
              
                    {/* CARDS Y LOADER */}
                    {isLoading ? (
                        <img className={'loader'}
                            src={Loader}
                            alt="Loading..."
                            width='400px'
                            height='400px'
                        />
                    ) : (
                        <div className={'cards'}>
                            {currentPokes?.map((e) => (
                                <div className={'card'} key={e.id}>
                                    <PokeCard
                                        name={e.name}
                                        img={e.img}
                                        types={e.types}
                                        id={e.id}
                                    />
                                </div>
                            ))}
                        </div>
              )}
               <div className={'ordering'}>
                        <select className={'selector'} onClick={handleOrder}>
                            <option value='All'>Order By Name</option>
                            <option value='asc'>Order A-Z</option>
                            <option value='desc'>Order Z-A</option>
                        </select>
                        <select className={'select'} onClick={handleAttack}>
                            <option value='All'>Orden By Attack</option>
                            <option value='min'>Attack Min</option>
                            <option value='max'>Attack Max</option>
                        </select>
                    </div>
                </div>

            <Pagination
                pokePerPage={pokePerPage}
                pokemons={pokemons.length}
                pagination={pagination}
            /> 
            </div>
        );
    }


export default Home;