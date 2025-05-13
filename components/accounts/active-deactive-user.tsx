import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";

import { IUser } from "@/types/index.types";

type UserModalProps = {
  mode: "Activate" | "De Activate";
  data?: IUser;
  button?: React.ReactNode;
  onConfirm?: (mode: string) => Promise<void>;
};

const ActivateDeActivateModal = ({
  mode,
  data,
  onConfirm,
  button,
}: UserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const title = `${mode} Vehicle`;
  const isActivateMode = mode === "Activate";
  const osDeActivateMode = mode === "De Activate";
  const buttonText ="Yes";

  const handleConfirm = async () => {
    // if (isDeleteMode && onConfirm) {
    //   await onConfirm("Delete");
    //   onClose();
    // }
  };

  return (
    <div>
      {button ? (
        <button onClick={onOpen}>{button}</button>
      ) : (
        <Button onPress={onOpen} color="primary">
          {mode} User
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <p>{`Are you sure you want to ${mode} this user ?`}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button color="danger" onPress={handleConfirm}>
              {buttonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ActivateDeActivateModal;
