import {Button, Col, Container, Row} from 'react-bootstrap';
import colors from '../colors';


export const SupportSection = () => {

    const mailTypes = [
        {
            subject: "Bug",
            text: "Αναφορά προβλήματος🪰🔧",
            color: colors.carrot_orange,
            form: "https://docs.google.com/forms/d/e/1FAIpQLScm96XZDbvYuXlS35-RAik-igPwa9nH3dKxDCPD6xbncge5AQ/viewform?usp=dialog"
        },
        {
            subject: "Suggetion",
            text: "Έχω κάτι να προτείνω☝️🤓",
            color: colors.sky_blue,
            form: "https://docs.google.com/forms/d/e/1FAIpQLScJIAEs6SG3LJKwhbX8_7RMsPSXsKW-BtthdO1oPG8k7XPNgw/viewform?usp=header"
        },
        {
            subject: "General email",
            text: "Άλλο...🤔💭",
            color: colors.shamrock_green,
            form: "https://docs.google.com/forms/d/e/1FAIpQLSfONPUWNxJQ4Qou0yXM8T4lhlTjV2WYL4r6sE2MJvUKhzUikw/viewform?usp=header"
        },
    ];

    function openForm(url: string): void {
        window.open(url);
    }

    return (
        <Container className='mt-5'>
            <Row>
                <Col>
                    <ul>
                        <li>
                            💻🖥️ Συνιστούμε την αποστολή email μέσω υπολογιστή έναντι κινητής συσκευής.
                        </li>
                        <li>
                            📸 Βοηθά ιδιαίτερα η αποστολή εικόνων ή βίντεο στο email σας.
                        </li>
                    </ul>
                </Col>
            </Row>
            <Row>
                {mailTypes.map((type) => (
                    <Col xs={12} sm={6} md={4} className='mb-2' key={type.subject}>
                        <Button className='btn-lg w-100 rounded-pill border-0' onClick={() => openForm(type.form)}
                                style={{background: `${type.color}`}}>
                            {type.text}
                        </Button>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}