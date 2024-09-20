import { Button, Col, Container, FloatingLabel, Form, FormControl, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import papagalos from "../../images/cool.png"

export const LoginForm = () => {
  return (
    <div>
      <Container className='border rounded' >
        <Row className="justify-content-center align-items-center">
          <Col xs={12} sm={10} md={8} lg={6} className='justify-content-center align-items-center'>
            <Form>
                <FloatingLabel  label="Email">
                  <FormControl placeholder='' required type="email" className='mb-3' ></FormControl>
                </FloatingLabel>
                <FloatingLabel label="Password">
                  <FormControl required type="password" placeholder='' className='mb-3'></FormControl>
                </FloatingLabel>
                <Button type='submit' className="w-100 mb-3">Login</Button>
                <div>
                  <p>New here? <Link to={"/register"}>Register!</Link></p>
                </div>
            </Form>
          </Col>
          <Col xs={12} sm={10} md={8} lg={6} className="d-flex justify-content-center align-items-center mt-3 mt-md-0">
            <Image src={papagalos} fluid />
          </Col>
        </Row>
      </Container>
    </div>
  )
}