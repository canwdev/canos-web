// using ES6 modules
import mitt from 'mitt'

const globalEventBus = mitt()

export default globalEventBus

export const GlobalEvents = {
  ACTION_PLAY: 'ACTION_PLAY',
  ACTION_PAUSE: 'ACTION_PAUSE',
  ACTION_TOGGLE_PLAY: 'ACTION_TOGGLE_PLAY',
  ACTION_CHANGE_CURRENT_TIME: 'ACTION_CHANGE_CURRENT_TIME',
  ACTION_LOCATE_FILE: 'ACTION_LOCATE_FILE',
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
