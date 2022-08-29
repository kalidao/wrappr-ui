import { useCallback } from 'react'
import { BubbleMenu } from '@tiptap/react'
import { BsTypeBold, BsTypeItalic, BsTypeStrikethrough, BsLink45Deg } from 'react-icons/bs'
import { IconButton } from '@chakra-ui/react'

export default function Menu({ editor }: { editor: any }) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])
  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <IconButton
            aria-label="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            <BsTypeBold />
          </IconButton>
          <IconButton
            aria-label="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <BsTypeItalic />
          </IconButton>
          <IconButton
            aria-label="strike"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <BsTypeStrikethrough />
          </IconButton>
          <IconButton aria-label="add link" onClick={setLink} className={editor.isActive('bold') ? 'is-active' : ''}>
            <BsLink45Deg />
          </IconButton>
        </BubbleMenu>
      )}
    </>
  )
}
