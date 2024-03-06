import { MDBFooter } from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <MDBFooter bgColor='light' color='black-50' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
        <span>Copyright &copy;  </span>
        <a className='text-reset fw-bold text-decoration-none' href='#pizzeria'>PizzeriaApp</a>
        <span> {new Date().getFullYear()}</span>
      </div>
    </MDBFooter>
  );
}

export default Footer;