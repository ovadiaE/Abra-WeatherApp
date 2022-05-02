import { combineReducers } from 'redux';

const ADD_CITY= "ADD_FAVORITE"

export function addCity(city){
    console.log(city, 'from likes')
    return {
      type: ADD_CITY,
      city
    }
  }

  const defaultCities = []

function likedCities (state = defaultCities, action) {
    switch(action.type){
        case ADD_CITY:
          return [
            ...state,
            {
                name: action.city
            }
         ]
        default: 
            return state
    }
}

const weatherApp = combineReducers({
   likedCities
  });

export default weatherApp;