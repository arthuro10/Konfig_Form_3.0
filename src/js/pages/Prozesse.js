import React from 'react'
import { Segment, Table, Label, Header} from 'semantic-ui-react'
import { observer } from "mobx-react";
import uuid from 'react-uuid'

import modellierStore from "../stores/Modellier_Store"

const spacing = {
    marginLeft : "10px",
    marginRight : "10px",
}

@observer
export default class Prozesse extends React.Component {
    constructor(props){
        super(props);
    
        
    }

    render(){

        const {allProzesses} = modellierStore;
        const Prozesse = [...allProzesses]
        console.log(Prozesse);

    

        const segmentsInput = Prozesse.map( item => {
            let arr = [...item.prozess];
            let input = [...arr[0].InputArr];
            console.log("input Arr: " + input);
            const TableBody = input.map( item => {
                        return(
                            <Table.Row>
                                <Table.Cell>
                                <Label ribbon>{arr[0].name}</Label>
                                </Table.Cell>
                                <Table.Cell>{item.input}</Table.Cell>
                                <Table.Cell>{item.datatype}</Table.Cell>
                                <Table.Cell>{item.editing}</Table.Cell>
                            </Table.Row>
                        )
                        
            });
            
            return (
                <Table celled color={'black'} key={uuid()}>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Prozess</Table.HeaderCell>
                        <Table.HeaderCell>Input</Table.HeaderCell>
                        <Table.HeaderCell>Datentyp</Table.HeaderCell>
                        <Table.HeaderCell>Editiert</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {TableBody}
                    </Table.Body>
                </Table>
            );
        });
        const segmentsOutput = Prozesse.map( item => {
            let arr = [...item.prozess];
            let output = [...arr[0].OutputArr];

            console.log("input Arr: " + output);
            const TableBody = output.map( item => {
                        return(
                            <Table.Row>
                                <Table.Cell>
                                <Label ribbon>{arr[0].name}</Label>
                                </Table.Cell>
                                <Table.Cell>{item.input}</Table.Cell>
                                <Table.Cell>{item.datatype}</Table.Cell>
                                <Table.Cell>{item.data}</Table.Cell>
                            </Table.Row>
                        )
                        
            });

            return (
                <Table celled color={'black'} key={uuid()}>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Prozess</Table.HeaderCell>
                        <Table.HeaderCell>Output</Table.HeaderCell>
                        <Table.HeaderCell>Datentyp</Table.HeaderCell>
                        <Table.HeaderCell>Daten</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            TableBody
                        }
                    </Table.Body>
                </Table>
            );
        });

        return(
            <div>
                <Segment style={spacing}>
                    <Header>Input</Header>
                    {
                        segmentsInput
                    }
                </Segment>
                <Segment style={spacing}>
                    <Header>Output</Header>
                    {
                        segmentsOutput
                    }
                </Segment>
            </div>
        );
    }
}