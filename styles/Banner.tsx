import Image from 'next/image'

type Props = { title: string; description: string; to: string }

export default function Banner({ title, description, to }: Props) {
  return (
    <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 p-1 rounded-lg">
      <a href={to} target="_blank" rel="nooppenner">
        <div className="flex justify-evenly items-center bg-gradient-to-r from-zinc-900 to-black rounded-lg p-1 hover:from-black hover:to-zinc-900">
          <div className="flex-col">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-brand-400 to-brand-700">
              {title}
            </h2>
            <p className="text-md font-md text-neutral-300">{description}</p>
          </div>
          <div>
            <Image
              src={'/logo.png'}
              height={'100%'}
              width={'100%'}
              alt={`Wrappr logo`}
              className="hover:animate-spin"
            />
          </div>
        </div>
      </a>
    </div>
  )
}
