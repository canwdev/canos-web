import './window.scss'
import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'
import {WindowController} from './window-controller.ts'
import clsx from 'clsx'

const MyComponent = forwardRef((options: any, ref) => {
  const {
    children,
    taskItem,
    titleBarLeft,
    titleBarRightControls,
    titleBarRight,
    onClose,
    onActive,
  } = options

  useImperativeHandle(ref, () => ({
    setActive() {
      dWindowRef.current!.updateZIndex()
    },
  }))

  const titleBarRef = useRef<HTMLDivElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const titleBarButtonsRef = useRef<HTMLDivElement | null>(null)
  const dWindowRef = useRef<WindowController>()

  useEffect(() => {
    dWindowRef.current = new WindowController({
      // @ts-ignore
      dragHandleEl: titleBarRef.current,
      // @ts-ignore
      dragTargetEl: dialogRef.current,
      allowOut: true,
      // opacify: 0.8,
      // @ts-ignore
      preventNode: titleBarButtonsRef.current,
      onMove(data) {},
      onActive,
      autoPosOnResize: true,
      isDebug: true,
      resizeable: true,
    })

    return () => {
      if (dWindowRef.current) {
        dWindowRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="canos-window themed-frame" ref={dialogRef}>
      <div className="canos-window-content">
        <div ref={titleBarRef} className="canos-title-bar">
          <div className="canos-title-bar-inner">
            <div className="canos-title-bar-text">
              {titleBarLeft || (
                <>
                  <img className="window-icon" src={taskItem.icon} alt={taskItem.title} />
                  {taskItem.title}
                </>
              )}
            </div>
            <div ref={titleBarButtonsRef} className="canos-window-controls">
              {titleBarRightControls}
              {titleBarRight ? (
                titleBarRight
              ) : (
                <button onClick={onClose} className={clsx('_danger btn-no-style themed-frame')}>
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="canos-window-body _bg _scrollbar_mini">{children}</div>
      </div>
    </div>
  )
})

export default MyComponent
