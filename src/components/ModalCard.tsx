import React, { Children } from "react";
import { Button, Modal } from "native-base";

interface Props {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ModalCard: React.FC<Props> = ({
  isOpen,
  title,
  children,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Content w="80%">
        <Modal.Header
          bg="darkBlue.700"
          _text={{ color: "white", fontSize: "lg" }}
          borderBottomWidth={0}
        >
          {title}
        </Modal.Header>
        <Modal.Body bg="darkBlue.700">{children}</Modal.Body>
        <Modal.Footer bg="darkBlue.700" borderTopWidth={0}>
          <Button
            variant="ghost"
            bg="danger.400"
            onPress={onCancel}
            _text={{ color: "white" }}
            mr={5}
          >
            Cancel
          </Button>
          <Button
            bg="tertiary.500"
            _text={{ color: "white" }}
            onPress={onConfirm}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalCard;
