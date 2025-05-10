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

import { IUser, IVehicle } from "@/helpers/types";

type UserModalProps = {
  mode: "View" | "Delete";
  data?: any;
  button?: React.ReactNode;
  onConfirm?: (mode: "Delete") => Promise<void>;
};

const DeletePocModal = ({ mode, data, onConfirm, button }: UserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const title = `${mode} Vehicle`;
  const isViewMode = mode === "View";
  const isDeleteMode = mode === "Delete";
  const buttonText = isDeleteMode ? "Confirm Delete" : "Done";

  const handleConfirm = async () => {
    if (isDeleteMode && onConfirm) {
      await onConfirm("Delete");
      onClose();
    }
  };

  return (
    <div>
      {button ? (
        <button onClick={onOpen}>{button}</button>
      ) : (
        <Button onPress={onOpen} color="primary">
          {mode} Vehicle
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {isDeleteMode ? (
              <p>Are you sure you want to delete this poc?</p>
            ) : (
              <></>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="flat" onPress={onClose}>
              Close
            </Button>
            {isDeleteMode && (
              <Button color="danger" onPress={handleConfirm}>
                {buttonText}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeletePocModal;
