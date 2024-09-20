import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import colors from '../../colors'
import browsing from "../../images/Devices-cuate.svg"
import dottedArrow from "../../images/dottedArrow.jpg"
import glasses from "../../images/Reading glasses-cuate.svg"
import students from "../../images/Students-cuate.svg"

const Hero = () => {
  return (
    <div>
      <Container fluid className="bg-light text-dark">
        <Row className="align-items-center justify-content-center text-center">
          <Col xs={12} md={6}>
            <Image src={students} className="mb-4" />
          </Col>
          <Col xs={12} md={6}>
            <h1 className="display-4">
              <b>Σημειώσεις από κάθε γωνιά της Ελλάδας, στα χέρια σου!</b>
            </h1>
            <Link to={"/folder/1"}>
              <Button size='lg' className="mt-3 mt-md-0 rounded-pill" style={{ background: `${colors.carrot_orange}`, border: "none" }}>Μπες τώρα, δωρεάν!</Button>
            </Link>
            <br />
            {/* <ArrowDown size={50} className='mt-5 text-muted' /> */}
            <Image src={dottedArrow}/>
          </Col>
        </Row>
      </Container>

        <Container fluid className="d-flex vw-100 vh-100 align-items-center justify-content-center bg-light text-dark">
        <Row className="align-items-center">
            <Col xs={12} md={6} className="mb-4 mb-md-0">
            <Image src={glasses} alt="Notes" className="w-100 shadow-lg" />
            </Col>
            <Col xs={12} md={6} className="text-center text-md-start">
            <h2>Διάβασε έξυπνα και γρήγορα</h2>
            <p className="lead">Απόκτησε άμεση πρόσβαση σε σημειώσεις από <b>300+</b> πανεπιστημιακά τμήματα!</p>
            </Col>
        </Row>
        </Container>

        <Container fluid className="d-flex vw-100 vh-100 align-items-center justify-content-center bg-light text-dark">
        <Row className="align-items-center">
            <Col xs={12} md={6} className="text-center text-md-start mb-4 mb-md-0">
            <h2>Σημειώσεις παντού, κάθε στιγμή!</h2>
            <p className="lead">Μελέτησε από τον υπολογιστή, το laptop ή το κινητό σου, όπου κι αν βρίσκεσαι.</p>
            </Col>
            <Col xs={12} md={6}>
            <Image src={browsing} alt="Notes" className="w-100 shadow-lg" />
            </Col>
        </Row>
        </Container>
    </div>
  )
}

export default Hero