'use client'
import { useEffect, useState } from 'react'
import { ulid } from 'ulid'
import { useRouter } from 'next/navigation'
import { Center, VStack, Heading, Input, Button } from '@chakra-ui/react'

const Name = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const handleSet = () => {
    if (name !== '' && name.length < 6) {
      const id = ulid()
      window.sessionStorage.setItem('userName', JSON.stringify(name))
      window.sessionStorage.setItem('userId', JSON.stringify(id))
      router.push('/chat')
      // router.push(`/Chat/?username=${name}&id=${ulid()}`)
    }
  }
  useEffect(() => {
    window.localStorage.clear()
  }, [])
  return (
    <Center>
      <VStack>
        <Heading>ユーザー名</Heading>
        <Input
          onChange={e => setName(e.target.value)}
          type='text'
          placeholder='名前を記入してください'
          size='md'
          bg='white'
        />
        <Button onClick={handleSet}>決定</Button>
      </VStack>
    </Center>
  )
}
export default Name
