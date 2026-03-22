import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Image, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import colors from '../../colors';
import students from "../../images/Learning languages-cuate.svg";
import studentgrades from "../../images/Grades-cuate.png";
import bookmarks from "../../images/Bookmarks-cuate.svg"
import "./hero.css";

const Hero = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {threshold: 0.2});

        const elements = document.querySelectorAll('.fade-in-element');
        elements.forEach(element => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    return (
        <>
        <Container className="pb-4">
            <Row className={"m-2 m-md-3 p-2 p-md-3 align-items-center rounded-5 fade-in hero-section-row"}>
                <Col xs={12} md={6} className="order-md-1 mb-3 mb-md-0">
                    <div className="text-center">
                        <h1 className="display-3 rubik-text hero-heading">
                            <b>🎓Σημειώσεις από κάθε γωνιά της Ελλάδας, στα χέρια σου!✨</b>
                        </h1>
                        <Link to={"/folder/1"}>
                            <Button
                                className="btn-lg mt-3 mb-3 rounded-pill mainbutton rubik-text shadow fade-in-element"
                                style={{background: `${colors.carrot_orange}`, border: "none"}}>
                <span>
                    <picture>
                      <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f60e/512.webp"
                              type="image/webp"/>
                      <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f60e/512.gif" alt="😎"
                           width="32" height="32"/>
                    </picture>
                 Μπες τώρα, δωρεάν!
                    <picture>
                      <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.webp"
                              type="image/webp"/>
                      <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif" alt="🚀"
                           width="32" height="32"/>
                    </picture>
                </span>
                            </Button>
                        </Link>
                    </div>
                </Col>
                <Col xs={12} md={6} style={{backgroundColor: colors.shamrock_green}} className="order-md-2 rounded-5">
                    <Image src={studentgrades} className="w-100"/>
                </Col>
            </Row>

            <Row className={"align-items-center m-2 m-md-3 p-2 p-md-3 rounded-5 hero-section-row"} style={{backgroundColor: colors.sky_blue}}>
                <Col xs={12} md={6} className="order-2 order-md-1 mt-3 mt-md-0">
                    <Image src={bookmarks} alt="Notes" className="w-100"/>
                </Col>
                <Col xs={12} md={6} className={"bg-light p-3 rounded-5 shadow order-1 order-md-2 mb-3 mb-md-0"}>
                    <h2 className="rubik-text">Αμέτρητο ακαδημαϊκό υλικό 📚</h2>
                    <p className="lead">
                        <ul className="fade-in-element">
                            <li>Διαλέξεις
                                <picture>
                                    <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3ac/512.webp"
                                            type="image/webp"/>
                                    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3ac/512.gif" alt="🎬"
                                         width="32" height="32"/>
                                </picture>
                            </li>
                            <li>Σημειώσεις📒</li>
                            <li>Παλιά θέματα <picture>
                                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/270f_fe0f/512.webp"
                                        type="image/webp"/>
                                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/270f_fe0f/512.gif" alt="✏"
                                     width="32" height="32"/>
                            </picture></li>
                            <li>Aπό <b>300+</b> τμήματα 🏫</li>
                        </ul>
                    </p>
                </Col>
            </Row>
            <Row className={"align-items-center m-2 m-md-3 p-2 p-md-3 rounded-5 hero-section-row"} style={{backgroundColor: colors.sandy_brown}}>
                <Col xs={12} md={6} className={"bg-light p-3 rounded-5 shadow fade-in-element mb-3 mb-md-0"}>
                    <h2 className="rubik-text"> Πρόσβαση από παντού, κάθε στιγμή <picture>
                        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f933_1f3fb/512.webp"
                                type="image/webp"/>
                        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f933_1f3fb/512.gif" alt="🤳"
                             width="32" height="32"/>
                    </picture></h2>
                    <p className="lead">Μελέτησε από τον υπολογιστή, το laptop ή το κινητό σου, όπου κι αν
                        βρίσκεσαι.</p>
                </Col>
                <Col xs={12} md={6}>
                    <Image src={students} alt="Notes" className="w-100"/>
                </Col>
            </Row>
        </Container>
        <Footer/>
        </>
    );
}

export default Hero;