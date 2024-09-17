import React, { useState } from 'react'
import { Alert, Button, FloatingLabel, Form, FormControl, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Toast, ToastBody, ToastHeader } from 'react-bootstrap';
import axios from 'axios';
import {webApi} from "../../env/env"
import { FolderPlus} from 'react-bootstrap-icons';
import colors from '../../colors';
import { FolderDTO } from './FolderDTO';
import { NotificationComponent } from '../Notifications/NotificationComponent';

type Props = {
    folder?: FolderDTO
    setFolder: React.Dispatch<React.SetStateAction<FolderDTO | undefined>>
}

const AddSubFolderButton = (props: Props) => {
    const [subFolderName, setSubFolderName] = useState<string>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showSuccessAlert, setshowSuccessAlert] = useState<boolean>(false);
    const [showErrorAlert, setshowErrorAlert] = useState<boolean>(false);

    function addSubFolder(){
        axios.post(`${webApi}/folder/${props?.folder?.id}/subfolders?subFolderName=${subFolderName}`)
        .then(response =>{ 
            setshowSuccessAlert(true);
            setTimeout(() => {
                props.setFolder(new FolderDTO(response.data));
                setshowSuccessAlert(false);
            },5500);
        })
        .catch(error => {
            console.log(error)
            setshowErrorAlert(true);
            setTimeout(() => {
                setshowErrorAlert(false);
            },5500);
        });
    }

    const alertSuccess = () => {
        if(showSuccessAlert) return(
                    <NotificationComponent header='Ανέβηκε!' body='🥳🎉 Ο φάκελος προστέθηκε με επιτυχία!' color={colors.shamrock_green} />
                )
    }

    const alertError = () => {
         if (showErrorAlert) return(
            <NotificationComponent header='Failed' body='😞🌧️ Ωχ, κάτι πήγε στραβά' color={colors.carrot_orange} />
        )
    }

    const handleSubmit = () => {
        setShowModal(false);
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
                        Δημιουργία νέου φακέλου
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FloatingLabel label="Όνομα φακέλου">
                        <FormControl type='text' placeholder='' value={subFolderName} onChange={(e) => setSubFolderName(e.target.value)} />
                        </FloatingLabel>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button className='border-0' style={{background:colors.carrot_orange}} onClick={()=> setShowModal(false)}>
                        Ακύρωση
                    </Button>
                    <Button className='border-0' style={{background:colors.shamrock_green}} onClick={handleSubmit}>
                      <FolderPlus className='me-1' />  Δημιουργία
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
        <Button variant='light'size='lg' onClick={() => setShowModal(true)} >
            <FolderPlus color={colors.carrot_orange}/> Νέος φάκελος
        </Button>
    </div>
  )
}

export default AddSubFolderButton;