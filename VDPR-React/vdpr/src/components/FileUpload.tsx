import { useCallback, useEffect, useState } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import axios from "axios";

import Dropzone from "./FileControl";
import ErrorAlert from "./ErrorAlert";

const FileUpload = () => {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getStatus = useCallback(async (taskId: string) => {
    try {
      const res = await axios({
        // this method should be get because we will use it to fetch the file every 5 seconds until the file is ready
        //method: "GET",
        method: "GET",
        // url: `${process.env.NEXT_PUBLIC_HEROKU_TASKS_URL}/${taskId}`,
        url: `http://localhost:3000/parse`,
      });
      console.log(res);

      // fetch api every five seconds until api responses with file
      if (res.data.status) {
        setTimeout(() => {
          getStatus(res.data.task_id);
        }, 5000);
      } else {
        setLoading(false);
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

  return (
    <Box mb={8} w="full">
      <Box mb={8}>
        <Box flexDirection="row" mb={2}>
          <Heading mr={2} fontSize="2xl" display="inline-block">
            You'll need your transcript to get started:{" "}
            <Button colorScheme={"teal"}>
              Learn How
            </Button>
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