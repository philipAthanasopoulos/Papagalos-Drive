import React, { useEffect, useState } from 'react';
import { FolderDTO } from './FolderDTO';
import { Button, FormControl, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import colors from '../../colors';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import axios from 'axios';
import { webApi } from '../../env/env';

type Props = {
  folder?: FolderDTO;
  setFolder: React.Dispatch<React.SetStateAction<FolderDTO | undefined>>;
};

export const EditFolderButton = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>(props.folder?.name || "");

  useEffect(() => {
    setFolderName(props.folder?.name || "" );
  }, [props.folder])
  

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(`${webApi}/folder/${props?.folder?.id}`, {name:folderName});
      props.setFolder(new FolderDTO(response.data))
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        console.error('Conflict error: ', error.response.data);
      } else {
        console.error('An error occurred: ', error);
      }
    }
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>
        <PencilSquare />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <ModalHeader closeButton>
          <ModalTitle>Edit folder</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <InputGroup>
            <InputGroupText>Όνομα φακέλου</InputGroupText>
            <FormControl value={folderName} onChange={(e)=>setFolderName(e.target.value)}/>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button className='border-0' style={{ background: colors.carrot_orange }} onClick={() => setShowModal(false)}>
            Ακύρωση
          </Button>
          <Button className='border-0' style={{ background: colors.shamrock_green }} onClick={handleSubmit}>
            <PencilSquare className='me-1' />  Ενημέρωση
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};