import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DrawTemplateOnCanvas from "../DrawTemplateOnCanvas/DrawTemplateOnCanvas";
import { handleIsDrawingState, handleStopDrawingState } from "../../../../redux/slices/CommonSlice";

const DownloadButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    dispatch(handleStopDrawingState());
  };

  const handleOpen = () => {
    onOpen();
    dispatch(handleIsDrawingState());
  };
  return (
    <>
      <div
        onClick={handleOpen}
        className="flex justify-center items-center gap-x-1 p-1 w-36 rounded-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
      >
        <ArrowDownwardIcon /> Download
      </div>

      <Modal isOpen={isOpen} onClose={handleClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Download Your Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="mx-auto">
            <DrawTemplateOnCanvas />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
            <div>
              <Select placeholder="Select Resolution">
                <option value="option1">1024 x 768</option>
                <option value="option2">800 x 600</option>
                <option value="option3">320 x 200</option>
              </Select>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DownloadButton;
