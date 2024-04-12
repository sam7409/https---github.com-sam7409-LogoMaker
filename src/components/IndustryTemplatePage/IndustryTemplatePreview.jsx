import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ModalHeader,
} from "@chakra-ui/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Tooltip } from "@chakra-ui/react"; // Import Tooltip from Chakra UI

const IndustryTemplatePreview = ({ templateUrl, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="Preview" placement="top">
        <div
          className="bg-white p-2 rounded-lg cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        >
          <VisibilityIcon />
        </div>
      </Tooltip>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent className="w-3/5 bg-white">
          <ModalHeader>{`${type}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img src={`${templateUrl}`} alt="" />
          </ModalBody>
          <ModalFooter className="mx-auto">
            <Button
              as={"a"}
              href="/logo-maker/dashboard"
              colorScheme="blue"
              mr={3}
              onClick={onClose}
            >
              Use this template
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IndustryTemplatePreview;
