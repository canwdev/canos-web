import {NButton, NDropdown, NIcon} from 'naive-ui'
import {MoreVertical20Regular} from '@vicons/fluent'

export const renderMoreIconButton = () =>
  h(
    NButton,
    {
      size: 'small',
      quaternary: true,
      circle: true,
      onClick: (e) => {
        e.stopPropagation()
      },
    },
    () => h(NIcon, {size: '20'}, () => h(MoreVertical20Regular)),
  )

export const renderNDropdownMenu = (options) =>
  h(
    NDropdown,
    {
      trigger: 'hover',
      placement: 'bottom-end',
      keyField: 'label',
      options,
    },
    renderMoreIconButton,
  )
