import { Stack, Text, Spinner } from '@kalidao/reality'

export default function Loader({
    message,
}: {
    message: string,
}) {
    return <Stack>
        {message != '' && <Text>{message}</Text>}
        <Spinner />
    </Stack>
}