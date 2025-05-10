import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Textarea,
} from "@heroui/react";
import { IContactForm } from "@/helpers/types";
import { useRouter } from "next/navigation";

type UserModalProps = {
  mode?: string;
  data?: IContactForm;
  button?: React.ReactNode;
  onConfirm?: () => Promise<void>;
  onClick?: (event: any) => Promise<void>;
};

const UserModal = ({
  mode = "View",
  data,
  onConfirm,
  button,
  onClick,
}: UserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const title = `${mode} Message`;
  const isViewMode = mode === "View";
  const isDeleteMode = mode === "Delete";
  const buttonText = isDeleteMode ? "Confirm Delete" : "Done";

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
      router.refresh();
    }
    onClose();
  };

  return (
    <div>
      {button ? (
        <button
          onClick={() => {
            onOpen();
            if (onClick) {
              onClick(event);
            }
          }}
        >
          {button}
        </button>
      ) : (
        <Button onPress={onOpen} color="primary">
          {mode} Message
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {isDeleteMode ? (
              <p>
                Are you sure you want to delete{" "}
                <span className="underline">{data?.name}</span> with email{" "}
                <span className="underline">{data?.email}</span>?
              </p>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {data?.name}
                </p>
                <p>
                  <strong>Email:</strong> {data?.email}
                </p>
                <Textarea
                  label="Message"
                  value={data?.message || ""}
                  disabled={isViewMode}
                  minRows={4}
                  fullWidth
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            {!isViewMode && (
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

export default UserModal;
