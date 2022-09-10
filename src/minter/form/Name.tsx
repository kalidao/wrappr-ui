import { Button } from '@chakra-ui/react'
import { StoreT } from '../types'
import { AiFillQuestionCircle, AiFillCheckCircle, AiFillExclamationCircle } from 'react-icons/ai'

type Props = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
}

export default function Name({ store, setStore }: Props) {
  return (
    <div className="flex gap-5 items-start ">
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="name"
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-brand-500 focus:outline-none focus:ring-0 focus:border-brand-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-600 peer-focus:dark:text-brand-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>
      {store?.entity === 'llc' && (
        <Button leftIcon={<AiFillQuestionCircle />} colorScheme="brand" variant="ghost">
          Check
        </Button>
      )}
    </div>
  )
}
