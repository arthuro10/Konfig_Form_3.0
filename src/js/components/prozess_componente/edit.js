import React from "react"
import { Card, Label, Form, Segment, Input } from 'semantic-ui-react'


const zentriert = {
    marginLeft: "auto",
    marginRight: "auto"
  }

function Edit (props) {

    const isDisabled = props.disabled || false;
    let _disabled = false;
    if(isDisabled === true){
        _disabled = true;
    }

    return(
            <Card>
                <Card.Content>
                    <Form >
                    <Form.Field>
                        <Label color={"teal"}>{props.inputName}</Label>
                        <Input disabled={_disabled} id={props.id} placeholder='Edit...' style={zentriert} onChange={props.onChangeFunction}  />
                        <Segment>
                        <Input disabled={_disabled} id={props.id} placeholder='call a function' style={zentriert} onChange={props.onChangeCallFunction}  />
                        </Segment> 
                    </Form.Field>                
                    </Form>
                </Card.Content>
            </Card>
    );
}

export default Edit;

