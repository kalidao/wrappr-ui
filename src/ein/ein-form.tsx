import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Input } from '~/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Calendar } from '~/components/ui/calendar'
import { cn } from '~/utils'
import { format } from 'date-fns'
import { CalendarIcon } from '@radix-ui/react-icons'
import { createPdf } from '~/utils/createPdf'

const taxEntity = [
  { value: 'select', label: 'Select' },
  { value: 'sole', label: 'Sole Proprietor (single member)' },
  { value: 'partnership', label: 'Partnership (multiple members)' },
  { value: 'c-corp', label: 'C-Corporation' },
  { value: 's-corp', label: 'S-Corporation' },
]

const schema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  ssn: z.string().min(1, { message: 'This field required' }),
  date: z.z.date({
    required_error: 'This field is required',
  }),
  activity: z.any(),
  taxEntity: z.string(),
})

export const EinForm = ({ orgType, orgName }: { orgType: string; orgName: string }) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>,
    )
    const { name, ssn, date, activity, taxEntity } = data

    const pdf = {
      entityType: orgType,
      entityName: orgName,
      userName: name,
      userSsn: ssn,
      formationDate: date.toDateString(),
      taxEntity: taxEntity,
      activity: activity,
    }

    createPdf(pdf)
  }

  if (orgType !== 'LLC' && orgType !== 'UNA') {
    return null
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of responsible person</FormLabel>
              <FormDescription>Line 7a of Form SS-4</FormDescription>
              <FormControl>
                <Input {...field} placeholder="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxEntity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Entity</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {taxEntity.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Pick how your LLC is to be taxed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ssn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SSN / ITIN</FormLabel>
              <FormDescription>Line 7b of Form SS-4</FormDescription>
              <FormControl>
                <Input {...field} placeholder="Social Security Number / Individual Taxpayer Identification Number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Formation</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Line 11 of Form SS-4</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Describe services or products provided" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate SS-4</Button>
      </form>
    </Form>
  )
}
