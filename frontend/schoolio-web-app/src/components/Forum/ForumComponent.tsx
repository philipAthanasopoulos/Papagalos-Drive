import {Button, Card} from "react-bootstrap";
import colors from "../../colors";

export const ForumComponent = () => {
  return(

      <Card>
          <Card.Body>
              <Card.Title>📬Forum</Card.Title>
              <Card.Text>
                  🚧🦺 Υπό κατασκευή! 🏗️🚧
              </Card.Text>
          </Card.Body>

          <Card.Link href="/" className="align-self-center mb-3">
              <Button style={{ backgroundColor: colors.shamrock_green }} className="border-0">⬅️Αρχική</Button>
          </Card.Link>
      </Card>
  )
}