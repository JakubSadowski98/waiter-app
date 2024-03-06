import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Row, Col } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { getAllTables } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';


const AllTables = () => {
  const tables = useSelector(getAllTables);

  return (
    <div>
      <h1>All tables</h1>
      <Container>
        {tables.map(table => (
          <Row key={table.id} className="align-items-center">
            <Col>
              <Row>
                <Col>
                  <h2>Table {table.id}</h2>
                </Col>
                <Col>
                  <p className="px-0"></p>
                  <p><strong>Status: </strong>{table.status}</p>
                 </Col>
              </Row>
            </Col>
            <Col className="text-end">
              <NavLink to={`/table/${table.id}`}>
                <Button variant="primary">Show more</Button>
              </NavLink>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  )
};

export default AllTables;