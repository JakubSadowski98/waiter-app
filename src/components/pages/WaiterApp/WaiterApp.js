import TableDetails from "../../features/TableDetails/TableDetails";
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';

const WaiterApp = () => {
  const { tableId } = useParams(); // przypisanie do stałej tableId dynamicznego parametru adresu
  const singleTable = useSelector(state => getTableById(state, tableId)); // przypsianie do stałej singleTable obiektu-stolika o danym id
  
  if (!singleTable) { // nawigowanie do podstrony Home jeśli podano zły adres
    return <Navigate to="/" />;
  } else {
    return(
      <div>
        <TableDetails singleTable={singleTable}/>
      </div>
    );
  }
};

export default WaiterApp;