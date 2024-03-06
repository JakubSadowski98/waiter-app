import Form from 'react-bootstrap/Form';
import { Row, Col, Button, Form as ReactForm } from "react-bootstrap";

const SingleTableForm = () => {
  return (
    <div>
      <h1>Table 1</h1>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as='legend' column sm={1}>
            <strong>Status:</strong>
          </Form.Label>
          <Col sm={3}>
            <Form.Select aria-label="Default select example">
              <option value="Free">Free</option>
              <option value="Bussy">Bussy</option>
              <option value="Reserved">Reserved</option>
              <option value="Cleaning">Cleaning</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label as='legend' column sm={1}>
            <strong>People:</strong>
          </Form.Label>
          <Col sm={1}>
            <Form.Control type='number' value="2" />
          </Col>
          /    
          <Col sm={1}>
            <Form.Control type='number' value="1" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm={1}>
            <strong>Bill:</strong>
          </Form.Label>
          $
          <Col sm={1}>
            <Form.Control type='number' value="20" />
          </Col>      
        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
          <Col>
            <Button type='submit' variant='primary'>Update</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SingleTableForm;