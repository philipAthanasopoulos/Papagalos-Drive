import {Alert, Button, Card, Col, Container, FloatingLabel, Form, FormControl, Image, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import papagalos from "../../images/cool.png"
import React, {useState} from "react";
import {apiBaseURL} from "../../env/env";
import {User} from "./User";
import colors from "../../colors";
import axios from "axios";

export const LoginForm = () => {

    const [successfull, setSuccessfull] = useState<boolean>(false);
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await axios.post(`${apiBaseURL}/login`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                setSuccessfull(true);
                setMessage("Login successful");
                const userData = response.data;
                localStorage.setItem("user", JSON.stringify(userData));
                window.location.href = "/profile";
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    setSuccessfull(false);
                    setMessage("🔑❌ Wrong password");
                } else if (error.response.status === 404) {
                    setSuccessfull(false);
                    setMessage("📧❓ Email doesn't exist");
                } else {
                    setSuccessfull(false);
                    setMessage("🌋 An unexpected error occurred");
                }
            } else {
                setSuccessfull(false);
                setMessage("🌧️ Unable to connect to the server");
            }
        }
        setAlertVisible(true);
    };

    return (
        <Container fluid className='d-flex align-items-center justify-content-center bg-image'>
            <div className='mask gradient-custom-3'></div>
            <Card className='m-5' style={{maxWidth: '600px'}}>
                <div className='px-5'>
                    <h2 className=" text-center mb-5 mt-4">🛂Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel label="Email">
                            <FormControl name="email" id='form2' type='email' placeholder="Email" required
                                         className="mt-4"/>
                        </FloatingLabel>
                        <FloatingLabel label="Password">
                            <FormControl name="password" id='form3' type='password' placeholder="Password" required
                                         className="mt-4"/>
                        </FloatingLabel>
                        <Button className='mt-4 mb-4 w-100' size='lg' type="submit"
                                style={{background: colors.sky_blue}}>Login</Button>
                        <Button className=' mb-4 w-100 border-0' size='lg' href={"/register"}
                                style={{background: colors.carrot_orange}}>👋Register🆕</Button>
                    </Form>
                </div>
            </Card>
            {
                alertVisible && (
                    <Alert variant={successfull ? "success" : "danger"}>
                        {message}
                    </Alert>
                )
            }
        </Container>
    )
}