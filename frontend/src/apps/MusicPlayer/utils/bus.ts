import mitt from 'mitt'

const musicBus = mitt()

export default musicBus

export const MusicEvents = {
  ACTION_PLAY: 'ACTION_PLAY',
  ACTION_PAUSE: 'ACTION_PAUSE',
  ACTION_TOGGLE_PLAY: 'ACTION_TOGGLE_PLAY',
  ACTION_CHANGE_CURRENT_TIME: 'ACTION_CHANGE_CURRENT_TIME',
  ACTION_LOCATE_FILE: 'ACTION_LOCATE_FILE',
}

export const useMusicBusOn = (event: string, fn: any) => {
  onMounted(() => {
    musicBus.on(event, fn)
  })
  onBeforeUnmount(() => {
    musicBus.off(event, fn)
  })
}
