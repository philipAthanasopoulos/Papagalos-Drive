import { useEffect, useState } from 'react'
import { Toast, ToastBody, ToastHeader } from 'react-bootstrap'
import "./NotificationComponent.css"

type Props = {
    header:string,
    body:string
    color?:string
    timeOut?: number
}

export const NotificationComponent = (props: Props) => {
    const [show,setShow] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setShow(false), props.timeOut || 5000);
    })

  return (
        <Toast show={show} onClose={() => setShow(false)} className='toast-entry' style={{ zIndex: "11", position: "fixed", background:`${props.color}` }}>
            <ToastHeader>
                <strong>{props.header}</strong>
            </ToastHeader>
            <ToastBody className='text-light'>
                {props.body}
            </ToastBody>
        </Toast>
  )
}