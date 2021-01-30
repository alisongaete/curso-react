import React, {useState, useReducer, useMemo, useRef, useCallback } from 'react'
import Search from './Search';
import useCharacters from '../hooks/useCharacters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons';
import {faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons';

const initialState = {
    favorites: []
}
const API = 'https://rickandmortyapi.com/api/character/';
const favoriteReducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        case 'REMOVE_FROM_FAVORITE':
            return{
                ...state,
                favorites: [
                    ...state.favorites.filter((favorite) => favorite !== action.payload)
                ]
            }
        default:
            return state;
    }
}

const Characters = () => {
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] = useState('');
    const searchInput = useRef(null);

    const characters = useCharacters(API);

    const handleClick = favorite => {
        dispatch({
            type: !!isCharacterInFavorites(favorite) ? 'REMOVE_FROM_FAVORITE' : 'ADD_TO_FAVORITE', 
            payload: favorite
        })
    }

    const isCharacterInFavorites = (favorite) =>
        favorites.favorites.find((character) => character.id === favorite.id);
    

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    }, [])

    const filteredUsers = useMemo(() => 
        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        }),
        [characters, search]
    )

    return (
        <div className="characters">
            <h1>⭐Favorites⭐</h1>
            {favorites.favorites.length > 0 ?
               favorites.favorites.map(favorite => (
                <li key={favorite.id}>{favorite.name}</li>
                ))
                : 'No favorite characters ... yet 😉'
            }
            
            <Search search={search} searchInput={searchInput} handleSearch={handleSearch}/>
            
            <div className="container">
                {filteredUsers.map(character => (
                    <div className="item" key={character.id}>
                        <img src={character.image} alt={character.name} className="image"/>
                        <h2 className="name">
                            {character.name}
                                
                            <FontAwesomeIcon 
                                className="iconStar" 
                                icon={!!isCharacterInFavorites(character) ? faStarSolid : faStarRegular}  
                                onClick={() => handleClick(character)}
                            />
                        </h2>
                        <div className="info">
                            <p>Status: {character.status}</p>
                            <p>Specie: {character.species}</p>
                            <p>Gender: {character.gender}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Characters
