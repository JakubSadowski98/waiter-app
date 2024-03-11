import styles from './TableDetails.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTableById, editTable } from '../../../redux/tablesRedux';
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Row, Col, Button, Form as ReactForm } from "react-bootstrap";

const TableDetails = () => {
  const { tableId } = useParams(); // przypisanie do stałej tableId dynamicznego parametru adresu
  const singleTable = useSelector(state => getTableById(state, tableId)); // przypsianie do stałej singleTable obiektu-stolika o danym id
  const dispatch = useDispatch(); // funkcja, która jest pośrednikiem do włączenia funkcji reducer, która z kolei włącza wszystkie subreducery

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

    const updatedBill = status !== "Busy" ? 0 : parsedBill; // jeśli status jest inny niż "Busy" to kwota rachunku wynosi 0
    const updatedPeopleAmount = status === "Free" || status === "Cleaning" ? 0 : parsedPeopleAmount;
    const updatedMaxPeopleAmount = status === "Free" || status === "Cleaning" ? 0 : parsedMaxPeopleAmount;

    const thisTable = {
      id: singleTable.id,
      status: status,
      peopleAmount: updatedPeopleAmount,
      maxPeopleAmount: updatedMaxPeopleAmount,
      bill: updatedBill,
    };
    //console.log(thisTable) - poprawne dane
    dispatch(editTable(thisTable)); // uruchamia reducera, a ten z kolei uruchamia tablesReducer
  }

  useEffect(() => { 
    const peopleAmountValue = parseInt(peopleAmount);
    const maxPeopleAmountValue = parseInt(maxPeopleAmount);

    if (peopleAmountValue > maxPeopleAmountValue){
        setPeopleAmount(maxPeopleAmountValue)
    };

    if (peopleAmountValue < 0 || isNaN(peopleAmountValue)) {
        setPeopleAmount(0);
    }

    if (maxPeopleAmountValue < 0 || isNaN(maxPeopleAmountValue)){
        setMaxPeopleAmount(0);
    }},
    [peopleAmount, maxPeopleAmount]
  );

  // nawigowanie do podstrony Home jeśli podano zły adres
  // if(!singleTable) return <Navigate to="/" />  NIE DZIAŁA
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
              <Form.Select className={styles.input_select} value= {status} onChange={ event => setStatus(event.target.value)} aria-label="Default select example">
                <option value="Free">Free</option>
                <option value="Busy">Busy</option>
                <option value="Reserved">Reserved</option>
                <option value="Cleaning">Cleaning</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

        { (status === "Busy" || status === "Reserved") && (
        <Form.Group>
          <Row className="mb-3 align-items-center">
            <Form.Label column sm={1}>
              <strong>People: </strong>
            </Form.Label>
            <Col sm={2}>
              <div className="d-flex align-items-center">
                <Form.Control type='number' className={styles.input_people} min='0' max={maxPeopleAmount} value={peopleAmount} placeholder='Table peopleAmount...' onChange={e => setPeopleAmount(e.target.value)} />
                <span className="mx-2">/</span>
                <Form.Control type='number' className={styles.input_people} max="10" value={maxPeopleAmount} placeholder='Table maxPeopleAmount...' onChange={e => setMaxPeopleAmount(e.target.value)} />
              </div>
            </Col>
          </Row>
        </Form.Group>
        )}
        
        { status === "Busy" && ( // jeśli status jest inny niż "Busy" to inforamcja o kwocie rachunku jest schowana
          <Form.Group>
            <Row className='mb-3'>
              <Form.Label column sm={1} htmlFor="bill">
                <strong>Bill: </strong>
              </Form.Label>
              <Col sm={1}>
                <Form.Control id="bill" type='number' className={styles.input_bill} value={bill} placeholder="Table bill" onChange={e => setBill(e.target.value)} />
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