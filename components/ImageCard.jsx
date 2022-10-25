import { Card, Text } from "@nextui-org/react"


export default function ImageCard({props}) {

  return (
    <Card

      css={{ mw: "400px", margin:'50px',h:'500px'}}
    >
      <Card.Image src={props.image} style={{maxWidth:'300px'}}>
      
      </Card.Image>
      <Card.Body>
        <Text h2>{props.displayTitle}</Text>
        <Text>{props.description}</Text>
      </Card.Body>
    </Card>
  );
}
