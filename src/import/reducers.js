const initialImportState = {
  recipeToImport: '',
};
export default (state = initialImportState, action) => {
  switch (action.type) {
    case 'IMPORT_RECIPE': {
      return { recipeToImport: action.payload };
    }
    case 'CANCEL_IMPORT': {
      return { recipeToImport: '' };
    }
    case 'LOADING_RECIPE_IMPORT': {
      return { loading: true };
    }
    case 'LOADED_RECIPE_IMPORT': {
      return { loading: false, recipeToImport: '' };
    }
    default:
      return state;
  }
};
