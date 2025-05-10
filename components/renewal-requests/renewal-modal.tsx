"use client";

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@heroui/react";

type DocumentUpdateModalProps = {
  id: string;
  modalFor: "vehicle" | "driver";
  data?: { status?: string; issueDate?: string };
  button?: React.ReactNode;
  onUpdate: (id: string, formData: FormData) => Promise<void>;
};

const DocumentUpdateModal = ({
  id,
  modalFor,
  data,
  button,
  onUpdate,
}: DocumentUpdateModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState(data?.status || "Request Initiated");
  const [file, setFile] = useState<File | null>(null);
  const [issueDate, setIssueDate] = useState(data?.issueDate || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("status", status);
      if (file) {
        formData.append("renewed_document_file", file);
      }
      formData.append("renewed_document_issue_date", issueDate);

      await onUpdate(id, formData);
      await onRefresh();
      onClose();
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {button ? (
        <button onClick={onOpen}>{button}</button>
      ) : (
        <Button onPress={onOpen} color="primary">
          Update Document
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader>
            {modalFor === "vehicle"
              ? "Update Vehicle Document"
              : "Update Driver Document"}
          </ModalHeader>
          <ModalBody>
            <div className="w-full flex justify-between items-center">
              <label htmlFor="status">Status</label>
              <Dropdown>
                <DropdownTrigger>
                  <Button>{status}</Button>
                </DropdownTrigger>
                <DropdownMenu
                  onAction={(key) => setStatus(key as string)}
                  aria-label="Select a status"
                >
                  <DropdownItem key="documents received">
                    Documents Received
                  </DropdownItem>
                  <DropdownItem key="documents verified">
                    Documents Verified
                  </DropdownItem>
                  <DropdownItem key="renewal initiated">
                    Renewal Initiated
                  </DropdownItem>
                  <DropdownItem key="completed">Completed</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <label htmlFor="fileUpload">Upload New Document</label>
              <Input
                type="file"
                id="fileUpload"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <label htmlFor="issueDate">New Issue Date</label>
              <Input
                type="date"
                id="issueDate"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" disabled={isLoading} onPress={handleSubmit}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DocumentUpdateModal;
function onRefresh() {
  throw new Error("Function not implemented.");
}
