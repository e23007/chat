'use client'
import { useRouter } from 'next/navigation'
import { Center, VStack, Heading, Text, Button } from '@chakra-ui/react'

const NotFound = () => {
  const router = useRouter()
  return (
    <Center>
      <VStack>
        <Heading>Not Found</Heading>
        <Text>エラー</Text>
        <Button onClick={() => router.push('/')}>Chatを利用する</Button>
      </VStack>
    </Center>
  )
}
export default NotFound
