type Props = {
  label: string
  value: number
  max: number
}

export default function Progress({ label, value, max }: Props) {
  const percentage = (value / max) * 100

  return (
    <>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-brand-700 dark:text-white">{label}</span>
        <span className="text-sm font-medium text-brand-700 dark:text-white">{value + ' of ' + max}</span>
      </div>
      <div className="w-full bg-zinc-900 rounded-md h-3 dark:bg-gray-700">
        <div className={`bg-brand-200 h-3 rounded-md w-[${percentage.toString()}]`}></div>
      </div>
    </>
  )
}
