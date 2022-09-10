type CardProps = {
  name: string
  icon?: React.ReactNode
  onClick: React.MouseEventHandler
}
const Card = ({ name, icon, onClick }: CardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-1 rounded-lg justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 bg-zinc-800 hover:bg-brand-700 focus:ring-4"
    >
      {icon}
      <p>{name}</p>
    </button>
  )
}

export default Card
