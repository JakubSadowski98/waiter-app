// obsługa kolekcji state.tables

//selectors
export const getTableById =({ tables }, tableId) => tables.find(table => table.id === tableId);
export const getAllTables = ({ tables }) => tables;

// action names
const createActionName = actionName => `app/tables/${actionName}`;

const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const ADD_TABLE = createActionName('ADD_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
const EDIT_TABLE = createActionName('EDIT_TABLE');

// action creators
export const updateTables = payload => ({type: UPDATE_TABLES, payload});
export const addTable = payload => ({type: ADD_TABLE, payload});
export const removeTable = payload => ({type: REMOVE_TABLE, payload});
export const editTable = payload => ({type: EDIT_TABLE, payload});

// requests - communication with the API server - download data from server


//subreducer
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_TABLE:
      return [...statePart, { ...action.payload}]
    case REMOVE_TABLE:
      return statePart.filter(table => table.id !== action.payload);
    case EDIT_TABLE:
      return statePart.map(table => table.id === action.payload.id ? { ...table, ...action.payload } : table); // instrukcja { ...table, ...action.payload } mówi: podmień właściwości z table na opowiadające im właściwości z action.payload
    case UPDATE_TABLES:
      return { ...statePart, tables: [...action.payload] };
    default:
      return statePart;
  };
};

export default tablesReducer;