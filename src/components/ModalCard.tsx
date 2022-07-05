import React, { Children } from "react";
import { Button, Modal } from "native-base";

interface Props {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  buttonCancel: string;
  buttonConfirm: string;
  buttonConfirmColor: "danger.400" | "tertiary.500";
}

const ModalCard: React.FC<Props> = ({
  isOpen,
  title,
  children,
  onCancel,
  onConfirm,
  buttonCancel,
  buttonConfirm,
  buttonConfirmColor,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Content w="90%">
        <Modal.Header
          bg="darkBlue.700"
          _text={{ color: "white", fontSize: "lg" }}
          borderBottomWidth={0}
          p={5}
        >
          {title}
        </Modal.Header>
        <Modal.Body bg="darkBlue.700" p={5}>
          {children}
        </Modal.Body>
        <Modal.Footer bg="darkBlue.700" borderTopWidth={0} p={5}>
          <Button
            variant="ghost"
            onPress={onCancel}
            _text={{ color: "white" }}
            mr={5}
          >
            {buttonCancel}
          </Button>
          <Button
            bg={buttonConfirmColor}
            _text={{ color: "white" }}
            onPress={onConfirm}
          >
            {buttonConfirm}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalCard;
