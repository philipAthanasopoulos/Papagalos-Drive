import {Button, Container} from 'react-bootstrap'
import {Download} from 'react-bootstrap-icons'
import colors from "../../colors";

type Props = {
    downloadString: string,
    filename: string
}

export const DownloadFileButton = (props: Props) => {
    return (
        <a href={props.downloadString} download={props.filename}>
            <Button className="rounded-pill border-0" style={{backgroundColor: colors.carrot_orange}}>
                💾 <span>Download</span>
            </Button>
        </a>
    )
}