import React from 'react'
import uuid from 'react-uuid';
import { Grid, Form,Table, Icon, Button, Header, Input, Label, Radio, Segment, GridColumn, Dropdown} from 'semantic-ui-react'

import modellierStore from '../stores/Modellier_Store'

const zentriert = {
    marginLeft: "auto",
    marginRight: "auto"
  }
const spacing = {
    marginLeft: "10px",
    marginRight: "10px"
  }

export default class Result extends React.Component {
    
    constructor(props){
        super(props);
        this.arr = [];
    }


    onClickButton (prozess) {
        alert("Prozess erstellt!");
        console.log(prozess);
        modellierStore.addingProzesse(prozess);
        modellierStore.setallProzesses(prozess);
        modellierStore.resetDieProzess();
        window.location.hash = '/';
    }

    render(){
        const {dieProzesse} = modellierStore;
        const prozData = [...dieProzesse];

        {
            prozData.forEach(item => {
              this.arrInput = [...item.InputArr]
              this.arrOutput = [...item.OutputArr];
            });
            
          }
        const Table_Input_Rows = this.arrInput.map( item => 
                        <Table.Row key={uuid()}>
                            <Table.Cell>
                            <Header as='h4' image>
                                {item.input}
                            </Header>
                            </Table.Cell>
                            <Table.Cell>{item.datatype}</Table.Cell>
                            <Table.Cell>{item.editing}</Table.Cell>
                        </Table.Row>
            
            );
        const Table_Output_Rows = this.arrOutput.map( item => 
                        <Table.Row key={uuid()}>
                            <Table.Cell>
                            <Header as='h4' image>
                                {item.input}
                            </Header>
                            </Table.Cell>
                            <Table.Cell>{item.datatype}</Table.Cell>
                            <Table.Cell>{item.data}</Table.Cell>
                        </Table.Row>
            
            );
                        
         


        return(
            <div style={spacing} >
                <Header style={zentriert}>{prozData[0].name}</Header>
                <Segment>
                    <Header style={zentriert}>Input</Header>
                    <Table basic='very' celled  style={zentriert}>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Input</Table.HeaderCell>
                            <Table.HeaderCell>Datentyp</Table.HeaderCell>
                            <Table.HeaderCell>Editiert</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {Table_Input_Rows}
                        </Table.Body>
                    </Table>
                </Segment>
                
                <Segment>
                    <Header style={zentriert}>Output</Header>
                    <Table basic='very' celled  style={zentriert}>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Output</Table.HeaderCell>
                            <Table.HeaderCell>Datentyp</Table.HeaderCell>
                            <Table.HeaderCell>Data</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {Table_Output_Rows}
                        </Table.Body>
                    </Table>
                </Segment>

                <Segment>
                    <Button secondary onClick={this.onClickButton.bind(this,prozData)}>
                        Bestätigen 
                    </Button>
                </Segment>
                
                
            </div>
        )
    }

}