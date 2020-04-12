import {
  applyMiddleware, createStore, combineReducers, compose,
} from 'redux';
import { save, load } from 'redux-localstorage-simple';
import userProfile from './components/UserProfile/reducer';


const localStorageOptions = {
  states: ['userProfile'],
  namespace: 'food_planner',
  disableWarnings: true,
};

const middleware = [
  save(localStorageOptions),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => createStore(
  combineReducers({
    userProfile,
  }),
  load(localStorageOptions),
  composeEnhancers(applyMiddleware(...middleware)),
);

export default configureStore;
