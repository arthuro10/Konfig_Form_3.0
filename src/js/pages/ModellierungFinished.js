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
export default class ModellierungFinished extends React.Component {
  constructor(props) {
    super(props); 
    this.createProzessJSON = {};
    this.prozessName = "";
    this.prozessId = 1;

    this.Input = [];
    this.Output = [];

    this.prozess;

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
  let arr = [];
  let key, dropDownId, formInputId ;
  let btnPlusId ,btnMinusId, tmpDatatype;
  let tmpInput, isDisabled;

  console.log(b.id);
  this.Input.forEach(item => {
    if(b.id === item.idInputArr[2].radioId){
      item.isEdit = !item.isEdit;
      key = b.id;
      tmpDatatype = item.datatype;
      tmpInput = item.input;
      
      if(item.isEdit === true){
        isDisabled = true;
        if(item.isFirst === true){
          console.log("isTrue is First");
          // Verknüpfen mit Output
          
          this.state.NewOutputArray.forEach(itemNewOutput => {
            console.log(itemNewOutput.props);
            dropDownId = itemNewOutput.props.dropDownId;
            formInputId = itemNewOutput.props.formInputId;
            btnPlusId = itemNewOutput.props.btnPlusId;
            btnMinusId = itemNewOutput.props.btnMinusId;
          });
          arr.push(this.updateOutput(key, dropDownId, formInputId,btnPlusId, btnMinusId, item.isFirst, tmpDatatype, isDisabled));
          this.setState({
            NewOutputArray : arr
          });
          let idArr = [{dropDownId : dropDownId},{formInputId: formInputId},{btnPlusId : btnPlusId},{btnMinusId : btnMinusId},{radioId : b.id}]
          let obj = {idOutputArr : idArr, input : tmpInput, datatype : tmpDatatype, id : uuid(), data : "", isEdit : true};
          this.Output = [];
          this.Output.push(obj);
        }else if(item.isFirst === false){
          console.log("isTrue is not First");
          const alreadyExists = this.state.NewOutputArray.some(ele => {
            return ele.key === b.id;
          })
          if(alreadyExists){
            console.log("already Exists");
            arr = [];
            console.log(arr);
            this.state.NewOutputArray.forEach(element => {
              if(element.key === b.id){
                dropDownId = element.props.dropDownId;
                formInputId = element.props.formInputId;
                btnPlusId = element.props.btnPlusId;
                btnMinusId = element.props.btnMinusId;
              }else {
                console.log(element);
                arr.push(element);
              }
            });
            arr.push(this.updateOutput(key, dropDownId, formInputId,btnPlusId, btnMinusId, item.isFirst, tmpDatatype, isDisabled));
            this.setState({
              NewOutputArray : arr
            });
            let idArr = [{dropDownId : dropDownId},{formInputId: formInputId},{btnPlusId : btnPlusId},{btnMinusId : btnMinusId},{radioId : b.id}]
            let obj = {idOutputArr : idArr, input : tmpInput, datatype : tmpDatatype, id : uuid(), data : "", isEdit : true};
            this.Output.push(obj);
          }else if(!alreadyExists){
            console.log("! already Exists");
            dropDownId = uuid();
            formInputId = uuid();
            btnPlusId = uuid();
            btnMinusId = uuid();
            arr = this.state.NewOutputArray;
            arr.push(this.updateOutput(key, dropDownId, formInputId,btnPlusId, btnMinusId, item.isFirst, tmpDatatype, isDisabled));
            this.setState({
              NewOutputArray : arr
            });
            let idArr = [{dropDownId : dropDownId},{formInputId: formInputId},{btnPlusId : btnPlusId},{btnMinusId : btnMinusId},{radioId : b.id}]
            let obj = {idOutputArr : idArr, input : tmpInput, datatype : tmpDatatype, id : uuid(), data : "", isEdit : true};
            this.Output.push(obj);
          }
        }
      }else if(item.isEdit === false){
        isDisabled = false;
        if(item.isFirst === true){
          console.log("isFalse is First");
          this.state.NewOutputArray.forEach(itemNewOutput => {
            console.log(itemNewOutput.props);
            dropDownId = itemNewOutput.props.dropDownId;
            formInputId = itemNewOutput.props.formInputId;
            btnPlusId = itemNewOutput.props.btnPlusId;
            btnMinusId = itemNewOutput.props.btnMinusId;
          });
          arr.push(this.updateOutput(key, dropDownId, formInputId,btnPlusId, btnMinusId, item.isFirst, tmpDatatype, isDisabled));
          this.setState({
            NewOutputArray : arr
          });
          let idArr = [{dropDownId : dropDownId},{formInputId: formInputId},{btnPlusId : btnPlusId},{btnMinusId : btnMinusId},{radioSliderId : b.id}]
          let obj = {idOutputArr : idArr, input : tmpInput, datatype : tmpDatatype, id : uuid(), data : "", isEdit : false};
          this.Output = [];
          this.Output.push(obj);

        }else if(item.isFirst === false){
          console.log("isFalse is not First");
          arr = [];
          console.log(arr);
          this.state.NewOutputArray.forEach(element => {
            if(element.key === b.id){
              dropDownId = element.props.dropDownId;
              formInputId = element.props.formInputId;
              btnPlusId = element.props.btnPlusId;
              btnMinusId = element.props.btnMinusId;
            }else {
              console.log(element);
              arr.push(element);
            }
          });
          console.log(...this.Output[0].idOutputArr);
          console.log(...this.Output[1].idOutputArr);
          console.log(...this.Output[2].idOutputArr);
          console.log(this.Output[3].idOutputArr);
          this.setState({
            NewOutputArray : arr
          });
          this.Output = this.Output.filter(obj => (
            (obj.idOutputArr[4].radioId !== b.id))
          );

        }
      }
    }
  })

}
 


 onClickChangeInput() {
   console.log("1:" + this.state.NewInputArray);
   const dropDownId = uuid()
   const formInputId = uuid()
   const radioId = uuid()
   const btnPlusId = uuid()
   const btnMinusId = uuid()
   let isFirst = false;
   let idObj = uuid();
   if(this.state.NewInputArray.length <= 0 ){
    isFirst = true;
   }


   const createNewInput = <Form_Input key={uuid()} dropDownId={dropDownId} formInputId={formInputId} radioId={radioId} btnPlusId={btnPlusId} btnMinusId={btnMinusId} isFirst={isFirst} datatype={this.state.dummyDatatype}
                          dropDownFunc={this.onChangeInputSelection.bind(this)}
                          inputFunc={this.onSubmitProzessInput.bind(this)}
                          radioFunc={this.handleRadioInputChange.bind(this)}
                          btnPlusFunc={this.onClickChangeInput.bind(this)} 
                          btnMinusFunc={this.onClickMinusInput.bind(this)} />


    let newArr = this.state.NewInputArray.concat(createNewInput);
    this.setState({ NewInputArray: newArr })
    console.log("2:" + this.state.NewInputArray);
    let idArr = [{dropDownId : dropDownId},{formInputId: formInputId},{radioId : radioId},{btnPlusId : btnPlusId},{btnMinusId : btnMinusId}]
    let obj = {idInputArr : idArr, input : "", datatype : "", isEdit : false, editing : "", id : idObj, isFirst : isFirst };
    this.Input.push(obj);
    console.log(this.Input);
  
 }
 onClickMinusInput(a,b) {
  console.log("1.1:" + this.state.NewInputArray);
  console.log(this.state.NewInputArray)
  let isEdit = false;
  this.Input.forEach(item => {
    if(item.idInputArr[4].btnMinusId === b.id){
        if(item.isEdit === true){
          isEdit = true;
        }
    }
  });
  if(isEdit === true){
    alert("Erst Edit Slider auf OFF stellen");
    return
  }

  let newArr = this.state.NewInputArray.filter(item => (
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
  let isEdit = false;
  this.state.NewOutputArray.forEach(item => {
    if(b.id === item.props.btnMinusId){
      console.log(item);
      if(item.props.isDisabled === true){
        isEdit = true;
      }
    }
    
  });
  if(isEdit === true){
    alert("Erst Edit Slider auf OFF stellen");
    return
  }
  let newArr = this.state.NewOutputArray.filter(item => (
    (item.props.btnMinusId !== b.id)
  ));
  console.log(this.Output);
  this.Output = this.Output.filter(item => {
    console.log(b.id);
    console.log(item.idOutputArr[3].btnMinusId);
    return item.idOutputArr[3].btnMinusId !== b.id
  } );
  console.log(this.Output);
  this.setState({ NewOutputArray: newArr })
  console.log("2.1-:" + this.state.NewOutputArray);
  console.log(this.state.NewOutputArray);
  this.simpleBoolean = true;
}

 onClickChangeOutput() {
  console.log("1-:" + this.state.NewOutputArray);
  const dropDownId = uuid();
  const formInputId = uuid();
  const btnPlusId = uuid();
  const btnMinusId = uuid();
  let isFirst = false;
  let idObj = uuid();
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


    let newArr = this.state.NewOutputArray.concat(createNewOutput);
    this.setState({ NewOutputArray: newArr })
    console.log("2-:" + this.state.NewOutputArray);
    let idArr = [{dropDownId : dropDownId},{formInputId: formInputId},{btnPlusId : btnPlusId},{btnMinusId : btnMinusId}]
    let obj = {idOutputArr : idArr, input : "", datatype : "", id : idObj, data : ""};
    this.Output.push(obj);

  
 }

 onSubmitProzess = () => {
  let isFilled = true;
  /* this.Input.map(item => {
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
  }*/
  console.log(this.Output);
  console.log(this.Input);

   this.createProzessJSON = {name : this.prozessName, prozessId : this.prozessId, InputArr : this.Input, OutputArr : this.Output}
   console.log(this.createProzessJSON);
   modellierStore.resetDieProzess();
   modellierStore.setDieProzess(this.createProzessJSON);
   console.log(this.Input[0].isEdit);
   if(this.Input[0].isEdit === false){
    window.location.hash = '/innercompfinished';

   }else{
    window.location.hash = '/innercompfinished';

   }
   
 }

 onSubmitProzessInput(a,b){
  this.Input.forEach(item => {
    if(b.id === item.idInputArr[1].formInputId){
      item.input = b.value;
      console.log(item.input);
    }
  });
  console.log(this.Input);

 }
 onSubmitProzessOutput(a,b){
   this.Output.forEach(item => {
    if(b.id === item.idOutputArr[1].formInputId){
      item.input = b.value;
      console.log(item.input);
    }
   });
  console.log(this.Output);

 }
 onSubmitProzessName(a,e){
   console.log("onSubmit - ProzessName");
   this.prozessName = e.value;
   console.log("onSubmit - ProzessName: "+ this.prozessName);

 }

 onChangeInputSelection (a,b) {
  this.Input.forEach(item => {
   if(b.id === item.idInputArr[0].dropDownId){
     item.datatype = b.value;
     console.log(item.datatype);
     this.setState({
       dummyDatatype : b.value
     });
     this.simpleBoolean = true;
   }
  });
 

}
onChangeOutputSelection (a,b) {
 this.Output.forEach(item => {
   if(b.id === item.idOutputArr[0].dropDownId){
     console.log('Done');
     item.datatype = b.value;
     console.log(item.datatype);
     this.setState({
       dummyDatatype : b.value
     });
     this.simpleBoolean = true;
   }
 });
 console.log(this.Output);
}

 updateInput(key, dropDownId, formInputId, radioId, btnPlusId, btnMinusId, isFirst, datatype, input){
    return(
    <Form_Input key={key} dropDownId={dropDownId} formInputId={formInputId} radioId={radioId} btnPlusId={btnPlusId} btnMinusId={btnMinusId} isFirst={isFirst} datatype={datatype} value={input}
    dropDownFunc={this.onChangeInputSelection.bind(this)}
    inputFunc={this.onSubmitProzessInput.bind(this)}
    radioFunc={this.handleRadioInputChange.bind(this)}
    btnPlusFunc={this.onClickChangeInput.bind(this)} 
    btnMinusFunc={this.onClickMinusInput.bind(this)} />
    )
 }
 updateOutput(key, dropDownId, formInputId,btnPlusId, btnMinusId, isFirst, datatype, isDisabled, input){
    return(
      <Form_Output key={key} dropDownId={dropDownId} formInputId={formInputId} btnPlusId={btnPlusId} btnMinusId={btnMinusId} isDisabled={isDisabled} isFirst={isFirst} datatype={datatype} value={input}
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
    const {dieProzesse} = modellierStore

    this.prozess = [...dieProzesse]
    console.log(this.prozess);
    {
      if(this.Input.length < 1 && this.Output.length < 1){
        console.log("this.Input.length < 1 && this.Output.length < 1");
        this.prozessName = this.prozess[0].name;
        this.prozessId = this.prozess[0].prozessId;
        let inputArr = [...this.prozess[0].InputArr];
        let newInputArr = []
        let outputArr = [...this.prozess[0].OutputArr];
        let newOutputArr = []
        let count = 0;
        inputArr.forEach(item => {
          if(count === 0){
            isFirst = true;
          }else{
            isFirst = false;
          }
          let _item = [...item.idInputArr];
          newInputArr.push(this.updateInput(uuid(), _item[0].dropDownId, _item[1].formInputId, _item[2].radioId, _item[3].btnPlusId, _item[4].btnMinusId, isFirst, item.datatype, item.input));
          this.Input.push(item);
          console.log(item);
          count++;
        });
        console.log(newInputArr)
        this.changeArrayState(newInputArr,"input");
        count = 0;
        let isFirst = false;
        outputArr.forEach(item => {
          if(count === 0){
            isFirst = true;
          }else{
            isFirst = false;
          }
          let isDisabled = item.isEdit;
          let _item = [...item.idOutputArr];
          newOutputArr.push(this.updateOutput(uuid(), _item[0].dropDownId, _item[1].formInputId,_item[2].btnPlusId, _item[3].btnMinusId, isFirst, item.datatype, isDisabled, item.input));
          this.Output.push(item);
          console.log(item);
          count++;
        });
        console.log(newOutputArr)
        this.setState({
          NewOutputArray : newOutputArr
        });
        this.changeArrayState(newOutputArr,"output");

      }

    }


    {
      if(this.simpleBoolean){
        let arr = [];
        let key, dropDownId, formInputId, radioId, btnPlusId, btnMinusId, isFirst;
        let datatype = "";
        let input = "";
        console.log(NewInputArray.length);
        console.log(NewInputArray);
        NewInputArray.forEach(item => {
          key = item.key;
          dropDownId = item.props.dropDownId;
          formInputId = item.props.formInputId;
          radioId = item.props.radioId;
          btnPlusId = item.props.btnPlusId;
          btnMinusId = item.props.btnMinusId;
          isFirst = item.props.isFirst;
          this.Input.forEach(item => {
            if(dropDownId === item.idInputArr[0].dropDownId){
              datatype = item.datatype;
              input = item.input;
            }
          });
          arr.push(this.updateInput(key, dropDownId, formInputId, radioId, btnPlusId, btnMinusId, isFirst, datatype, input));
        });
          this.changeArrayState(arr,"input");
          arr = [];
          console.log(NewOutputArray.length);
          console.log(NewOutputArray);
          NewOutputArray.forEach(item => {
            key = item.key;
            dropDownId = item.props.dropDownId;
            formInputId = item.props.formInputId;
            btnPlusId = item.props.btnPlusId;
            btnMinusId = item.props.btnMinusId;
            isFirst = item.props.isFirst;
            let isDisabled = item.props.isDisabled;
            this.Output.forEach(item => {
              if(dropDownId === item.idOutputArr[0].dropDownId){
                console.log("j for");
                datatype = item.datatype;
                input = item.input;
              }
            });
            arr.push(this.updateOutput(key, dropDownId, formInputId,btnPlusId, btnMinusId, isFirst, datatype, isDisabled, input));
          });
          this.changeArrayState(arr,"output");
          this.simpleBoolean = false;
      }
    }
    
      
        return (
          <Grid  >

            <Grid.Row  >
            <Grid.Column  >
              <Segment  style={kompakt}>
              <Header style={zentriert}>{this.prozess[0].name}</Header>
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

