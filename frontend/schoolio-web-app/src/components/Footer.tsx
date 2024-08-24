import { Facebook, Github, Google, Instagram, Linkedin, TwitterX } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';

export const Footer = () => {
  return (
    <div className='text-center pt-5 pb-5 bg-light mt-5'>
      <button className='me-3 rounded-circle border-0'>
        <TwitterX color='black' />
      </button>
      <button className='me-3 rounded-circle border-0'>
        <Facebook color='blue' />
      </button>
      <button className='me-3 rounded-circle border-0'>
        <Google color='red' />
      </button>
      <button className='me-3 rounded-circle border-0'>
        <Instagram color='purple' />
      </button>
      <button className='me-3 rounded-circle border-0'>
        <Linkedin color='blue' />
      </button>
      <button className='me-3 rounded-circle border-0'>
        <Github color='black' />
      </button>
    </div>
  );
}