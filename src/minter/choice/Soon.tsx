import { GiIsland } from 'react-icons/gi'
import { Button } from '~/components/ui/button'

const Soon = () => {
  return (
    <div>
      <div>
        <GiIsland />
        <h2>Offshore</h2>
      </div>
      <p>Explore new horizons</p>
      <div>
        <Button disabled={true}>Learn More</Button>
        <Button>Coming soon</Button>
      </div>
    </div>
  )
}

export default Soon
