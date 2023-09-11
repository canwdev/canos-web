import './window.scss'
import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'
import {WindowController} from './window-controller.ts'

const MyComponent = forwardRef((options: any, ref) => {
  const {children, titleBarLeft, titleBarRightControls, titleBarRight, onClose, onActive} = options

  useImperativeHandle(ref, () => ({
    setActive() {
      dWindowRef.current!.updateZIndex()
    },
  }))

  const titleBarRef = useRef()
  const dialogRef = useRef()
  const titleBarButtonsRef = useRef()
  const dWindowRef = useRef<WindowController>()

  useEffect(() => {
    dWindowRef.current = new WindowController({
      dragHandleEl: titleBarRef.current,
      dragTargetEl: dialogRef.current,
      allowOut: true,
      opacify: 0.8,
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
    <div className="vp-window" ref={dialogRef}>
      <div className="vp-window-content">
        <div ref={titleBarRef} className="page-craft-title-bar">
          <div className="page-craft-title-bar-text">{titleBarLeft}</div>
          <div ref={titleBarButtonsRef} className="vp-window-controls">
            {titleBarRightControls}
            {titleBarRight ? (
              titleBarRight
            ) : (
              <button onClick={onClose} className="_danger">
                X
              </button>
            )}
          </div>
        </div>

        <div className="vp-window-body _bg _scrollbar_mini">{children}</div>
      </div>
    </div>
  )
})

export default MyComponent
