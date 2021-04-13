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

function Form_Output(props) {

  const datatype = props.datatype || "";
  const value = props.value || "Output...";

    return(
        <Segment style={spacing}>
            <Header>Outputs definieren</Header>
            <Form >
              <Form.Field>
                <Dropdown id={props.dropDownId} value={datatype}  disabled={props.isDisabled} placeholder='Datentyp' fluid selection options={DataTypeOptions}  style={zentriert} onChange={props.dropDownFunc} />
                <Input id={props.formInputId} type={datatype} placeholder={value} disabled={props.isDisabled} style={zentriert} onChange={props.inputFunc}   />
              </Form.Field>    
            </Form>
            <br></br>
            <p>Den Edit Slider betätigen damit Input auch als Output genutzt wird </p>
            <Button id={props.btnPlusId} circular icon='plus' style={BtnSpacing} secondary onClick={props.btnPlusFunc}  />
            {
              props.isFirst === true ? "": <Button id={props.btnMinusId} circular icon='minus' style={BtnSpacing} secondary onClick={props.btnMinusFunc}  />
            }
            
      </Segment>
    );
}

export default Form_Output;
