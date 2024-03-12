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
export const fetchTables = () => { 
  return dispatch => {
    fetch('http://localhost:3131/api/tables')
      .then(response => response.json())
      .then(tables => dispatch(updateTables(tables)));
  };
};

export const addTableRequest = newTable => { 
  return dispatch => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable),
    };

    fetch('http://localhost:3131/api/tables', options)
      .then(() => dispatch(addTable(newTable)))
      .catch(error => console.error('An error occurred while editing the table:', error));
  };
};

export const removeTableRequest = tableId => {
  return dispatch => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    fetch(`http://localhost:3131/api/tables/${tableId}`, options)
      .then(() => dispatch(removeTable(tableId)))
      .catch(error => console.error('An error occurred while editing the table:', error));
  };
};

export const editTableRequest = editedTable => {
  return dispatch => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedTable),
    };

    fetch(`http://localhost:3131/api/tables/${editedTable.id}`, options)
      .then(() => dispatch(editTable(editedTable)))
      .catch(error => console.error('An error occurred while editing the table:', error));
  };
};

//subreducer
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return action.payload;
    case ADD_TABLE:
      return [...statePart, { ...action.payload}]
    case REMOVE_TABLE:
      return statePart.filter(table => table.id !== action.payload);
    case EDIT_TABLE:
      return statePart.map(table => table.id === action.payload.id ? { ...table, ...action.payload } : table); // instrukcja { ...table, ...action.payload } mówi: podmień właściwości z table na opowiadające im właściwości z action.payload
    default:
      return statePart;
  };
};

export default tablesReducer;