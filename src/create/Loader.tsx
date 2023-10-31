import Image from 'next/image'

export default function Loader({ message }: { message: string }) {
  return (
    <div>
      {message != '' && <p>{message}</p>}
      <Image alt="Loading" src={'/loading.png'} height="150" width="150" unoptimized />
    </div>
  )
}
