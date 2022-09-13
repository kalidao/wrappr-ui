import React, { useEffect } from 'react'
import Image from 'next/image'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import { BsUpload } from 'react-icons/bs'
import { useDropzone, FileWithPath } from 'react-dropzone'

type UploadProps = {
  file: any
  setFile: any
}

export default function UploadImage({ file, setFile }: UploadProps) {
  const bg = useColorModeValue('gray.100', 'gray.700')
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  const preview = file.map((file: FileWithPath & { preview: 'string' }) => (
    <Flex align="center" justify="center" key={file.path}>
      <Image
        src={file?.preview}
        width={'300px'}
        height={'300px'}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview)
        }}
        alt="Uploaded Image"
      />
    </Flex>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => file.forEach((file: FileWithPath & { preview: 'string' }) => URL.revokeObjectURL(file.preview))
  }, [])

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      gap="10px"
      padding="20px"
      background={bg}
      border="1px"
      borderColor="gray.500"
      borderRadius={'lg'}
      {...getRootProps()}
    >
      {file.length > 0 ? (
        <aside>{preview}</aside>
      ) : (
        <>
          <input {...getInputProps()} />
          <BsUpload size={24} />{' '}
          {isDragActive ? (
            <p>Drop the image here ...</p>
          ) : (
            <p>Drag &apos;n&apos; drop image here, or click to select it</p>
          )}
        </>
      )}
    </Flex>
  )
}
