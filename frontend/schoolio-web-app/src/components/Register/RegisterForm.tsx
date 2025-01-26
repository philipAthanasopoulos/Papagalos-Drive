import {Button, Card, Container, FloatingLabel, Form, FormControl} from "react-bootstrap";
import {webApi} from "../../env/env";
import colors from "../../colors";

export const RegisterForm = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(`${webApi}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('User registered successfully');
        } else {
            alert('Registration failed');
        }
    };

    return (
        <Container fluid className='d-flex align-items-center justify-content-center bg-image'>
            <div className='mask gradient-custom-3'></div>
            <Card className='m-5' style={{maxWidth: '600px'}}>
                <div className='px-5'>
                    <h2 className="text-uppercase text-center mb-5 mt-4">Create an account</h2>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel label="First name">
                            <FormControl name="firstName" id='form1' type='text' placeholder="First name" required className="mt-4"/>
                        </FloatingLabel>
                        <FloatingLabel label="Email">
                            <FormControl name="email" id='form2' type='email' placeholder="Email" required className="mt-4"/>
                        </FloatingLabel>
                        <FloatingLabel label="Password">
                            <FormControl name="password" id='form3' type='password' placeholder="Password" required className="mt-4"/>
                        </FloatingLabel>
                        <Button className='mb-4 w-100 gradient-custom-4' size='lg' type="submit" style={{background: colors.sky_blue}}>Register</Button>
                    </Form>
                </div>
            </Card>
        </Container>
    );
};