import React, { FormEvent, useState } from 'react'
import {webApi} from '../env/env'
import { Alert, Button, Form, FormControl, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import axios from 'axios';
import { FileEarmarkArrowUp, FileEarmarkArrowUpFill } from 'react-bootstrap-icons';
import colors from '../colors';

type Props = {id?: string}

const AddFileButton = (props: Props) => {
    const id = props.id;
    const[showModal, setShowModal] = useState<boolean>(false);
    const [showSuccessAlert, setshowSuccessAlert] = useState<boolean>(false);
    const [showErrorAlert, setshowErrorAlert] = useState<boolean>(false);
    const[file,setFile] = useState<File>();
    const[fileName, setFileName] = useState<string>("")

    const handleSubmit = (event:FormEvent) => {
        event.preventDefault();
        if (file){
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', fileName);
            axios.post(`${webApi}/folder/${id}/addNote`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                setshowSuccessAlert(true);
                setTimeout(() => {
                    setshowSuccessAlert(false);
                    window.location.reload();
                },3000);
            })
            .catch(error => {
                setshowErrorAlert(true);
                setTimeout(() => {
                    setshowErrorAlert(false);
                },3000);
            });
    
            setShowModal(false);
        }
    }

    const alertSuccess = () => {
        return(
            <div>
            <Alert show={showSuccessAlert} variant='success' transition={true}>
                🥳🎉Το αρχείο προστέθηκε με επιτυχία!
            </Alert>
            </div>
        )
    }

    const alertError = () => {
        return(
            <div>
            <Alert show={showErrorAlert} variant='danger' transition={true}>
               😞🌧️ Ωχ, κάτι πήγε στραβά
            </Alert>
            </div>
        )
    }

  return (
    <div >
        <div>
            {alertSuccess()}
            {alertError()}
        </div>
        <div>
            <Button  variant="light" size='lg' onClick={() => setShowModal(true)}>
                <FileEarmarkArrowUp color={colors.green}/> Ανέβασμα αρχείου
            </Button>
            
            <Modal show={showModal} onHide={() =>setShowModal(false)} >
                <Form onSubmit={handleSubmit}>
                    <ModalHeader>
                        <ModalTitle>Upload a new file</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                    <Form.Group controlId="formFile" className="mb-3" >
                        <Form.Label>Default file input example</Form.Label>
                        <FormControl required type = "text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                        <FormControl required type="file" className='btn btn-primary' onChange={(e) => {
                            const files = (e.target as HTMLInputElement).files;
                            if (files && files.length > 0) setFile(files[0]);
                        }}/>
                    </Form.Group>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='secondary' onClick={()=> setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant='success' type='submit'>
                            Submit
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    </div>
  )
}

export default AddFileButton;