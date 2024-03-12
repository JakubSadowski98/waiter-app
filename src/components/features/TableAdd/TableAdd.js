import { Button, Container } from 'react-bootstrap';
import { addTableRequest } from '../../../redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';

const TableAdd = () => {
  const tables = useSelector(getAllTables);
  const idArray = tables.map(table => table.id); // zwrócenie tablicy z identyfikatorami (id)
  let newId = '';
  if (idArray.length === 0) newId = '1'; // nadanie stolikowi id='1' jeśli na liście nie ma żadnego stolika
  else newId = (parseInt(idArray[idArray.length - 1]) + 1).toString();

  const dispatch = useDispatch();

  const handleAddTable = e => {
    e.preventDefault();
    const newTable = {
      id: newId,
      status: 'free', 
      peopleAmount: 0, 
      maxPeopleAmount: 4, 
      bill:0
    }

    dispatch(addTableRequest(newTable));
  }
  
  return(
    <div>
      <Container>
        <Button type='submit' variant="success" onClick={handleAddTable}>
          Add Table
        </Button>
      </Container>
    </div>
  );
};

export default TableAdd;