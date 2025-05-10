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
import { IDriver, IVehicle } from "@/helpers/types";
import { useRouter } from "next/navigation";

type DriverModalProps = {
  mode: "View" | "Delete";
  data?: IDriver;
  button?: React.ReactNode;
  onConfirm?: (mode: "Delete") => Promise<void>;
};

const DriverModal = ({ mode, data, onConfirm, button }: DriverModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const title = `${mode} Driver`;
  const isViewMode = mode === "View";
  const isDeleteMode = mode === "Delete";
  const buttonText = isDeleteMode ? "Confirm Delete" : "Done";

  const handleConfirm = async () => {
    if (isDeleteMode && onConfirm) {
      await onConfirm("Delete");
      router.refresh();
      onClose();
    }
  };

  return (
    <div>
      {button ? (
        <button onClick={onOpen}>{button}</button>
      ) : (
        <Button onPress={onOpen} color="primary">
          {mode} Driver
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {isDeleteMode ? (
              <p>Are you sure you want to delete this driver?</p>
            ) : (
              <>
                <p>
                  <strong>Driver Information:</strong>
                </p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            {isDeleteMode && (
              <Button color="primary" onPress={handleConfirm}>
                {buttonText}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DriverModal;
