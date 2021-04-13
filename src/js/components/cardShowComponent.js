import React from "react"
import { Grid, Form,Card, Icon, Image, Divider, Header, Input,Modal, Segment, GridColumn, Dropdown} from 'semantic-ui-react'

const zentriert = {
    marginLeft: "auto",
    marginRight: "auto"
  }

function ShowCard_Content (props) {
    return(
                  <Card.Content extra>
                    <Form >
                        <Form.Field>
                        <Header>Input: {props.inputName}</Header>
                        <Header>Datentyp: {props.datatype}</Header>
                        <Segment>
                        <Input id={props.id} placeholder='call a function' style={zentriert} onChange={props.onChangeCallFunction}  />
                        </Segment>
                        {/*
                        <Divider></Divider>
                        <Header>data: {props.data}</Header>
                        */}
                        
                        </Form.Field>    
                    </Form>
                </Card.Content>
             
    );
  }

export default ShowCard_Content