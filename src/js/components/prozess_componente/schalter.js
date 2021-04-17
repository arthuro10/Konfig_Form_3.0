import React from "react"
import { Card, Button, Header, Segment, Label } from 'semantic-ui-react'


const zentriert = {
    marginLeft: "auto",
    marginRight: "auto"
  }

export default class Schalter extends React.Component {
    constructor(props){
        super(props);
        
    }    

    render(){

        return(
            <Card >
                <Segment>
                    <Label color={"teal"}>{this.props.inputName}</Label>
                    <Header>{this.props.text}</Header>
                    <Button content={this.props.inputName} id={this.props.id} style={zentriert} color={this.props.color} onClick={this.props.onClickFunction} >True?</Button>
                </Segment>
            </Card>
        );

    }
    
}


