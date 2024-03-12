import { Button } from 'react-bootstrap';
import { getAllTables, removeTableRequest } from '../../../redux/tablesRedux';
import { useDispatch, useSelector } from 'react-redux';

const TableRemove = param => {
  let tableId = param.id;
  const dispatch = useDispatch();

  const handleRemoveTable = e => {
    e.preventDefault();
    let result = window.confirm('Are you sure to remove this table?');
    if (result === true) dispatch(removeTableRequest(tableId));
  }
  
  return(
    <Button type='submit' variant="danger" onClick={handleRemoveTable}>
      Remove
    </Button>
  );
};

export default TableRemove;