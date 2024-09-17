import { Dropdown, DropdownDivider} from 'react-bootstrap'
import { fileIcons } from '../FileIcons'

type Props = {
    fileTypes:string[];
    selectedFileType: string;
    setSelectedFileType: (fileType:string) => void;
}

const FileTypeFilterButton = (props: Props) => {

    return (
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          {props.selectedFileType}
        </Dropdown.Toggle>
        <Dropdown.Menu >
            {props.fileTypes.map((type,index) => {
            return (
                <div>
                    <Dropdown.Item key={type} onClick={() => props.setSelectedFileType(type)}>
                        {fileIcons[type.toLowerCase()]} {type}
                    </Dropdown.Item>
                    {index < props.fileTypes.length - 1 && <DropdownDivider />}
                </div>
            )
            })}
        </Dropdown.Menu>
      </Dropdown>
    )
  }

export default FileTypeFilterButton