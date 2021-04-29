import React from "react"
import uuid from 'react-uuid';
import { Grid, Form,Card, Icon, Modal, Button, Header, Input, Label, Radio, Segment, Divider, Dropdown} from 'semantic-ui-react'
import { observer } from "mobx-react";

// der Store auf den gehört werden soll wird hier eingebunden
import modellierStore from "../stores/Modellier_Store"

// Die ganzen Komponenten
import Schalter from '../components/prozess_componente/schalter'
import Edit from '../components/prozess_componente/edit'
import TimeEdit from '../components/prozess_componente/timeEdit'
import DateEdit from '../components/prozess_componente/dateEdit'
import EditNumber from '../components/prozess_componente/editNumber'
import Range_Slider from '../components/prozess_componente/range_slider'
import InputComp from '../components/prozess_componente/inputComp'
import OutputComp from '../components/prozess_componente/outputComp'
import ShowCardContent from '../components/cardShowComponent'

const zentriert = {
  marginLeft: "auto",
  marginRight: "auto"
}



// Die editier Komponente
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
    this.prozessId = 1;
    
    
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

  }else if(datatype === "time"){
    formContent = <TimeEdit key={uuid()}
    prozessName={prozName}
    inputName={inputName}
    id={id}
    onChangeFunction={this.onChangeEdit.bind(this)}
    onChangeCallFunction={this.onChangeCallFunction.bind(this)} />
  }else if(datatype === "date"){
    formContent = <DateEdit key={uuid()}
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
      <Card.Header>Edit</Card.Header>
      <Divider></Divider>
      {
        formContent
      } 
    </Card.Content>
  );
}
 ShowCard_Content (_inputName,_datatype,_id,_data) {
  return(
        <ShowCardContent key={uuid()}
        inputName={_inputName}
        datatype={_datatype}
        id={_id}
        data={_data}
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
  let createProzessJSON = {name : this.prozessName, prozessId : this.prozessId, InputArr : this.prozessInputData, OutputArr : this.prozessOutputData}
  console.log(createProzessJSON);
  modellierStore.setDieProzess(this.createProzessJSON);
  window.location.hash = '/modelfinished';
}
onClickInteraction(){

  window.location.hash = '/interaction';
}

onClickEditUpdate(){

  window.location.hash = '/resultfin';
}


  render() {

    const btnSpace = {
      marginLeft: "55px",
      marginRight: "5px",
    }

    const {dieProzesse} = modellierStore;
    const prozData = [...dieProzesse];


    {
      if(this.oneTime === true){
        
        console.log(prozData);
        prozData.forEach(item => {
          const name = item.name;
          this.prozessId = item.prozessId;
          this.prozessName = item.name;
          this.prozessInputData = [...item.InputArr];
          this.prozessOutputData = [...item.OutputArr];

          this.prozessInputData.forEach(item => {
            console.log("prozess Input");
            if(item.isEdit){
              this.showCards.push(this.Card_Content(name,item.input,item.id,item.datatype));
            }else{
              this.showCards.push(this.ShowCard_Content(item.input,item.datatype,item.id,item.data));
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

   
      
        return (
          <div>
            <Grid columns='equal'>
              <Grid.Row stretched centered>

                <Grid.Column width={6}>
                  <Card>
                      <Card.Content>
                        <Card.Header>Erstellte Komponente:</Card.Header>
                        <Divider></Divider>
                        <Card.Header><i>{this.prozessName}</i></Card.Header>
                      </Card.Content>
                  </Card>
                  <Card>
                    {this.showCards}
                  </Card>

                  <Card>
                      <Card.Content>
                        <Card.Header>Changes / Update</Card.Header>
                      </Card.Content>
                      <Card.Content>
                        <Button inverted={true} secondary onClick={this.onClickEdit.bind(this)}> Change!</Button>
                        <Button inverted={true} primary style={btnSpace} onClick={this.onClickEditUpdate.bind(this)}> Update!</Button>
                      </Card.Content>
                  </Card>

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


/**
 * {
      if(this.oneTime === true){
        let i;
        console.log(prozData);
        for(i = 0; i< prozData.length; i++){
          const name = prozData[i].name;
          this.prozessId = prozData[i].prozessId;
          this.prozessName = prozData[i].name;
          this.prozessInputData = [...prozData[0].InputArr];
          this.prozessOutputData = [...prozData[0].OutputArr];
          let j;
          for(j = 0; j<this.prozessInputData.length;j++){
            console.log("prozess Input");
            if(this.prozessInputData[j].isEdit){
              this.showCards.push(this.Card_Content(name,this.prozessInputData[j].input,this.prozessInputData[j].id,this.prozessInputData[j].datatype));
            }else{
              this.showCards.push(this.ShowCard_Content(this.prozessInputData[j].input,this.prozessInputData[j].datatype,this.prozessInputData[j].id,this.prozessOutputData[j].data));
            }
            this.showInput.push(this.Input_Content(this.prozessInputData[j].input,this.prozessInputData[j].datatype));
            
          }
          let k;
          for(k = 0; k<this.prozessOutputData.length;k++){
            console.log("prozess Output");

            this.showOutput.push(this.Output_Content(this.prozessOutputData[k].input,this.prozessOutputData[k].datatype));
            
          }
          
        }
      }
      this.oneTime = false;
    }
 */

