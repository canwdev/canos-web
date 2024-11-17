import mitt from 'mitt'

const globalEventBus = mitt()

export default globalEventBus

export const GlobalEvents = {
  GLOBAL_EVENT_LOGOUT: 'global_event_logout',
  SEND_TO_DESKTOP: 'send_to_desktop',
}

export const useGlobalBusOn = (event: string, fn: any) => {
  onMounted(() => {
    globalEventBus.on(event, fn)
  })
  onBeforeUnmount(() => {
    globalEventBus.off(event, fn)
  })
}
