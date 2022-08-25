import { Flex, Button, Checkbox } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

export default function Review() {
  const { isConnected } = useAccount()
  return (
    <Flex flexDirection="column" gap="10px" justifyContent="center" alignItems="flex-end">
      <Checkbox colorScheme="brand">I have read and accept the terms of this agreement.</Checkbox>
      {isConnected && (
        <Button type="submit" width="100%" colorScheme="brand" variant="solid" borderRadius={'none'}>
          Confirm Mint
        </Button>
      )}
    </Flex>
  )
}
