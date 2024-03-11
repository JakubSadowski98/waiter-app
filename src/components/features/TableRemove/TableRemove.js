import { Button } from 'react-bootstrap';
import { removeTable, getAllTables, editTable } from '../../../redux/tablesRedux';
import { useDispatch, useSelector } from 'react-redux';

const TableRemove = param => {
  let removeTableId = param.id;
  const allTables = useSelector(getAllTables);

  const dispatch = useDispatch();

  const handleRemoveTable = e => {
    e.preventDefault();
    dispatch(removeTable(removeTableId));
    // get new id to tables corresponding to the order in the state
    let newId = removeTableId;
    for( let table of allTables ) {
      if (table.id > removeTableId) {
        table.id = (newId++).toString();
        dispatch(editTable(table));
      }
    }
  }
  
  return(
        <Button type='submit' variant="danger" onClick={handleRemoveTable}>
          Remove
        </Button>
  );
};

export default TableRemove;