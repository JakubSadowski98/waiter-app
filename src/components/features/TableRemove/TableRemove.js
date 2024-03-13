import { Button } from 'react-bootstrap';
import { removeTableRequest } from '../../../redux/tablesRedux';
import { useDispatch } from 'react-redux';
import PropTypes  from 'prop-types';

const TableRemove = props => {
  let tableId = props.id;
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

TableRemove.propTypes = {
  id: PropTypes.string.isRequired
};

export default TableRemove;