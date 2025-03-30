import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Col, Container, Image, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import colors from '../../colors'
import browsing from "../../images/Sync-cuate.svg"
import dottedArrow from "../../images/Directing the arrow up.gif"
import glasses from "../../images/Bibliophile-cuate.svg"
import students from "../../images/Learning languages-cuate.svg"
import "./hero.css"

const Hero = () => {
    return (
        <div>
            <Container fluid className=" text-dark mb-5">
                <Row className="align-items-center justify-content-center text-center">
                    <Col xs={12} md={6}>
                        <Image src={students} className="mb-4"/>
                    </Col>
                    <Col xs={12} md={6} className='align-self-start mt-5'>
                        <h1 className="display-3">
                            <b>Σημειώσεις από κάθε γωνιά της Ελλάδας, στα χέρια σου!✨</b>
                        </h1>
                        <Link to={"/folder/1"}>
                            <Button size='lg' className="mt-3 rounded-pill "
                                    style={{background: `${colors.carrot_orange}`, border: "none"}}>🚀 Μπες τώρα, δωρεάν!
                                😎
                            </Button>
                        </Link>
                        <br/>
                        <Image src={dottedArrow} className="w-50 pt-5 " style={{transform: 'rotate(180deg)'}}/>
                    </Col>
                </Row>
            </Container>

            <Container fluid
                       className="d-flex align-items-center justify-content-center  text-dark mb-5">
                <Row className="align-items-center">
                    <Col xs={12} md={6}>
                        <Image src={glasses} alt="Notes" className="w-100 "/>
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-start">
                        <h2>Αμέτρητο ακαδημαϊκό υλικό 📚</h2>
                        <p className="lead">
                            <ul>
                                <li>Διαλέξεις 📽️</li>
                                <li>Σημειώσεις 📔</li>
                                <li>Παλιά θέματα 📝</li>
                                <li>από <b>300+</b> τμήματα 🏦</li>
                            </ul>
                        </p>
                    </Col>
                </Row>
            </Container>

            <Container fluid
                       className="d-flex align-items-center justify-content-center  text-dark mb-5">
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="text-center text-md-start mb-4 mb-md-0">
                        <h2> Πρόσβαση από παντού, κάθε στιγμή 🤳</h2>
                        <p className="lead">Μελέτησε από τον υπολογιστή, το laptop ή το κινητό σου, όπου κι αν
                            βρίσκεσαι.</p>
                    </Col>
                    <Col xs={12} md={6}>
                        <Image src={browsing} alt="Notes" className="w-100"/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Hero