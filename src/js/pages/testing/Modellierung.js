import React from "react"
import { Grid, Form, Button, Header, Input, Label, Radio, Segment, GridColumn, Dropdown } from 'semantic-ui-react'
import { observer } from "mobx-react";
import uuid from 'react-uuid'



const spacing = {
  marginLeft: "35px",
  marginRight: "15px",
};
const BtnSpacing = {
  margin: "5px",
  padding: "5px"
};

const zentriert = {
  marginLeft: "auto",
  marginRight: "auto"
}


// der Store auf den gehört werden soll wird hier eingebunden
import modellierStore from "../stores/Modellier_Store"

import Form_Input from '../components/Form_Input'
import Form_Output from '../components/Form_Output'

 
@observer
export default class Modellierung extends React.Component {
  constructor(props) {
    super(props); 
    this.createProzessJSON = {};
    this.prozessName = "";

    this.Input = [];
    this.Output = [];

    this.simpleBoolean = false;

    
    this.state = {
      NewInputArray : [],
      NewOutputArray : [],
      dummyDatatype : ''
    };
    this.resetVariables();
    
 }


 resetVariables() {
    console.log("Reset Var!");
    this.createProzessJSON = {};
    this.prozessName = "";
    this.Input = [];
    this.Output = [];
    /*this.setState({
      NewInputArray : this.Input,
      NewOutputArray : this.Output
    })*/

 }

 
 handleRadioInputChange = (a,b) => {
   console.log(b);
   console.log(this.Input);
   
  var i;
  for(i = 0; i< this.Input.length;i++){
    console.log(b.id);
    console.log(this.Input[i].idInputArr);
    console.log(this.Input[i].idInputArr[2].radioId);
    if(b.id === this.Input[i].idInputArr[2].radioId){
      this.Input[i].isEdit = !this.Input[i].isEdit;
      console.log(this.Input[i].isEdit);
      var newArr = this.state.NewOutputArray;
      var isDisabled = false;
      var tmpInput = "";
      var tmpDatatype = "";
      
      if(this.Input[i].isEdit === true){
        var tmpInput = this.Input[i].input;
        var tmpDatatype = this.Input[i].datatype;
        isDisabled = true;
        const dropDownId = uuid();
        const formInputId = uuid();
        const btnPlusId = uuid();
        const btnMinusId = uuid();
        var idObj = uuid();
        var isFirst = false;
        if(newArr.length-1 <= 0 || i === 0){
          isFirst = true;
          newArr[i] = []; 
          this.setState({
          NewOutputArray : newArr
          });
          this.Output.pop();
        }
        const createNewOutput = <Form_Output key={b.id} dropDownId={dropDownId} formInputId={formInputId} btnPlusId={btnPlusId} btnMinusId={btnMinusId} isDisabled={isDisabled} isFirst={isFirst}
                                dropDownFunc={this.onChangeOutputSelection.bind(this)}
                                inputFunc={this.onSubmitProzessOutput.bind(this)}
                                btnPlusFunc={this.onClickChangeOutput.bind(this)} 
                                btnMinusFunc={this.onClickMinusOutput.bind(this)} />
        newArr.push(createNewOutput); 
        this.setState({
          NewOutputArray : newArr
        });
        var idArr = [{dropDownId : dropDownId},{formInputId: formInputId},{btnPlusId : btnPlusId},{btnMinusId : btnMinusId},{radioSliderId : b.id}]
        var obj = {idOutputArr : idArr, input : tmpInput, datatype : tmpDatatype, id : idObj, data : ""};
        this.Output.push(obj);
      }else if(this.Input[i].isEdit === false){
        console.log("Is not Edit");
        console.log(b.id);
        console.log(this.Output);
        this.Output = this.Output.filter(item => {
          return (item.idOutputArr[4].radioSliderId !== b.id)
        });
        console.log(this.Output);
        console.log(newArr);
        newArr = newArr.filter(item => (
          (item.key !== b.id)
        ));
        console.log(newArr);
        this.setState({
          NewOutputArray : newArr
        });
        

      }
      
      

    }

  }

 }
 


 onClickChangeInput() {
   console.log("1:" + this.state.NewInputArray);
   const dropDownId = uuid()
   const formInputId = uuid()
   const radioId = uuid()
   const btnPlusId = uuid()
   const btnMinusId = uuid()
   var isFirst = false;
   var idObj = uuid();
   if(this.state.NewInputArray.length <= 0 ){
    isFirst = true;
   }


   const createNewInput = <Form_Input key={uuid()} dropDownId={dropDownId} formInputId={formInputId} radioId={radioId} btnPlusId={btnPlusId} btnMinusId={btnMinusId} isFirst={isFirst} datatype={this.state.dummyDatatype}
                          dropDownFunc={this.onChangeInputSelection.bind(this)}
                          inputFunc={this.onSubmitProzessInput.bind(this)}
                          radioFunc={this.handleRadioInputChange.bind(this)}
                          btnPlusFunc={this.onClickChangeInput.bind(this)} 
                          btnMinusFunc={this.onClickMinusInput.bind(this)} />


    var newArr = this.state.NewInputArray.concat(createNewInput);
    this.setState({ NewInputArray: newArr })
    console.log("2:" + this.state.NewInputArray);
    var idArr = [{dropDownId : dropDownId},{formInputId: formInputId},{radioId : radioId},{btnPlusId : btnPlusId},{btnMinusId : btnMinusId}]
    var obj = {idInputArr : idArr, input : "", datatype : "", isEdit : false, editing : "", id : idObj };
    this.Input.push(obj);

  
 }
 onClickMinusInput(a,b) {
    console.log("1.1:" + this.state.NewInputArray);
    console.log(this.state.NewInputArray)
    
    var newArr = this.state.NewInputArray.filter(item => (
      (item.props.btnMinusId !== b.id)
    ));
    console.log(this.Input);
    this.Input = this.Input.filter(item => (
      (item.idInputArr[4].btnMinusId !== b.id)
    ));
    console.log(this.Input);
    this.setState({ NewInputArray: newArr })

    console.log("2.1:" + this.state.NewInputArray);
    this.simpleBoolean = true;
  
 }
 onClickMinusOutput(a,b) {
  console.log("1.1-:" + this.state.NewOutputArray);
    var newArr = this.state.NewOutputArray.filter(item => (
      (item.props.btnMinusId !== b.id)
    ));
    console.log(this.Output);
    console.log(b.id);
    this.Output = this.Output.filter(item => (
      (item.idOutputArr[3].btnMinusId !== b.id)
    ));
    console.log(this.Output);
    this.setState({ NewOutputArray: newArr })
    console.log("2.1-:" + this.state.NewOutputArray);
    this.simpleBoolean = true;
 }

 onClickChangeOutput() {
  console.log("1-:" + this.state.NewOutputArray);
  const dropDownId = uuid();
  const formInputId = uuid();
  const btnPlusId = uuid();
  const btnMinusId = uuid();
  var isFirst = false;
  var idObj = uuid();
  console.log("ONCLICKCHANGEOUTPUT");
  console.log();
  if(this.state.NewOutputArray.length <= 0){
    isFirst = true;
  }
  const createNewOutput = <Form_Output key={uuid()} dropDownId={dropDownId} formInputId={formInputId} btnPlusId={btnPlusId} btnMinusId={btnMinusId} isDisabled={false} isFirst={isFirst}
                          dropDownFunc={this.onChangeOutputSelection.bind(this)}
                          inputFunc={this.onSubmitProzessOutput.bind(this)}
                          btnPlusFunc={this.onClickChangeOutput.bind(this)} 
                          btnMinusFunc={this.onClickMinusOutput.bind(this)} /> 


    var newArr = this.state.NewOutputArray.concat(createNewOutput);
    this.setState({ NewOutputArray: newArr })
    console.log("2-:" + this.state.NewOutputArray);
    var idArr = [{dropDownId : dropDownId},{formInputId: formInputId},{btnPlusId : btnPlusId},{btnMinusId : btnMinusId}]
    var obj = {idOutputArr : idArr, input : "", datatype : "", id : idObj, data : ""};
    this.Output.push(obj);

  
 }

 onSubmitProzess = () => {
  var isFilled = true;
  this.Input.map(item => {
    if(item.datatype === "" || item.input === ""){
      
      isFilled = false;
    }
  });
  this.Output.map(item => {
    if(item.datatype === "" || item.input === ""){
      isFilled = false;
    }
  });
  if(isFilled === false || this.prozessName === ""){
    alert("Bitte alles ausfüllen");
    return;
  }
  console.log(this.Output);
  console.log(this.Input);

   this.createProzessJSON = {name : this.prozessName, prozessId : uuid(), InputArr : this.Input, OutputArr : this.Output}
   console.log(this.createProzessJSON);
   modellierStore.setDieProzess(this.createProzessJSON);
   console.log(this.Input[0].isEdit);
   if(this.Input[0].isEdit === false){
    window.location.hash = '/innercomp';

   }else{
    window.location.hash = '/innercomp';

   }
   
 }

 onSubmitProzessInput(a,b){
  var i;
  for(i = 0; i< this.Input.length;i++){

    if(b.id === this.Input[i].idInputArr[1].formInputId){
      this.Input[i].input = b.value;
      console.log(this.Input[i].input);

    }

  }
  console.log(this.Input);

 }
 onSubmitProzessOutput(a,b){
  var i;
  for(i = 0; i< this.Output.length;i++){

    if(b.id === this.Output[i].idOutputArr[1].formInputId){
      this.Output[i].input = b.value;
      console.log(this.Output[i].input);

    }

  }
  console.log(this.Output);

 }
 onSubmitProzessName(a,e){
   console.log("onSubmit - ProzessName");
   this.prozessName = e.value;
   console.log("onSubmit - ProzessName: "+ this.prozessName);

 }

 onChangeInputSelection (a,b) {
  var i;
  for(i = 0; i< this.Input.length;i++){
    console.log(b.value);

    if(b.id === this.Input[i].idInputArr[0].dropDownId){
      this.Input[i].datatype = b.value;
      console.log(this.Input[i].datatype);
      this.setState({
        dummyDatatype : b.value
      });
      this.simpleBoolean = true;
    }


  }

 }
 onChangeOutputSelection (a,b) {
  console.log(this.Output);
  var i;
  for(i = 0; i< this.Output.length;i++){
    console.log(b.value);
    console.log(b.id);
    console.log(this.Output[i].idOutputArr[0].dropDownId);

    if(b.id === this.Output[i].idOutputArr[0].dropDownId){
      console.log('Done');
      this.Output[i].datatype = b.value;
      console.log(this.Output[i].datatype);
      this.setState({
        dummyDatatype : b.value
      });
      this.simpleBoolean = true;
    }

  }
  console.log(this.Output);

 }

 updateInput(key, dropDownId, formInputId, radioId, btnPlusId, btnMinusId, isFirst, datatype){
    return(
    <Form_Input key={key} dropDownId={dropDownId} formInputId={formInputId} radioId={radioId} btnPlusId={btnPlusId} btnMinusId={btnMinusId} isFirst={isFirst} datatype={datatype}
    dropDownFunc={this.onChangeInputSelection.bind(this)}
    inputFunc={this.onSubmitProzessInput.bind(this)}
    radioFunc={this.handleRadioInputChange.bind(this)}
    btnPlusFunc={this.onClickChangeInput.bind(this)} 
    btnMinusFunc={this.onClickMinusInput.bind(this)} />
    )
 }
 updateOutput(key, dropDownId, formInputId,btnPlusId, btnMinusId, isFirst, datatype){
    return(
      <Form_Output key={key} dropDownId={dropDownId} formInputId={formInputId} btnPlusId={btnPlusId} btnMinusId={btnMinusId} isDisabled={false} isFirst={isFirst} datatype={datatype}
      dropDownFunc={this.onChangeOutputSelection.bind(this)}
      inputFunc={this.onSubmitProzessOutput.bind(this)}
      btnPlusFunc={this.onClickChangeOutput.bind(this)} 
      btnMinusFunc={this.onClickMinusOutput.bind(this)} />
    )
 }

 changeArrayState(arr, type){
   if(type === "input"){
    this.setState({
      NewInputArray : arr
    });
   }else if(type === "output"){
    this.setState({
      NewOutputArray : arr
    });
   }else{
     console.log("Error");
   }
  
 }



  
  
  render() {

    const spacing = {
      marginLeft: "35px",
      marginRight: "15px",
    };

    const zentriert = {
      marginLeft: "auto",
      marginRight: "auto"


    }

    const kompakt = {
      width: "50%",
      marginLeft: "auto",
      marginRight: "auto"
    }

    const {NewOutputArray} = this.state;
    const {NewInputArray} = this.state;
    const {dummyDatatype} = this.state

    const showInputArray = NewInputArray;

    {if(NewInputArray[0] === undefined){
      this.onClickChangeInput();
    }}

    {if(NewOutputArray[0] === undefined  ){
      this.onClickChangeOutput();
    }}

    if(this.Output.length === 0){
      this.onClickChangeOutput();
    }

    {
      if(this.simpleBoolean){
        var i;
        var arr = [];
        var key, dropDownId, formInputId, radioId, btnPlusId, btnMinusId, isFirst;
        var datatype = "";
        console.log(NewInputArray.length);
        for(i = 0; i<NewInputArray.length; i++){
          key = NewInputArray[i].key;
          dropDownId = NewInputArray[i].props.dropDownId;
          formInputId = NewInputArray[i].props.formInputId;
          radioId = NewInputArray[i].props.radioId;
          btnPlusId = NewInputArray[i].props.btnPlusId;
          btnMinusId = NewInputArray[i].props.btnMinusId;
          isFirst = NewInputArray[i].props.isFirst;
          console.log(dropDownId);
          console.log("input");
          console.log(this.Input[i].idInputArr[0].dropDownId);
          var j;
          for(j = 0; j<this.Input.length;j++){
            if(dropDownId === this.Input[j].idInputArr[0].dropDownId){
              datatype = this.Input[i].datatype;
            }
          }
          arr.push(this.updateInput(key, dropDownId, formInputId, radioId, btnPlusId, btnMinusId, isFirst, datatype));
        }
        this.changeArrayState(arr,"input");
        arr = [];
        console.log(NewOutputArray);
        console.log(NewOutputArray.length);
        for(i = 0; i<NewOutputArray.length; i++){
          key = NewOutputArray[i].key;
          dropDownId = NewOutputArray[i].props.dropDownId;
          formInputId = NewOutputArray[i].props.formInputId;
          btnPlusId = NewOutputArray[i].props.btnPlusId;
          btnMinusId = NewOutputArray[i].props.btnMinusId;
          isFirst = NewOutputArray[i].props.isFirst;
          console.log("output");
          console.log(this.Output[i].idOutputArr);
          var j;
          for(j = 0; j<this.Output.length;j++){
            if(dropDownId === this.Output[j].idOutputArr[0].dropDownId){
              console.log("j for");
              datatype = this.Output[i].datatype;
            }
          }
          arr.push(this.updateOutput(key, dropDownId, formInputId,btnPlusId, btnMinusId, isFirst, datatype));
        }
        this.changeArrayState(arr,"output");
        this.simpleBoolean = false;
      }
    }
    
      
        return (
          <Grid  >

            <Grid.Row  >
            <Grid.Column  >
              <Segment  style={kompakt}>
              <Header style={zentriert}>Prozessname</Header>
                <Form >
                  <Form.Field>
                    <Label>Geben Sie den Namen des Prozesses ein</Label>
                    <Input placeholder='Prozessname...' style={zentriert} onChange={this.onSubmitProzessName.bind(this)}  />
                  </Form.Field>     
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              {NewInputArray}
            </Grid.Column>
            <Grid.Column width={8}>
              {NewOutputArray}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row  >
            <Grid.Column  >
              <Segment  style={kompakt}>
              <Header style={zentriert}>Bestätigen</Header>
              <Button style={zentriert} onClick={this.onSubmitProzess.bind(this)}>Bestätigen</Button>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>   
        );
    }
}









/*var inputArr = [];
   var outputArr = [];
   var tmpobj = {input : "", datatype : "", isEdit : false, editing : "", id : 1};
   this.Input.forEach(item => {
     tmpobj.input = item.input;
     tmpobj.datatype = item.datatype;
     tmpobj.isEdit = item.isEdit;
     tmpobj.id = item.id;
    inputArr.push(tmpobj);
   }); 
   var tmpobj = {input : "", datatype : "", data : "", id : 1};
   this.Output.forEach(item => {
     tmpobj.input = item.input;
     tmpobj.datatype = item.datatype;
     tmpobj.data = item.data;
     tmpobj.id = item.id;
    inputArr.push(tmpobj);
   }); */