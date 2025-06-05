import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Image, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import colors from '../../colors';
import glasses from "../../images/Bibliophile-cuate.svg";
import students from "../../images/Learning languages-cuate.svg";
import studentgrades from "../../images/Grades-cuate.png";
import micdrop from "../../images/Mic drop-cuate.svg"
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
        }, {threshold: 1.0});

        const elements = document.querySelectorAll('.fade-in-element');
        elements.forEach(element => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    return (
        <Container fluid>
            <Container fluid className="d-flex text-dark mb-5">
                <Row className="">
                    <Col xs={12} md={6} style={{backgroundColor: colors.shamrock_green}} className="rounded-5">
                        <Image src={studentgrades} className="w-100"/>
                    </Col>
                    <Col xs={12} md={6}>
                        <h1 className="display-3 rubik-text">
                            <b>🎓Σημειώσεις από κάθε γωνιά της Ελλάδας, στα χέρια σου!✨</b>
                        </h1>
                        <Link to={"/folder/1"}>
                            <Button className="btn-lg mt-3 rounded-pill mainbutton rubik-text shadow fade-in-element"
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
                    </Col>
                </Row>
            </Container>

            <Container fluid style={{backgroundColor: colors.sky_blue}}
                       className="d-flex align-items-center justify-content-center text-dark mb-5 rounded-5">
                <Row className="align-items-center p-5">
                    <Col xs={12} md={6}>
                        <Image src={bookmarks} alt="Notes" className="w-100"/>
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-start bg-light rounded-4 shadow">
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
            </Container>
            <Container fluid style={{backgroundColor: colors.shamrock_green}}
                       className="d-flex align-items-center justify-content-center text-dark mb-5 rounded-5">
                <Row className="align-items-center p-5">
                    <Col xs={12} md={6}
                         className="text-center text-md-start mb-4 mb-md-0 bg-light rounded-4 shadow fade-in-element">
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
            {/*<Container fluid style={{backgroundColor: colors.shamrock_green}}*/}
            {/*           className="d-flex align-items-center justify-content-center text-dark mb-5 rounded-5">*/}
            {/*    <Row className="align-items-center p-5 justify-content-center">*/}
            {/*        <Col xs={12} md={6} lg={12}*/}
            {/*             className="text-center text-md-start  bg-light rounded-4 shadow fade-in-element">*/}
            {/*            <br/>*/}
            {/*            <h1><b>🦜 Γιατί να γίνεις Παπαγαλάκι; </b></h1>*/}
            {/*            <br/>*/}
            {/*            <h2><b>🍝Γιατί οι σημειώσεις είναι σαν το παστίτσιο: καλύτερες όταν τις μοιράζεσαι.</b></h2>*/}
            {/*            <ul>*/}
            {/*                <li>Μην τις κρατάς για σένα σαν να είναι συνταγή της γιαγιάς σου.</li>*/}
            {/*            </ul>*/}

            {/*            <h2><b>🤖 Γιατί το AI δεν γράφει καλύτερες σημειώσεις απ’ τις δικές σου.</b></h2>*/}
            {/*            <ul>*/}
            {/*                <li> ChatGPT: 80% σωστά.</li>*/}
            {/*                <li>Εσύ: 100% παπαγαλάκι verified.</li>*/}
            {/*            </ul>*/}

            {/*            <h2><b><i>📞"E βρο παίζει κάνα παλιό θέμα πλιζπλιζπλιζ 🙏🏻🙏🏻🙏🏻⁉️".</i></b></h2>*/}
            {/*            <ul>*/}
            {/*                <li>Παίζει στον Παπαγάλο, πάτα μου και κάνα like.*/}
            {/*                </li>*/}
            {/*                <li>Και κάντα save να μη με ρωτάς κάθε φόρα.</li>*/}
            {/*            </ul>*/}

            {/*            <h2><b>🎁 Μπορεί να έχει και perks. 👀</b></h2>*/}
            {/*            <ul>*/}
            {/*                <li>Δεν λέμε τίποτα, αλλά τα καλά παπαγαλάκια ίσως τσιμπήσουν έκπληξη.</li>*/}
            {/*                <li>(Αν είσαι αυτός που ανεβάζει όλα τα SOS, έχουμε να σου πούμε δυο κουβέντες...*/}
            {/*                    ευγνωμοσύνης.)*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </Col>*/}
            {/*        <Col xs={12} md={6} lg={12} className={"mt-5"}>*/}
            {/*            <Image src={micdrop} className=""/>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Container>*/}
        </Container>
    );
}

export default Hero;