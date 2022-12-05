import { VStack, Text, HStack, Checkbox } from '@chakra-ui/react'

const Disclaimer = ({
  checked,
  setChecked,
}: {
  checked: boolean
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const terms = [
    'This chatbot is not a substitute for legal advice from a qualified lawyer.',
    'The chatbot does not provide any legal advice and should not be relied upon as such.',
    'Any information provided by the chatbot is for informational purposes only and should not be taken as legal advice.',
    'The chatbot is not a lawyer and does not have the authority to provide legal advice.',
    'The chatbot does not guarantee the accuracy of any information provided through it.',
    'Any decisions made based on information provided by the chatbot are the sole responsibility of the user.',
    'The chatbot is not responsible for any consequences that may arise from using the information provided.',
  ]
  return (
    <VStack align="flex-start" gap="0">
      <Text>The following disclaimer applies to any interaction with this legal assistance AI chatbot:</Text>
      {terms.map((term, i) => (
        <HStack width="full" justify={'space-between'} backgroundColor="gray.600" padding="1">
          <Text>{i + 1}.</Text>
          <Text key={i} width="full">
            {term}
          </Text>
        </HStack>
      ))}

      <Checkbox onChange={() => setChecked(!checked)}>I have read and understood the disclaimer.</Checkbox>
    </VStack>
  )
}

export default Disclaimer
