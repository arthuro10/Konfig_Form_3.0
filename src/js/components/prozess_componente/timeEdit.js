import React from "react"
import { Card, Label, Form, Segment, Input } from 'semantic-ui-react'


const zentriert = {
    marginLeft: "auto",
    marginRight: "auto"
  }

function TimeEdit (props) {


    return(
            <Card>
                <Card.Content>
                    <Form >
                    <Form.Field>
                        <Label color={"teal"}>{props.inputName}</Label>
                        <Input id={props.id} type="time" placeholder='Edit...' style={zentriert} onChange={props.onChangeFunction}  />
                        <Segment>
                        <Input id={props.id} placeholder='call a function' style={zentriert} onChange={props.onChangeCallFunction}  />
                        </Segment> 
                    </Form.Field>                
                    </Form>
                </Card.Content>
            </Card>
    );
}

export default TimeEdit;