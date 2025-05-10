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

// Props type definition
import { IVehicle } from "@/helpers/types";

type VehicleModalProps = {
  mode: "View" | "Delete";
  data?: IVehicle;
  button?: React.ReactNode;
  onConfirm?: (mode: "Delete") => Promise<void>;
};

const VehicleModal = ({ mode, data, onConfirm, button }: VehicleModalProps) => {
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
              <p>Are you sure you want to delete this vehicle?</p>
            ) : (
              <>
                <p>
                  <strong>Vehicle Information:</strong>
                </p>
                <p>Model: {data?.model}</p>
                <p>Make: {data?.make}</p>
                <p>Year: {data?.year}</p>
              </>
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

export default VehicleModal;
