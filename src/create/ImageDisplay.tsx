import { useWatch } from 'react-hook-form'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ImageDisplay({ control }) {
  const selectedImage = useWatch({
    control,
    name: 'image',
    defaultValue: '',
  })
  const [image, setImage] = useState('')

  useEffect(() => {
    const reader = new FileReader()
    const image = reader.readAsDataURL(selectedImage)
    if (image) {
      setImage(image)
    }
  }, [selectedImage])

  console.log('selectedImage', selectedImage[0])
  return <div>{selectedImage != 'default' && <Image src={image} height="500px" width="500px" />}</div>
}
