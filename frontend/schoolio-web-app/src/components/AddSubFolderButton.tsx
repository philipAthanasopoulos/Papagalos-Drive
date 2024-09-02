import React, { useState } from 'react'
import { Alert, Button, Form, FormControl, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import axios from 'axios';
import {webApi} from "../env/env"
import { FolderPlus} from 'react-bootstrap-icons';
import colors from '../colors';

type Props = {
    id?: string;
}

const AddSubFolderButton = (props: Props) => {
    const id = props.id;
    const [subFolderName, setSubFolderName] = useState<string>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showSuccessAlert, setshowSuccessAlert] = useState<boolean>(false);
    const [showErrorAlert, setshowErrorAlert] = useState<boolean>(false);

    function addSubFolder(){
        axios.post(`${webApi}/folder/${id}/addSubFolder?subFolderName=${subFolderName}`)
        .then(response =>{ 
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
    }

    const alertSuccess = () => {
        return(
            <div>
                <Alert show={showSuccessAlert} variant='success' transition={true}>
                    🥳🎉Folder added successfully!
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

    const handleSubmit = () => {
        setShowModal(false);
        setSubFolderName("");
        addSubFolder();
    }

  return (
    <div>
        <div>
            <div>
                {alertSuccess()}
                {alertError()}
            </div>
            <Modal show={showModal} onHide={() =>setShowModal(false)} >
                <ModalHeader>
                    <ModalTitle>
                        Add a new folder
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    Set a name for the new sub folder:
                    <Form>
                        <FormControl type='text' placeholder='cool folder name' value={subFolderName} onChange={(e) => setSubFolderName(e.target.value)}>
                        </FormControl>
                    </Form>
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
        <Button variant='light'size='lg' onClick={() => setShowModal(true)} >
            <FolderPlus color={colors.yellow}/> Νέος φάκελος
        </Button>
    </div>
  )
}

export default AddSubFolderButton;