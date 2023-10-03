import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'

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
    'You are loved ♡.',
  ]
  return (
    <div className="flex flex-col items-start">
      <p>The following disclaimer applies to any interaction with Lexy:</p>
      {terms.map((term, i) => (
        <div key={i} className="flex flex-row justify-between">
          <p>{i + 1}.</p>
          <p key={i}>{term}</p>
        </div>
      ))}

      <Label>
        I have read and understood the disclaimer.
        <Checkbox onCheckedChange={() => setChecked(!checked)} />
      </Label>
    </div>
  )
}

export default Disclaimer
