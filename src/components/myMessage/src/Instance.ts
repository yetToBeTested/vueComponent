import { createVNode, reactive, ref, render } from 'vue'
import type { AppContext, Ref } from 'vue'
import MessageList from './MessageList.vue'
import type { MessageConfig, MessageItem } from './type'

class MessageManager {
  private container: HTMLElement | null
  private readonly messageList: Ref<MessageItem[]>
  private vm: any
  constructor(appContext?: AppContext) {
    this.messageList = ref([])

    const mask = document.createElement('div')
    mask.setAttribute('class', `bp-mask-message`)
    this.container = mask

    this.vm = createVNode(MessageList, {
      list: this.messageList.value,
      onAlose: this.remove
    })
    if (appContext) {
      this.vm.appContext = appContext
    }
    // render(vm, this.container)
    // document.body.appendChild(this.container)
  }

  /**
   * 添加消息提示
   * @param {MessageConfig} config
   * @returns
   */
  add = (config: MessageConfig) => {
    if (this.messageList.value.length === 0) {
      render(this.vm, this.container as HTMLElement)
      document.body.appendChild(this.container as HTMLElement)
    }
    const id = config.id ?? `_bp_message_${Math.random().toString()}`

    const message: MessageItem = reactive({ id, ...config })
    this.messageList.value.push(message)

    // 处理可能存在的同时移除情况。
    const len = this.messageList.value.length
    if (len > 1 && this.messageList.value[len - 1]?.duration === message.duration) {
      message.duration = message.duration ?? 3000 + 200 * len
    }

    return {
      close: () => this.remove(id)
    }
  }

  /**
   * 移除消息提示
   * @param {string | number} id 消息id
   */
  remove = (id: string | number) => {
    for (let i = 0; i < this.messageList.value.length; i++) {
      const { id: itemId } = this.messageList.value[i]

      if (id === itemId) {
        this.messageList.value.splice(i, 1)
        break
      }
    }
    if (this.messageList.value.length === 0) {
      render(null, this.container as HTMLElement)
      this.container?.remove()
    }
  }

  clear = () => {
    this.messageList.value = []
  }

  removeDom = () => {
    return this.messageList.value.length === 0 ? true : false
  }
}

export default MessageManager
