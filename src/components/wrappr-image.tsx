import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

export function WrapprImage({ src }: { src: string }) {
  return (
    <Avatar>
      <AvatarImage src={src} alt="NFT Image" className="w-24 h-24 object-cover rounded-md" />
      <AvatarFallback />
    </Avatar>
  )
}
