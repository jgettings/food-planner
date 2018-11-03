import { createStore, applyMiddleware, combineReducers } from 'redux';
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
  return createStore(
    reducers,
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    /* eslint-enable no-underscore-dangle */
    applyMiddleware(thunk),
  );
}
