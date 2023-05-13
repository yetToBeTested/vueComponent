import { createVNode, reactive, ref, render } from 'vue'
import type { AppContext, Ref } from 'vue'
import MessageList from './MessageList.vue'
import type { MessageConfig, MessageItem } from './type'

class MessageManager {
  private container: HTMLElement | null
  private readonly messageList: Ref<MessageItem[]>

  constructor(appContext?: AppContext) {
    this.messageList = ref([])

    const mask = document.createElement('div')
    mask.setAttribute('class', `bp-mask-message`)
    this.container = mask

    const vm = createVNode(MessageList, {
      list: this.messageList.value,
      onClose: this.remove
    })
    // console.log(vm)

    if (appContext) {
      vm.appContext = appContext
    }
    render(vm, this.container)
    document.body.appendChild(this.container)
  }

  /**
   * 添加消息提示
   * @param {MessageConfig} config
   * @returns
   */
  add = (config: MessageConfig) => {
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
  }

  clear = () => {
    this.messageList.value = []
  }
}

export default MessageManager
