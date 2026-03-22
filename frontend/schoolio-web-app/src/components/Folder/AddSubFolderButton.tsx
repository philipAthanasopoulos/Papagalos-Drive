import React, {useState} from 'react';
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
import colors from '../../colors';
import {NotificationComponent} from '../Notifications/NotificationComponent';
import {addSubFolder, getFolderById} from "../../api/api";
import {FolderDetailedDTO} from "./FolderDetailedDTO";
import "./AddSubFolderButton.css"

type Props = {
    folder?: FolderDetailedDTO
}

const AddSubFolderButton = (props: Props) => {
    const [subFolderName, setSubFolderName] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showSuccessAlert, setshowSuccessAlert] = useState<boolean>(false);
    const [showErrorAlert, setshowErrorAlert] = useState<boolean>(false);

    function handleAddSubFolder() {
        addSubFolder(props.folder?.id!, {name: subFolderName})
            .then(() => {
                setshowSuccessAlert(true);
                setTimeout(() => {
                    getFolderById(props.folder?.id!).then((folder) => {
                        setshowSuccessAlert(false);
                    });
                }, 3000);
            })
            .catch((error: any) => {
                setshowErrorAlert(true);
                setTimeout(() => {
                    setshowErrorAlert(false);
                }, 5500);
            });
    }

    const alertSuccess = () => {
        if (showSuccessAlert) return (
            <NotificationComponent header='Ανέβηκε!' body='🥳🎉 Ο φάκελος προστέθηκε με επιτυχία!'
                                   color={colors.shamrock_green}/>
        )
    }

    const alertError = () => {
        if (showErrorAlert) return (
            <NotificationComponent header='Failed' body='😞🌧️ Ωχ, κάτι πήγε στραβά' color={colors.carrot_orange}/>
        )
    }

    const handleSubmit = () => {
        setShowModal(false);
        handleAddSubFolder();
    }


    return (
        <div>
            <div>
                <div>
                    {alertSuccess()}
                    {alertError()}
                </div>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Form onSubmit={handleSubmit}>
                        <ModalHeader>
                            <ModalTitle>
                                Δημιουργία νέου φακέλου
                            </ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <FloatingLabel label="Όνομα φακέλου">
                                <FormControl type='text' placeholder='' value={subFolderName}
                                             onChange={(e) => setSubFolderName(e.target.value)} required/>
                            </FloatingLabel>
                        </ModalBody>
                        <ModalFooter>
                            <Button className='border-0' style={{background: colors.carrot_orange}}
                                    onClick={() => setShowModal(false)}>
                                <div className="emoji-text">✖ Ακύρωση</div>
                            </Button>
                            <Button type='submit' className='border-0' style={{background: colors.shamrock_green}}>
                                <div className="emoji-text">✅ Δημιουργία</div>
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
            <Button variant='light' size='lg' onClick={() => setShowModal(true)}>
                <span className={"emoji-text"}>
                📁Νέος φάκελος
                </span>
            </Button>
        </div>
    )
}

export default AddSubFolderButton;