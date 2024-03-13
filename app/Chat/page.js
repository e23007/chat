'use client'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { redirect, useRouter } from 'next/navigation'
import {
  Center,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  Button
} from '@chakra-ui/react'

const socket = io('http://localhost:5000')
const Chat = () => {
  const router = useRouter()
  const [name, setName] = useState()
  const [id, setId] = useState()
  const [message, setMessage] = useState('')
  const [list, setList] = useState([])
  const handleClick = () => {
    // サーバーへの送信
    if (message === '') return
    socket.emit('send_message', { id, name, message })
    setMessage('')
  }
  // サーバーから受信
  socket.on('received_message', data => {
    setList([...list, data])
  })
  useEffect(() => {
    const userName = JSON.parse(window.localStorage.getItem('userName'))
    console.log(userName)
    const userId = JSON.parse(window.localStorage.getItem('userId'))
    setName(userName)
    setId(userId)
    if (!name) return redirect('/')
  }, [])
  return (
    <Center h='calc(100vh)'>
      <VStack w='100%' h='calc(100vh)'>
        <HStack w='100%' h='calc(10vh)' bg='black'>
          <Button w='5%' onClick={() => router.push('/')}>
            ⇦
          </Button>
          <Heading w='95%' color='white' textAlign='center'>
            Chat app
          </Heading>
        </HStack>
        <VStack w='100%' p='5%' h='calc(75vh)' overflowY='scroll'>
          {list.map((chat, index) => (
            <Text
              key={index}
              w='100%'
              fontSize='md'
              bg={index % 2 === 0 ? 'white' : 'gray.300'}
              align={chat.id === id ? 'right' : 'left'}
            >
              {chat.name}:{chat.message}
            </Text>
          ))}
        </VStack>
        <HStack w='100%' h='calc(15hv)'>
          <Input
            onChange={event => setMessage(event.target.value)}
            value={message}
            type='text'
            size='md'
            bg='white'
            placeholder='Messageを送信'
          />
          <Button onClick={handleClick}>送信</Button>
        </HStack>
      </VStack>
    </Center>
  )
}
export default Chat
