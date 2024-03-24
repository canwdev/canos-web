import mitt from 'mitt'

const explorerBus = mitt()

export default explorerBus

export const ExplorerEvents = {
  REFRESH: 'REFRESH',
}

export const useExplorerBusOn = (event: string, fn: any) => {
  onMounted(() => {
    explorerBus.on(event, fn)
  })
  onBeforeUnmount(() => {
    explorerBus.off(event, fn)
  })
}
