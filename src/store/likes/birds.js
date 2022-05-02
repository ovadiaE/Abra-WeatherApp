// import { combineReducers } from 'redux';
// const ADD_BIRD = 'ADD_BIRD';
// const INCREMENT_BIRD = 'INCREMENT_BIRD'
// const ADD_FAVORITE = "ADD_FAVORITE"

// export function addBird (bird) {
//     return {
//         type: ADD_BIRD,
//         bird,
//     }
// }

// export function incrementBird(bird) {
//     return {
//       type: INCREMENT_BIRD,
//       bird
//     }
//   }

//   export function addFavorite(city){
//     return{
//       type:ADD_FAVORITE,
//       city
//     }
//   }

// const defaultBirds = [
//     {
//       name: 'robin',
//       views: 1,
//     }
//   ];

//   const defaultCities = [

//   ]

// function birds (state = defaultBirds, action) {
//     switch(action.type){
//         case ADD_BIRD:
//             return [
//                 ...state,
//                 {
//                     name: action.bird,
//                     views: 1
//                 }   
//             ];
//         case INCREMENT_BIRD:
//             const bird = state.find(b => action.bird === b.name);
//             const birds = state.filter(b => action.bird !== b.name);
//         case ADD_FAVORITE:
//           return [
//             ...state
//           ],
//           {
//             name: action.city
//           }
       
//             console.log([
//                 ...birds,
//                 {
//                   ...bird,
//                   views: bird.views++
//                 }
//               ])
//             return [
//               ...birds,
//               {
//                 ...bird,
//                 views: bird.views++
//               }
//             ];
//         default: 
//             return state
//     }
// }

// const birdApp = combineReducers({
//     birds
//   });

//   export default birdApp;