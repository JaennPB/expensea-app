import React, { Children } from "react";
import { Button, Modal } from "native-base";

interface Props {
  isOpen: boolean;
  title: string;
}

const ModalCard: React.FC<Props> = ({ isOpen, title, children }) => {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Content w="80%">
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" bg="danger.400">
            Cancel
          </Button>
          <Button bg="tertiary.500">Save</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalCard;
