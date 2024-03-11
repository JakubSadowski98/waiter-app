import styles from './TableDetails.module.scss';
import { useDispatch } from 'react-redux';
import { editTable } from '../../../redux/tablesRedux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Row, Col, Button, Form as ReactForm } from "react-bootstrap";

const TableDetails = prop => {
  const singleTable = prop.singleTable;
  
  const dispatch = useDispatch(); // funkcja, która jest pośrednikiem do włączenia funkcji reducer, która z kolei włącza wszystkie subreducery
  const navigate = useNavigate();

  const [status, setStatus] = useState(singleTable.status);
  const [maxPeopleAmount, setMaxPeopleAmount]= useState(singleTable.maxPeopleAmount);
  const [peopleAmount, setPeopleAmount]= useState(singleTable.peopleAmount);
  const [bill, setBill]= useState(singleTable.bill);

  const validationAndParseData = value => {
    const parseValue = parseInt(value, 10) // zamienia stringa (postaci 'liczba') na typ liczbowy (np. '1' => 1;, arg2 oznacza system liczbowy    
    return isNaN(parseValue) || parseValue < 0 ? 0 : parseValue; // dla value typu string zwraca 0
  };                                                             // kolejność działań: 1) x < y 2) x || y 3) x ? y : z

  const handleEditTable = e => {
    e.preventDefault();
    const parsedPeopleAmount = validationAndParseData(peopleAmount);
    const parsedMaxPeopleAmount = validationAndParseData(maxPeopleAmount);
    const parsedBill = validationAndParseData(bill);

    const updatedBill = status !== "busy" ? 0 : parsedBill; // jeśli status jest inny niż "Busy" to kwota rachunku wynosi 0
    const updatedPeopleAmount = (status === "free" || status === "cleaning") ? 0 : parsedPeopleAmount;
    const updatedMaxPeopleAmount = (status === "free" || status === "cleaning") ? 0 : parsedMaxPeopleAmount;

    const thisTable = {
      id: singleTable.id,
      status: status,
      peopleAmount: updatedPeopleAmount,
      maxPeopleAmount: updatedMaxPeopleAmount,
      bill: updatedBill,
    };
    dispatch(editTable(thisTable)); // uruchamia reducera, a ten z kolei uruchamia tablesReducer
    alert('The table was update');
    navigate('/'); // nawigowanie do podstrony home
  }

  useEffect(() => { // wykonanie instrukcji z arg1, gdy dojdzie do zmiany, któregoś ze stanów w arg2
    const peopleAmountValue = parseInt(peopleAmount);
    const maxPeopleAmountValue = parseInt(maxPeopleAmount);
    const billValue = parseInt(bill);

    if (peopleAmountValue > maxPeopleAmountValue) setPeopleAmount(maxPeopleAmountValue)
    if ((peopleAmountValue < 0) || isNaN(peopleAmountValue)) setPeopleAmount(0);
        
    if ((maxPeopleAmountValue < 0) || isNaN(maxPeopleAmountValue)) setMaxPeopleAmount(0);
        
    if (isNaN(billValue)) setBill(0);
  },
    [peopleAmount, maxPeopleAmount, bill]
  );

  return (
    <div>
      <h1>Table {singleTable.id}</h1>
      <Form>
        <Form.Group>
          <Row className="mb-3">
            <Form.Label as='legend' column sm={1}>
              <strong>Status: </strong>
            </Form.Label>
            <Col sm={3}>
              <Form.Select className={styles.input_select} value= {status} onChange={ e => {setStatus(e.target.value); setPeopleAmount(0); setMaxPeopleAmount(4); setBill(0)}} aria-label="Default select example">
                <option value="free">Free</option>
                <option value="busy">Busy</option>
                <option value="reserved">Reserved</option>
                <option value="cleaning">Cleaning</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

        { (status === "busy" || status === "reserved") && (
        <Form.Group>
          <Row className="mb-3 align-items-center">
            <Form.Label column sm={1}>
              <strong>People: </strong>
            </Form.Label>
            <Col sm={2}>
              <div className="d-flex align-items-center">
                <Form.Control type='number' className={styles.input_people} min='0' max={maxPeopleAmount} value={peopleAmount} onChange={e => setPeopleAmount(e.target.value)} />
                <span className="mx-2">/</span>
                <Form.Control type='number' className={styles.input_people} max="10" value={maxPeopleAmount} onChange={e => setMaxPeopleAmount(e.target.value)} />
              </div>
            </Col>
          </Row>
        </Form.Group>
        )}
        
        { status === "busy" && ( // jeśli status jest inny niż "Busy" to inforamcja o kwocie rachunku jest schowana
          <Form.Group>
            <Row className='mb-3'>
              <Form.Label column sm={1} htmlFor="bill">
                <strong>Bill: </strong>
              </Form.Label>
              <Col sm={1}>
                <Form.Control id="bill" type='number' className={styles.input_bill} min='0' value={bill} onChange={e => setBill(e.target.value)} />
              </Col>
            </Row>      
          </Form.Group>
        )}

        <Form.Group>
          <Row className='mb-2'>
            <Col>
              <Button type='submit' variant='primary' onClick={handleEditTable}>Update</Button>
            </Col>
          </Row>   
        </Form.Group>
      </Form>
    </div>
  );
};

export default TableDetails;