import React, { Component, Key } from 'react'

type Props = {
    fileName: string,
    file: string
}

class Note extends Component<Props> {
  fileName: string;
  file: string;

  constructor(props: Props) {
    super(props);
    this.fileName = props.fileName;
    this.file = props.file;
  }

  render() {

    return (
        <div>
            <h1>{this.props.fileName}</h1>
            <div>
                {this.props.file && <img src={`data:image/jpeg;base64,${this.props.file}`} alt={this.props.fileName} />}
            </div>
        </div>
    )
  }
}

export default Note;