import { useCallback } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Flex, Button, useColorMode } from "@chakra-ui/react";
import { useRouter } from 'next/router'

interface DropzoneProps {
  loading: boolean;
  setLoading: (bool: boolean) => void;
  setTaskId: (taskId: string | null) => void;
  setError: (error: string | null) => void;
}
export default function Dropzone({
  loading,
  setLoading,
  setTaskId,
  setError,
}: DropzoneProps) {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const onDrop = useCallback(
    (acceptedFiles: (string | Blob)[]) => {
      let formData = new FormData();
      formData.append("uploadfile", acceptedFiles[0]);
      axios({
        // method should be "POST",
        method: "POST",
        // url: process.env.NEXT_PUBLIC_HEROKU_PARSE_URL,
        url: "http://localhost:3000/parse",
        data: formData,
      })
        .then((res) => {
          // force batch update to prevent extra render
          unstable_batchedUpdates(async () => {
            setTaskId(res.data.task_id);
            setLoading(true);
          });
        })
        .catch((err) => {
          setTaskId(null);
          setLoading(false);
          setError(err.message);
        });
    },
    [setTaskId, setError, setLoading]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/pdf': ['.pdf']
    },
    disabled: loading,
  });

  return (
    <div {...getRootProps({ className: "dropzone disabled" })}>
      <Flex
        flexDirection="column"
        alignItems="center"
        py={40}
        borderWidth={4}
        borderRadius={6}
        // borderStyle="dashed"
        borderColor={colorMode === "light" ? "gray.300" : "gray.400"}
        bgColor={colorMode === "light" ? "gray.200" : "gray.500"}
        outline="none"
      >
        <input {...getInputProps()} formEncType="multipart/form-data" />
        {isDragActive ? (
          <p>Drag and drop files here...</p>
        ) : (
          <>
            {loading ? null : <p>Upload your transcript</p>}
            <Button
              colorScheme={loading ? "" : "teal"}
              mt={2}
              isLoading={loading}
              loadingText="Analizing your progress..."
              variant={loading ? "ghost" : "solid"}
            >
              Select File
            </Button>
          </>
        )}
      </Flex>
    </div>
  );
}