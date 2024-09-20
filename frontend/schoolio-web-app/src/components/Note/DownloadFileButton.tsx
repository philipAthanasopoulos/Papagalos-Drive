import { Button } from 'react-bootstrap'
import { Download } from 'react-bootstrap-icons'

type Props = {
    downloadString:string,
    filename:string
}

export const DownloadFileButton = (props: Props) => {
  return (
    <a href={props.downloadString} download={props.filename}>
        <Button className="rounded-pill border-0" >
            <Download/> <span>Download</span>
        </Button>
    </a>
  )
}