import mitt from 'mitt'

const globalEventBus = mitt()

export default globalEventBus

export const GlobalEvents = {
  GLOBAL_EVENT_LOGOUT: 'GLOBAL_EVENT_LOGOUT',
}

export const useGlobalBusOn = (event: string, fn: any) => {
  onMounted(() => {
    globalEventBus.on(event, fn)
  })
  onBeforeUnmount(() => {
    globalEventBus.off(event, fn)
  })
}
