import React from "react"
import { Card, Header, Segment, Label, Divider } from 'semantic-ui-react'

function OutputComp (props) {


    return(
            <Card>
                <Card.Content>
                    <Segment textAlign={"center"}>
                        <Label color={"red"}>DATENTYP</Label>
                        <Header>{props.datatype}</Header>
                    </Segment>
                    <Divider></Divider>
                    <Segment textAlign={"center"}>
                        <Label color={"red"}>OUTPUT</Label>
                        <Header>{props.output}</Header>
                    </Segment>   
                </Card.Content>
            </Card>
    );
}

export default OutputComp;

