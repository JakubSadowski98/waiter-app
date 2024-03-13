import { Container, Button, Spinner } from 'react-bootstrap';
import { Row, Col } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { getAllTables } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';
import TableRemove from '../TableRemove/TableRemove';


const TablesList = () => {
  const tables = useSelector(getAllTables);
  
  if(tables.length === 0)
    return (
      <div>
        <Spinner animation='border' variant='primary' />
        <p>Loading...</p>
      </div>
    );

  return (
    <div>
      <h1>Tables list</h1>
      <Container>
        {tables.map(table => (
          <Row key={table.id}>
            <Col>
              <h3>Table {table.id}</h3>
            </Col>
            <Col>
              <p className="px-0"></p>
              <p><strong>Status: </strong>{table.status}</p>
            </Col>
            <Col className="text-end">
              <NavLink to={`/table/${table.id}`}>
                <Button variant="primary">Show more</Button>
              </NavLink>
              <span> </span>
              <TableRemove id={table.id}/>
            </Col>
            <hr  style={{ color: '#000000', backgroundColor: '#000000', height: .5, borderColor : '#000000' }}/>
          </Row>
        ))}
      </Container>
    </div>
  )
};

export default TablesList;