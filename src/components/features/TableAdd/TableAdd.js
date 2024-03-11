import { Button, Container } from 'react-bootstrap';
import { addTable} from '../../../redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';


const TableAdd = () => {
  const idArray = useSelector(getAllTables).map(table => table.id); // zwrócenie tablicy z identyfikatorami (id)
  const newId = (idArray.length + 1).toString(); // konwertowanie typu number na typ string
  const dispatch = useDispatch();

  const handleAddTable = e => {
    e.preventDefault();
    const newTable = {
      id: newId, 
      status: 'Free', 
      peopleAmount: 0, 
      maxPeopleAmount: 4, 
      bill:0
    }

    dispatch(addTable(newTable));
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