<template>
  <div>
    <span><button @click="fn('text')">text</button></span>
    <span><button @click="fn('success')">success</button></span>
    <span><button @click="fn1('error')">error</button></span>
    <span><button @click="fn('warning')">warning</button></span>
    <span><button @click="fn2('loading')">loading</button></span>
    <span><button @click="fn3">elmessage</button></span>
  </div>
</template>

<script setup lang="ts">
import Message from '@/components/myMessage'
import 'remixicon/fonts/remixicon.css'
import '../components/myMessage/src/Message.scss'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
// console.log(Message)

const fn = (arr: string) => {
  Message[arr](`this is a ${arr}`)
}
const fn1 = (arr: string) => {
  Message.error({
    content: `this is a ${arr}`,
    duration: 3000,
    closeable: true
  })
}
const fn2 = (arr: string) => {
  Message.loading({
    content: `this is a ${arr}`,
    duration: 3000,
    closeable: true
  })
}
const fn3 = () => {
  console.log('fn3')

  ElMessage('this is a message.')
}
</script>

<!-- <style scoped lang="less">
.message {
  color: red;
}
</style> -->
