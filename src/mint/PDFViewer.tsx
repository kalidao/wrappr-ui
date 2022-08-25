import { Box } from '@chakra-ui/react'

export default function PDFViewer({ src }: { src: string }) {
  return (
    <Box width="100%">
      <iframe src={src} width="100%" height="500px"></iframe>
    </Box>
  )
}
