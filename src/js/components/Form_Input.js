import { Grid, Form, Button, Header, Input, Label, Radio, Segment, GridColumn, Dropdown } from 'semantic-ui-react'
import React, { useState } from 'react';

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

  const DataTypeOptions = [
    { key: 'number', value: 'number', text: 'Number' },
    { key: 'string', value: 'string', text: 'Text' },
    { key: 'bool', value: 'bool', text: 'Boolean' },
    { key: 'date', value: 'date', text: 'Date' },
    { key: 'time', value: 'time', text: 'Time' },
  ]

  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }

function Form_Input(props) {

    const datatype = props.datatype || "";
    const value = props.value || "Input...";
    const defChecked = props.defaultChecked || false;
    console.log("Input Component ");
    let whichOne;
    if(defChecked){
      whichOne = <div>
        <Radio id={props.radioId} defaultChecked={true}   slider onClick={props.radioFunc} /> <p>Aus: Anzeigen lassen | Ein: Editieren</p>
        </div>
    }else{
      whichOne = <div>
        <Radio id={props.radioId}  slider onClick={props.radioFunc} /> <p>Aus: Anzeigen lassen | Ein: Editieren</p>
        </div>
    }
    return(
        <Segment style={spacing} >
                            <Header>Inputs definieren</Header>
                            <Form >
                                <Form.Field>
                                  <Dropdown id={props.dropDownId} value={datatype}  placeholder='Datentyp' fluid selection options={DataTypeOptions}  style={zentriert} onChange={props.dropDownFunc} />
                                  <Input id={props.formInputId} type={datatype} placeholder={value}  style={zentriert}   onChange={props.inputFunc}  />
                                </Form.Field>  
                                <Form.Field>
                                  {whichOne}
                                </Form.Field>   
                            </Form>
                            <br></br>
                            <Button id={props.btnPlusId} circular icon='plus' style={BtnSpacing} secondary onClick={props.btnPlusFunc}  />
                            {
                                props.isFirst === true ? "": <Button id={props.btnMinusId} circular icon='minus' style={BtnSpacing} secondary onClick={props.btnMinusFunc}  /> 
                            }
                            
                          </Segment>
    );
}


export default Form_Input;
