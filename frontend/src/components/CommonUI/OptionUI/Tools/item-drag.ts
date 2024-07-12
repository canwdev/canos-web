export const generateItemDragProps = ({index, cb}) => {
  const getEl = (event) => event.target.closest('.sub-item')
  return {
    draggable: true,
    onDragstart: (event) => {
      const el = getEl(event)
      // console.log('onDragStart', el)
      event.dataTransfer.setData('data-transfer-index', index)
    },
    onDragover: (event) => {
      event.preventDefault()
      const el = getEl(event)
      // console.log('onDragOver', el)
      el.classList.add('_drag-over')
    },
    onDragleave: (event) => {
      event.preventDefault()
      const el = getEl(event)
      // console.log('onDragLeave', el)
      el.classList.remove('_drag-over')
    },
    onDrop: (event) => {
      event.preventDefault()
      const el = getEl(event)
      // console.log('onDrop', el)
      el.classList.remove('_drag-over')
      const oldIndex = Number(event.dataTransfer.getData('data-transfer-index'))
      cb(oldIndex, index, event)
    },
  }
}
