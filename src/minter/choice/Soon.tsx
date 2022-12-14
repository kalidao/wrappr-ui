import { Stack, Button, Text } from '@kalidao/reality'
import { GiIsland } from 'react-icons/gi'

const Soon = () => {
  return (
    <Stack>
      <Stack>
        <GiIsland />
        <Text as="h2">Offshore</Text>
      </Stack>
      <Text as={'p'}>Explore new horizons</Text>
      <Stack>
        <Button disabled={true}>Learn More</Button>
        <Button>Coming soon</Button>
      </Stack>
    </Stack>
  )
}

export default Soon
