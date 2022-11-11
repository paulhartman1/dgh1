import { Card, Text } from "@nextui-org/react"


export default function ImageCard({props}) {

  return (
    <Card
      css={{ mw: "300px", margin:'10px',h:'400px'}}
      isPressable
    >
      <Card.Image src={props.image} style={{maxWidth:'200px', marginTop:'10px'}}>
      </Card.Image>
      <Card.Body>
        <Text h2>{props.displayTitle}</Text>
        <Text>{props.description}</Text>
      </Card.Body>
    </Card>
  );
}
