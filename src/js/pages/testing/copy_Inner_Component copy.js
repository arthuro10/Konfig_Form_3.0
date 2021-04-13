import React from "react"
import { Grid, Form,Card, Icon, Image, Button, Header, Input, Label, Radio, Segment, GridColumn, Dropdown} from 'semantic-ui-react'
import { observer } from "mobx-react";


// der Store auf den gehört werden soll wird hier eingebunden
import modellierStore from "../../stores/Modellier_Store"

// Die ganzen Komponenten
import Schalter from '../../components/prozess_componente/schalter'
import Edit from '../../components/prozess_componente/edit'
import InputComp from '../../components/prozess_componente/inputComp'
import OutputComp from '../../components/prozess_componente/outputComp'

const zentriert = {
  marginLeft: "auto",
  marginRight: "auto"
}

// Die editier Komponente
@observer
export default class Inner_Component extends React.Component {
  constructor(props) {
    super(props); 

    this.prozessData = [];

    this.showCards = [];
    this.showOutput = [];
    this.showInput = [];

    this.text = "False!"
    this.oneTime = true;

    this.edit = "Editieren";
    this.show = "Anzeigen";
    
    
    this.state = {
      showLine : "",
      color : 'red',
      boolean : false
      
    };

 }

 Card_Content (prozName,inputName,id) {
  return(
    <Card.Content extra>
                <h1>{prozName}</h1>
                <Form >
                  <Form.Field>
                    <Label>{inputName}</Label>
                    <Input id={id} placeholder='Edit...' style={zentriert} onChange={this.onChangeEdit.bind(this)}  />
                    <Segment>
                    <Input placeholder='call a function' style={zentriert} onChange={this.onChangeCallFunction.bind(this)}  />
                    </Segment>
                    
                  </Form.Field>    
                              
                  </Form>
              </Card.Content>
  );
}
 Output_Content (_output,_datatype) {
  return(
    <OutputComp output={_output} datatype={_datatype} />
  );
}

onClickButton(){
  if(this.state.color === "red"){
    this.setState({
      color: "green"
    })
    this.text = "True!";
  }else{
    this.setState({
      color: "red"
    })
    this.text = "False!"
  }
  
}

onChangeEdit(a,b){
  
  modellierStore.changeValues(b.id,b.value);

}
onChangeCallFunction(a,b){
  switch(b.value){
    case 'run':
      this.run();
      break;
    case '':
      break;
    case 'button':
      this.setState({
      boolean : !this.state.boolean
      })
      break;
    default:
      console.log("So eine Funktion ist nicht verfügbar");
      break;

  }

}

run(){
  console.log("You say Run!");
}

onClickEdit(){

  window.location.href = '/#/innercompshow';
}

  render() {


    const {dieProzesse} = modellierStore;
    const prozData = [...dieProzesse];

    {
      if(this.oneTime === true){
        var i;
        console.log(prozData);
        for(i = 0; i< prozData.length; i++){
          const name = prozData[i].name;
          this.prozessData = [...prozData[0].InputArr];
          console.log(this.prozessData.length);
          var j;
          for(j = 0; j<this.prozessData.length;j++){
            console.log("?");
            if(this.prozessData[j].isEdit){
              this.showCards.push(this.Card_Content(name,this.prozessData[j].input,this.prozessData[j].id));
            }
            
          }
          
        }
      }
      this.oneTime = false;
    }

    const cardButton =  <Card>
                          <Segment>
                            <Header>{this.text}</Header>
                            <Button style={zentriert} color={this.state.color} onClick={this.onClickButton.bind(this)} >True?</Button>
                          </Segment>
                        </Card>
   
    
      
        return (
          <Grid columns='equal'>
          <Grid.Row stretched>
            <Grid.Column>
              <Header>INPUT</Header>
              <InputComp />
            </Grid.Column>

            <Grid.Column width={6}>
            <Card>
                <Card.Content>
                <Card.Header>Editieren</Card.Header>

              </Card.Content>

            </Card>
            <Card>
              {this.showCards}
            </Card>

            {this.state.boolean === true ? cardButton : ""}

            <Schalter color={this.state.color}
            prozessName={"Provisorisch"} 
            onClickFunction={this.onClickButton.bind(this)} />

            <Edit
            prozessName={""}
            id={1}
            onChangeFunction={this.onChangeEdit.bind(this)}
            onChangeCallFunction={this.onChangeCallFunction.bind(this)} />

            <Card>
                <Card.Content>
                  <Card.Header>Bestätigen</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Button primary onClick={this.onClickEdit.bind(this)}> Edit bestätigen</Button>
                </Card.Content>
            </Card>

            
            
            </Grid.Column>

            <Grid.Column>
              {this.showOutput}
              <OutputComp />
            </Grid.Column>
          </Grid.Row>

        </Grid>
        );
    }
}

