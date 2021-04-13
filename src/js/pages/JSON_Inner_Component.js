import React from "react"
import uuid from 'react-uuid'
import { Grid, Form,Card, Icon, Modal, Button, Header, Input, Label, Radio, Segment, Divider, Dropdown} from 'semantic-ui-react'
import { observer } from "mobx-react";

// der Store auf den gehört werden soll wird hier eingebunden
import modellierStore from "../stores/Modellier_Store"

// Die ganzen Komponenten
import Schalter from '../components/prozess_componente/schalter'
import Edit from '../components/prozess_componente/edit'
import EditNumber from '../components/prozess_componente/editNumber'
import Range_Slider from '../components/prozess_componente/range_slider'
import InputComp from '../components/prozess_componente/inputComp'
import OutputComp from '../components/prozess_componente/outputComp'
import ShowCardContent from '../components/cardShowComponent'

const zentriert = {
  marginLeft: "auto",
  marginRight: "auto"
}



// Nur eine Kopie von Inner_Component. 
// Wird aber verwendet für die aus der Datenbank geholten JSON.
@observer
export default class Inner_Component extends React.Component {
  constructor(props) {
    super(props); 

    this.prozessInputData = [];
    this.prozessOutputData = [];

    this.showCards = [];
    this.showOutput = [];
    this.showInput = [];

    this.text = "False!"
    this.boolBtn = false;
    this.colorBtn = "red";
    this.colorBtnArr = [];
    this.oneTime = true;
    this.id = 1;

    this.sliderArr = [];

    this.edit = "Editieren";
    this.show = "Anzeigen";

    this.prozessName = "";
    
    
    this.state = {
      open : false,
      color : 'red',
      boolean : false,
      valueSlider : 1
      
    };

    

 }

 Card_Content (prozName,inputName,id,datatype) {
  console.log("Card Content");
  let formContent;
  if(datatype === "string"){
    formContent = <Edit key={uuid()}
    prozessName={prozName}
    inputName={inputName}
    id={id}
    onChangeFunction={this.onChangeEdit.bind(this)}
    onChangeCallFunction={this.onChangeCallFunction.bind(this)} />
  }else if(datatype === "number"){
    
    formContent = <EditNumber key={uuid()}
                  prozessName={prozName}
                  inputName={inputName}
                  id={id}
                  onChangeFunction={this.onChangeEdit.bind(this)}
                  onChangeCallFunction={this.onChangeCallFunction.bind(this)} />

  }else{
    let i;
    let color = "red";
    let isTrue = "False!";
    let boolValue = 'false';

    this.colorBtnArr.forEach(item => {
      if(item.id === id){
        console.log("EACHHHH");
        color = item.color;
        isTrue = item.isTrue;
        isTrue === "False!" ? boolValue = 'false' : boolValue = 'true';
      }
    });
    
    formContent = <Schalter key={uuid()}
    text={isTrue}
    id={id}
    color={color}
    onClickFunction={this.onClickButton.bind(this)}
    inputName={inputName} />
    this.colorBtnArr.push({color : color, id : id, isTrue : isTrue});
    modellierStore.changeEditValues(id,boolValue);
  }

  return(
    <Card.Content extra key={id}>
      <h1>{this.prozessName}</h1>
      <Divider></Divider>
      {
        formContent
      } 
    </Card.Content>
  );
}
 ShowCard_Content (_inputName,_datatype,_id) {
  return(
        <ShowCardContent key={uuid()}
        inputName={_inputName}
        datatype={_datatype}
        id={_id}
        onChangeCallFunction={this.onChangeCallFunction.bind(this)} />
  );
}

Output_Content (_output,_datatype) {
  return(
    <OutputComp key={uuid()} output={_output} datatype={_datatype} />
  );
}
Input_Content (_input,_datatype) {
  return(
    <InputComp key={uuid()} input={_input} datatype={_datatype} />
  );
}

onClickButton(a,b){
  let i;
  this.showCards.forEach((item,index) =>{
    console.log(index);
    if(item.key === b.id){
      console.log("same");
      i = index;
    }
  });
  if(i === undefined){
    return;
  }
  console.log("no return");
  this.colorBtnArr.forEach(item => {
    if(item.id === b.id){
      if(item.color === 'red'){
        console.log("red");
        item.color = 'green';
        item.isTrue = 'True!';
        this.setState({
          boolean : !this.state.boolean
          })
      }else if(item.color === 'green'){
        console.log("green");
        item.color = 'red';
        item.isTrue = 'False!';
        this.setState({
          boolean : !this.state.boolean
          })
      }
  }
  });    
  this.showCards[i] = this.Card_Content("",b.content,b.id,"bool");
      
}

onChangeEdit(a,b){
  modellierStore.changeEditValues(b.id,b.value);
}


onChangeCallFunction(a,b){
  switch(b.value){
    case 'run':
      this.id = b.id; 
      this.run();
      break;
    case '':
      break;
    case 'concat':
      console.log(b);
      console.log(b.value);
      this.concat(b.id);
      break;
    default:
      console.log("So eine Funktion ist nicht verfügbar");
      break;

  }

}

run(){
  console.log("You say Run!");
  this.setState({
    open: !this.state.open
  })
}


concat(a,b){
  console.log("concat");
  console.log(b.id);
  // Durch Prozesse iterieren
  modellierStore.dieProzesse.forEach(item => {
    console.log("item");
    console.log(item);
    // Durch die Inputs iterieren
    
    let i;
    let j;
    for(i = 0; i<item.InputArr.length;i++){
      if(b.id === item.InputArr[i].id){
        for(j = 0;j<item.OutputArr.length;j++){
          if(i === j){
            item.OutputArr[j].data = item.InputArr[i].input + " " + b.value;
          }
        }
      }
    }

  });
  console.log(...modellierStore.dieProzesse);

}

onChangeBooleanButton(){
  this.setState({
    boolean : !this.state.boolean
    })
}

onClickEdit(){

  window.location.hash = '/result';
}


  render() {


    const {dieProzesse} = modellierStore;
    const prozData = [...dieProzesse];


    {
      if(this.oneTime === true){
        prozData.forEach(item => {
          const name = item.name;
          this.prozessName = item.name;
          this.prozessInputData = [...item.InputArr];
          this.prozessOutputData = [...item.OutputArr];

          this.prozessInputData.forEach(item => {
            console.log("prozess Input");
            if(item.isEdit){
              this.showCards.push(this.Card_Content(name,item.input,item.id,item.datatype));
            }else{
              this.showCards.push(this.ShowCard_Content(item.input,item.datatype,item.id));
            }
            this.showInput.push(this.Input_Content(item.input,item.datatype));
          });

          this.prozessOutputData.forEach(item => {
            console.log("prozess Output");
            this.showOutput.push(this.Output_Content(item.input,item.datatype));

          });
        });
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
          <div>
            <Grid columns='equal'>
              <Grid.Row stretched>
                <Grid.Column>
                  <Header style={zentriert}>INPUT</Header>      
                  {this.showInput}
                </Grid.Column>

                <Grid.Column width={6}>
                  <Card>
                      <Card.Content>
                        <Card.Header>Komponente</Card.Header>
                      </Card.Content>
                  </Card>
                  <Card>
                    {this.showCards}
                  </Card>

                  <Card>
                      <Card.Content>
                        <Card.Header>Bestätigen</Card.Header>
                      </Card.Content>
                      <Card.Content>
                        <Button primary onClick={this.onClickEdit.bind(this)}> Bestätigen</Button>
                      </Card.Content>
                  </Card>
                </Grid.Column>

                <Grid.Column>
                    <Header style={zentriert}>OUTPUT</Header>
                    {this.showOutput}
                </Grid.Column>
              </Grid.Row>

            </Grid>

            <Modal
              basic
              onClose={() => this.setState({open:false})}
              onOpen={() => this.setState({open:false})}
              open={this.state.open}
              size='small'
            >
              <Header icon>
                <Icon name='pencil alternate' />
                Eingabe
              </Header>
              <Modal.Content>
                    <Segment>
                      {console.log(this.id)}
                      <Input id={this.id} placeholder='eingabe...' style={zentriert} onChange={this.concat.bind(this)}  />
                    </Segment>
              </Modal.Content>
              <Modal.Actions>
                <Button color='green' inverted onClick={() => this.setState({open:false})}>
                  <Icon name='checkmark' /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </div>
          
        );
    }
}

