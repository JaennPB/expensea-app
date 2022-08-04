import { Button, Modal, Text } from "native-base";

import CustomKeyboardAV from "./UI/CustomKeyboardAV";
import CustomInput from "../components/UI/CustomInput";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  email: string;
  value: string;
  onChangeText: (text: string) => void;
}

const DeleteAccModal: React.FC<Props> = ({
  isOpen,
  onCancel,
  onConfirm,
  email,
  value,
  onChangeText,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <CustomKeyboardAV bgColor={null}>
        <Modal.Content w="80%">
          <Modal.Header
            bg="darkBlue.700"
            _text={{ color: "white", fontSize: "lg" }}
            borderBottomWidth={0}
            p={5}
          >
            Please enter your password to delete account and data
          </Modal.Header>
          <Modal.Body bg="darkBlue.700" p={5}>
            <Text color="white" fontSize="lg" mb={5} ml={1}>
              {email}
            </Text>
            <CustomInput
              title="Password"
              type="default"
              onChangeText={onChangeText}
              value={value}
              autoCapitalize="none"
            />
          </Modal.Body>
          <Modal.Footer bg="darkBlue.700" borderTopWidth={0} p={5}>
            <Button
              variant="ghost"
              onPress={onCancel}
              _text={{ color: "white", fontSize: "md", fontWeight: "medium" }}
              mr={5}
            >
              Cancel
            </Button>
            <Button
              _text={{ color: "white", fontSize: "md", fontWeight: "medium" }}
              onPress={onConfirm}
              bg="danger.400"
              _pressed={{
                backgroundColor: "danger.500",
              }}
            >
              Delete account
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </CustomKeyboardAV>
    </Modal>
  );
};

export default DeleteAccModal;
