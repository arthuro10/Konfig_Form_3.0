import React, { useState } from "react";
import { Slider } from "react-semantic-ui-range";
import "semantic-ui-css/semantic.min.css";
import { Label, Card, Input } from "semantic-ui-react";


// Schwierig einzubinden. 
const Range_Slider = props => {
  const [value, setValue] = useState(2);

  const settings = {
    start: 2,
    min: 0,
    max: 100,
    step: 1,
    onChange: (value) => {
      setValue(value);
    }
  };
  

  return (
        <Card>
            <Card.Content>
                <Slider id={props.id}  value={props.valueSlider} color="red" settings={settings} />
                <br></br>
                <Label color="red">{props.valueSlider}</Label>
            </Card.Content>
        </Card>
  );
};

export default Range_Slider;