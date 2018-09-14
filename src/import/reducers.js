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
    default:
      return state;
  }
};
