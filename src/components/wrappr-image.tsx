import Image from 'next/image'

import { AspectRatio } from '~/components/ui/aspect-ratio'

export function WrapprImage({ src }: { src: string }) {
  return (
    <div className="w-[30rem]">
      <AspectRatio ratio={1 / 1}>
        <Image src={src} alt="Image" className="rounded-md object-cover" layout="fill" />
      </AspectRatio>
    </div>
  )
}
