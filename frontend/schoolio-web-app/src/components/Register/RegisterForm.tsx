import {Alert, Button, Card, Container, FloatingLabel, Form, FormControl} from "react-bootstrap";
import {apiBaseURL} from "../../env/env";
import colors from "../../colors";
import React, {useState} from "react";

export const RegisterForm = () => {

    const [successfull, setSuccessfull] = useState<boolean>(false);
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(`${apiBaseURL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setSuccessfull(true);
        } else {
            setSuccessfull(false);
        }
        setAlertVisible(true);
        const responseText = await response.text();
        setMessage(responseText);
    };

    return (
        <Container fluid className='d-flex align-items-center justify-content-center bg-image'>
            <div className='mask gradient-custom-3'></div>
            <Card className='m-5' style={{maxWidth: '600px'}}>
                <div className='px-5'>
                    <h2 className=" text-center mb-5 mt-4">👋Create account🆕</h2>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel label="First name">
                            <FormControl name="firstName" id='form1' type='text' placeholder="First name" required
                                         className="mt-4"/>
                        </FloatingLabel>
                        <FloatingLabel label="Email">
                            <FormControl name="email" id='form2' type='email' placeholder="Email" required
                                         className="mt-4"/>
                        </FloatingLabel>
                        <FloatingLabel label="Password">
                            <FormControl name="password" id='form3' type='password' placeholder="Password" required
                                         className="mt-4"/>
                        </FloatingLabel>
                        <Button className='mt-4 mb-4 w-100 border-0' size='lg' type="submit"
                                style={{background: colors.carrot_orange}}>Register</Button>
                        <Button className=' mb-4 w-100' size='lg' href={"/login"}
                                style={{background: colors.sky_blue}}>Login</Button>
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
    );
};