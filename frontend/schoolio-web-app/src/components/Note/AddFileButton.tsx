import React, { FormEvent, useState } from 'react'
import {webApi} from '../../env/env'
import { Button, FloatingLabel, Form, FormControl, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import axios from 'axios';
import { FileEarmarkArrowUp} from 'react-bootstrap-icons';
import colors from '../../colors';
import { NotificationComponent } from '../Notifications/NotificationComponent';
import { FolderDTO } from '../Folder/FolderDTO';

type Props = {
    folder?:FolderDTO,
    setFodler:React.Dispatch<React.SetStateAction<FolderDTO | undefined>>
}

const AddFileButton = (props: Props) => {
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
            axios.post(`${webApi}/folder/${props?.folder?.id}/notes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                setshowSuccessAlert(true);
                setTimeout(() => {
                    setshowSuccessAlert(false);
                    props.setFodler(new FolderDTO(response.data));
                },5500);
            })
            .catch(error => {
                setshowErrorAlert(true);
                setTimeout(() => {
                    setshowErrorAlert(false);
                },5500);
            });
    
            setShowModal(false);
        }
    }

    const alertSuccess = () => {
        if(showSuccessAlert) return(
            <NotificationComponent header='Ανέβηκε!' body='🥳🎉Το αρχείο προστέθηκε με επιτυχία!' color={colors.shamrock_green} />
        )
    }

    const alertError = () => {
        if(showErrorAlert) return(
            <NotificationComponent header='Ουπς!' body='😞🌧️ Ωχ, κάτι πήγε στραβά' color={colors.carrot_orange} />
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
                <FileEarmarkArrowUp color={colors.shamrock_green}/> Ανέβασμα αρχείου
            </Button>
            
            <Modal show={showModal} onHide={() =>setShowModal(false)} >
                <Form onSubmit={handleSubmit}>
                    <ModalHeader>
                        <ModalTitle>Δημιουργία νέου αρχείου</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                    <Form.Group controlId="formFile" className="mb-3" >
                        <FloatingLabel label= "Όνομα αρχείου">
                            <FormControl required type = "text" placeholder='' value={fileName} onChange={(e) => setFileName(e.target.value)} />
                        </FloatingLabel>
                        <br />
                        <FormControl required type="file" className='btn btn-secondary' onChange={(e) => {
                            const files = (e.target as HTMLInputElement).files;
                            if (files && files.length > 0) setFile(files[0]);
                        }}/>
                    </Form.Group>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='border-0' onClick={()=> setShowModal(false)} style={{background:colors.carrot_orange}} >
                            Ακύρωση
                        </Button>
                        <Button className='border-0' type='submit' style={{background:colors.shamrock_green}}>
                            <FileEarmarkArrowUp className='me-1'/> Ανέβασμα
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    </div>
  )
}

export default AddFileButton;