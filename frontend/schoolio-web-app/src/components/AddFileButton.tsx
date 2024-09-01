import React, { useState } from 'react'
import {webApi} from '../env/env'
import { Alert, Button, Form, FormControl, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import axios from 'axios';
import { FileEarmarkArrowUp, FileEarmarkArrowUpFill } from 'react-bootstrap-icons';

type Props = {id?: string}

const AddFileButton = (props: Props) => {
    const id = props.id;
    const[showModal, setShowModal] = useState<boolean>(false);
    const [showSuccessAlert, setshowSuccessAlert] = useState<boolean>(false);
    const [showErrorAlert, setshowErrorAlert] = useState<boolean>(false);
    const[file,setFile] = useState<File>();
    const[fileName, setFileName] = useState<string>("")

    const handleSubmit = () => {
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
                    window.location.reload();
                    setshowSuccessAlert(false);
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
                    🥳🎉File added successfully!
                </Alert>
            </div>
        )
    }

    const alertError = () => {
        return(
            <div>
                <Alert show={showErrorAlert} variant='danger' transition={true}>
                   😞🌧️ Oops, something went wrong
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
            <Button variant="light" size='lg' onClick={() => setShowModal(true)}>
                <FileEarmarkArrowUp color='#00A000'/> Ανέβασμα αρχείου
            </Button>
            
            <Modal show={showModal} onHide={() =>setShowModal(false)} >
                    <ModalHeader>
                        <ModalTitle>Upload a new file</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                    <Form.Group controlId="formFile" className="mb-3" >
                        <Form.Label>Default file input example</Form.Label>
                        <FormControl type = "text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                        <FormControl type="file" className='btn btn-primary' onChange={(e) => {
                            const files = (e.target as HTMLInputElement).files;
                            if (files && files.length > 0) {
                                setFile(files[0]);
                            }
                        }} />
                    </Form.Group>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='secondary' onClick={()=> setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant='success' onClick={handleSubmit}>
                            Submit
                        </Button>
                    </ModalFooter>
                </Modal>
        </div>
    </div>
  )
}

export default AddFileButton;