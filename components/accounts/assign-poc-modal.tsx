"use client";
import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Input,
  Spinner,
} from "@heroui/react";
import { assignPOC, getAllPocs } from "@/actions/poc-actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserRoundPlus } from "lucide-react";

const AssignPocModal = ({
  data,
  fetchFreshData,
  isAssistedUsers,
  search=""
}: {
  data: any;
  fetchFreshData: any;
  isAssistedUsers?:boolean,
  search?:string
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allPocs, setAllPocs] = useState([]);
  const [filteredPocs, setFilteredPocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPocs = async () => {
    setLoading(true);

    const params = {
      limit: 999999,
    };

    const { error, data: pocsData } = await getAllPocs(params);
    if (error) {
      setAllPocs([]);
      setFilteredPocs([]);
    } else {
      setAllPocs(pocsData || []);
      setFilteredPocs(pocsData || []);
    }
    console.log({ pocsData });
    setLoading(false);
  };

  const assignPOCHandler = async (pocId: number | string) => {
    const userId = data?.id;
    toast.promise(
      assignPOC(pocId, userId).then((result) => {
        if (result.error) {
          throw new Error(result.error);
        }
        console.log({ result });
        if (result.data) {
          fetchFreshData({ query: "", page: 1, limit: 10, search: search , is_document_assistance_enabled:isAssistedUsers});
        }
        return result;
      }),
      {
        loading: "Assigning Poc to user...",
        success: "Poc has been assigned successfully!",
        error: "Error Poc assigning.",
      }
    );
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = allPocs.filter((poc: any) =>
        poc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPocs(filtered);
    } else {
      setFilteredPocs(allPocs);
    }
  }, [searchQuery, allPocs]);

  useEffect(() => {
    if (isOpen) {
      fetchPocs();
    }
  }, [isOpen]);

  return (
    <>
      <button onClick={onOpen}>
        <UserRoundPlus size={18} color={"#8e8e8e"} />
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Assign Poc To User</ModalHeader>
          <ModalBody>
            <div className="mb-4">
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="flex justify-center flex-col items-center h-32">
                <Spinner size={"md"} color="success" />
                <p className="ml-2">Loading POCs...</p>
              </div>
            ) : (
              <section className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {filteredPocs?.length > 0 ? (
                  filteredPocs?.map((poc: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border-b"
                    >
                      {/* IMAGE! */}
                      <div className="flex items-center gap-2">
                        <img
                          src={poc?.picture || "/default-user.jpg"}
                          alt={poc?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <p className="text-sm font-medium">{poc?.name}</p>
                      </div>

                      <Button
                        onPress={() => {
                          assignPOCHandler(poc?.id);
                        }}
                        color="primary"
                        size="sm"
                      >
                        Assign
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    {searchQuery
                      ? "No matching POCs found."
                      : "No POCs available."}
                  </p>
                )}
              </section>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="flat" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssignPocModal;
