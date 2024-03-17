import SelectionArea from '@viselect/vanilla'

export const useSelectionArea = ({
  containerRef,
  onStart,
  onStop,
  toggleClass = 'active',
  selectables = ['.selectable'],
}) => {
  const selectionRef = ref()
  onMounted(() => {
    // https://github.com/simonwep/selection/tree/master/packages/vanilla
    selectionRef.value = new SelectionArea({
      selectables,
      boundaries: [containerRef.value],
      features: {
        touch: false,
        singleTap: {
          allow: false,
        },
      },
      container: containerRef.value,
    })
      .on('start', ({store, event}) => {
        if (!(event as MouseEvent).ctrlKey && !(event as MouseEvent).metaKey) {
          selectionRef.value.clearSelection()
          setTimeout(() => {
            onStart && onStart()
          })
        }
      })
      .on(
        'move',
        ({
          store: {
            changed: {added, removed},
          },
        }) => {
          for (const el of added) {
            el.classList.add(toggleClass)
          }

          for (const el of removed) {
            el.classList.remove(toggleClass)
          }
        }
      )
      .on('stop', ({store: {stored}}) => {
        setTimeout(() => {
          onStop && onStop(stored)
        })
      })
  })
  onBeforeUnmount(() => {
    if (selectionRef.value) {
      selectionRef.value.destroy()
    }
  })

  return {
    selectionRef,
  }
}
