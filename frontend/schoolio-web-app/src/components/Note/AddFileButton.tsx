import axios from 'axios';
import React, {FormEvent, useState} from 'react';
import {
    Button,
    FloatingLabel,
    Form,
    FormControl,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle
} from 'react-bootstrap';
import {FileEarmarkArrowUp} from 'react-bootstrap-icons';
import colors from '../../colors';
import {NotificationComponent} from '../Notifications/NotificationComponent';
import {FolderDetailedDTO} from "../Folder/FolderDetailedDTO";
import {getFolderById} from "../../api/api";
import {uploadNote} from "../../api/api";

type Props = {
    folder?: FolderDetailedDTO
}

const AddFileButton = (props: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showSuccessAlert, setshowSuccessAlert] = useState<boolean>(false);
    const [showErrorAlert, setshowErrorAlert] = useState<boolean>(false);
    const [file, setFile] = useState<File>();
    const [fileName, setFileName] = useState<string>("")
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (file) {
            const fileArrayBuffer = await file.arrayBuffer();
            const fileBytes = new Uint8Array(fileArrayBuffer);

            const note = {
                name: fileName,
                type: file.name.substring(file.name.lastIndexOf('.') + 1).toUpperCase(),
                data: Array.from(fileBytes),
                parentFolderId: props.folder?.id
            };

            console.log(note);
            uploadNote(props.folder?.id!, note)
                .then(() => {
                    setshowSuccessAlert(true);
                    setTimeout(() => {
                        setshowSuccessAlert(false);
                        getFolderById(props.folder?.id!).then((folder) => {
                            console.log(props.folder)
                            setshowSuccessAlert(false);
                        });
                    }, 3000);
                })
                .catch(error => {
                    setshowErrorAlert(true);
                    setTimeout(() => {
                        setshowErrorAlert(false);
                    }, 3000);
                });

            setShowModal(false);
        }
    }

    const alertSuccess = () => {
        if (showSuccessAlert) return (
            <NotificationComponent header='Ανέβηκε!' body='🥳🎉Το αρχείο προστέθηκε με επιτυχία!'
                                   color={colors.shamrock_green}/>
        )
    }

    const alertError = () => {
        if (showErrorAlert) return (
            <NotificationComponent header='Ουπς!' body='😞🌧️ Ωχ, κάτι πήγε στραβά' color={colors.carrot_orange}/>
        )
    }

    return (
        <div>
            <div>
                {alertSuccess()}
                {alertError()}
            </div>
            <div>
                <Button variant="light" size='lg' onClick={() => setShowModal(true)}>
                    <FileEarmarkArrowUp color={colors.shamrock_green}/> Ανέβασμα αρχείου
                </Button>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Form onSubmit={handleSubmit}>
                        <ModalHeader>
                            <ModalTitle>Δημιουργία νέου αρχείου</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <Form.Group controlId="formFile" className="mb-3">
                                <FloatingLabel label="Όνομα αρχείου">
                                    <FormControl required type="text" placeholder='' value={fileName}
                                                 onChange={(e) => setFileName(e.target.value)}/>
                                </FloatingLabel>
                                <br/>
                                <FormControl required type="file" className='btn btn-secondary' onChange={(e) => {
                                    const files = (e.target as HTMLInputElement).files;
                                    if (files && files.length > 0) setFile(files[0]);
                                }}/>
                            </Form.Group>
                        </ModalBody>
                        <ModalFooter>
                            <Button className='border-0' onClick={() => setShowModal(false)}
                                    style={{background: colors.carrot_orange}}>
                                Ακύρωση
                            </Button>
                            <Button className='border-0' type='submit' style={{background: colors.shamrock_green}}>
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