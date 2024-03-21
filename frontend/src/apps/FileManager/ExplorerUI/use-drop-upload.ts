import {useDropZone} from '@vueuse/core'

export const useDropUpload = (onDrop) => {
  const dropZoneRef = ref<HTMLDivElement>()

  const {isOverDropZone} = useDropZone(dropZoneRef, {
    onDrop,
  })

  return {
    isOverDropZone,
    dropZoneRef,
  }
}
