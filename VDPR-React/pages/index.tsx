import { useCallback, useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  Heading, 
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

import Dropzone from "../components/Dropzone";
import ErrorAlert from "../components/ErrorAlert";
import router from "next/router";
import PDFStepper from "../components/PDFStepper";

const FileUpload = () => {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getStatus = useCallback(async (taskId: string) => {
    try {
      const res = await axios({
        // this method should be get because we will use it to fetch the file every 5 seconds until the file is ready
        method: "GET",
        // url: `${process.env.NEXT_PUBLIC_HEROKU_TASKS_URL}/${taskId}`,
        url: `http://localhost:3000/requirements`,
      });

      // fetch api every five seconds until api responses with file
      if (res.data.status) {
        setTimeout(() => {
          getStatus(res.data.task_id);
        }, 5000);
      } else {
        setLoading(false);
        router.push({
            pathname: "/results",
            query: { results: JSON.stringify(res.data) },
        }, '/results')
      }
    } catch (err) {
      setTaskId(null);
      setLoading(false);
      setError("There is a problem with the file format or network");
    }
  }, []);

  // fetch when task_id is available
  useEffect(() => {
    if (taskId !== null) {
      getStatus(taskId);
    }
  }, [taskId, getStatus]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box m="0 auto" maxW={700} transition="0.5s ease-out">
      <Box mb={8}>
        <Box flexDirection="row" mb={2}>
          <Heading mr={2} fontSize="2xl" display="inline-block">
            You will need your transcript to get started:{" "}
            <Button colorScheme={"teal"} onClick={onOpen} marginLeft={3}>
              Learn How
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <PDFStepper />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='teal' mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Heading>
        </Box>
      </Box>

      <Box mb={20}>
        <Dropzone
          setTaskId={setTaskId}
          setError={setError}
          loading={loading}
          setLoading={setLoading}
        />
        {error ? <ErrorAlert error={error} setError={setError} /> : null}
      </Box>
    </Box>
  );
}

export default FileUpload