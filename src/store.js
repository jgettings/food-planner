import {
  createStore, applyMiddleware, combineReducers, compose,
} from 'redux';
import thunk from 'redux-thunk';
import trelloBoardLists from './listSelector/reducers';
import trelloBoardLabels from './labelSelector/reducers';
import importer from './import/reducers';
import shoppingList from './shoppingList/reducers';
import plan from './calendar/reducers';


const reducers = combineReducers({
  trelloBoardLists,
  trelloBoardLabels,
  importer,
  shoppingList,
  plan,
});


export default function configureStore() {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable no-underscore-dangle */

  return createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk)),
  );
}
