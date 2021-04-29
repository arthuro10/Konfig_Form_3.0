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

    const isDisabled = this.props.disabled || false;
    let _disabled = false;
    if(isDisabled === true){
        _disabled = true;
    }

        return(
            <Card >
                <Segment>
                    <Label color={"teal"}>{this.props.inputName}</Label>
                    <Header>{this.props.text}</Header>
                    <Button disabled={_disabled} content={this.props.inputName} id={this.props.id} style={zentriert} color={this.props.color} onClick={this.props.onClickFunction} >True?</Button>
                </Segment>
            </Card>
        );

    }
    
}


