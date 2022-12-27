import { Text, Stack, Checkbox } from '@kalidao/reality'

const Disclaimer = ({
  checked,
  setChecked,
}: {
  checked: boolean
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const terms = [
    'Lexy is not a substitute for legal advice from a qualified lawyer.',
    'Lexy does not guarantee the accuracy of any information provided.',
    'Any decisions made based on information provided by Lexy are the sole responsibility of the user.',
  ]
  return (
    <Stack align="flex-start">
      <Text>The following disclaimer applies to any interaction with Lexy:</Text>
      {terms.map((term, i) => (
        <Stack key={i} direction="horizontal" justify={'space-between'}>
          <Text>{i + 1}.</Text>
          <Text key={i}>{term}</Text>
        </Stack>
      ))}

      <Checkbox
        label={<Text>I have read and understood the disclaimer.</Text>}
        onCheckedChange={() => setChecked(!checked)}
      />
    </Stack>
  )
}

export default Disclaimer
