import Image from 'next/image'
import { Text, Box } from '@kalidao/reality'
type Props = { title: string; description: string; to: string }

export default function Banner({ title, description, to }: Props) {
  return (
    <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 p-1 rounded-lg">
      <a href={to} target="_blank" rel="nooppenner">
        <Box>
          <div className="flex-col">
            <Text as="h2">{title}</Text>
            <Text as="p">{description}</Text>
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
        </Box>
      </a>
    </div>
  )
}
