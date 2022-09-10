import { EditorContent } from '@tiptap/react'
import { Flex } from '@chakra-ui/react'
import Menu from './Menu'

export default function Editor({ editor }: { editor: any }) {
  return (
    <Flex>
      <Menu editor={editor} />
      <EditorContent editor={editor} />
    </Flex>
  )
}
