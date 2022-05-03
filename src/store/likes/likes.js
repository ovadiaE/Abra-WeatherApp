import { combineReducers } from 'redux';

const ADD_CITY= "ADD_FAVORITE"
const SELECT_CITY = "SELECT_CITY"

export function addCity(city){
    console.log(city, 'added to liked cities')
    return {
      type: ADD_CITY,
      city
    }
  }

export function selectCity(city){
  console.log(city,'selected to display in home screen')
  return {
    type: SELECT_CITY,
    city
  }
}

let cities = []
let selectedCity = []

function likedCities (state = cities, action) {
    switch (action.type) {
        
      case ADD_CITY:
          cities.push(action.city)
          cities = cities.filter((item, index) => cities.indexOf(item) === index);
          return cities
       
      case SELECT_CITY:
          selectedCity.length = 0
          selectedCity.push(action.city)
          return selectedCity
        
          default: 
            return state
    }
}

const weatherApp = combineReducers({
   likedCities
  });

export default weatherApp;