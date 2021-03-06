import React from "react"
import { Card, Header, Segment, Label, Divider } from 'semantic-ui-react'


function InputComp (props) {


    return(
        <Card>
                <Card.Content>
                    <Segment textAlign={"center"}>
                        <Label color={"green"}>DATENTYP</Label>
                        <Header>{props.datatype}</Header>
                    </Segment>
                    <Divider></Divider>
                    <Segment textAlign={"center"}>
                        <Label color={"green"}>INPUT</Label>
                        <Header>{props.input}</Header>
                    </Segment>   
                </Card.Content>
            </Card>
    );
}

export default InputComp;

