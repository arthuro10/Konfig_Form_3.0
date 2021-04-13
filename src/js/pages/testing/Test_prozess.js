import React from "react"
import { Button, Modal, Icon, Header,Checkbox, Form, Label, Pagination, Input, Menu, Table, Select  } from 'semantic-ui-react'

import Pagi from '../components/Pagination';

const countryOptions = [
  { key: 'int', value: 'int', text: 'Ganzzahl' },
  { key: 'double', value: 'double', text: 'Gleitkommazahl' },
  { key: 'string', value: 'string', text: 'Text' },
  { key: 'bool', value: 'bool', text: 'Boolean' },

]



function Test_Prozess() {
  const [open, setOpen] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  const [open3, setOpen3] = React.useState(false)

 
  const margin = {
    margin: "10px",
    padding: "10px",
  };
  
        return (
         <div>
           
           <Modal
              basic
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              size='small'
              trigger={<Button circular icon='plus' style={margin} color={"primary"}  />}
            >
              <Header icon>
                <Icon name='cogs' />
                Neuen Prozess erstellen
              </Header>
              <Modal.Content>
               <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Bitte Input und Output Daten samt Datentyp eingeben</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                      <Select placeholder='Datentyp' options={countryOptions}  style={margin}/>
                      <Input placeholder='Input...' style={margin} />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row> 
                      <Table.Cell>
                        <Select placeholder='Datentyp' options={countryOptions}  style={margin}/>
                        <Input placeholder='Output...' style={margin} />
                      </Table.Cell>
                    </Table.Row>
                    {/*
                      <Table.Row>
                        <Table.Cell>Cell</Table.Cell>
                      </Table.Row>
                    */}
                    
                  </Table.Body>

                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan='3'>
                      <Pagi />
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>  
              </Modal.Content>
              <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                  <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={() => setOpen(false)}>
                  <Icon name='checkmark' /> Yes
                </Button>
              </Modal.Actions>
            </Modal>

            <Modal
              basic
              onClose={() => setOpen2(false)}
              onOpen={() => setOpen2(true)}
              open={open2}
              size='small'
              trigger={<Button circular icon='plus' style={margin} color={"primary"}  />}
            >
              <Header icon>
                <Icon name='cogs' />
                Neuen Prozess erstellen
              </Header>
              <Modal.Content>
               <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Prozessnamen und weitere Eigenschaften definieren</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                      <Form>
                        <Form.Field>
                          <label>Prozess Name</label>
                          <input placeholder='Prozess Name...' />
                        </Form.Field>
                        <Form.Field>
                          <label>Prozesseigenschaften</label>
                          <input placeholder='Eigenschaften...' />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox label='Sollen weitere Eigenschaften definiert werden?' />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                      </Form>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row> 
                      <Table.Cell>
                      </Table.Cell>
                    </Table.Row>
                    {/*
                      <Table.Row>
                        <Table.Cell>Cell</Table.Cell>
                      </Table.Row>
                    */}
                    
                  </Table.Body>

                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan='3'>
                      <Pagi  />
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>  
              </Modal.Content>
              <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen2(false)}>
                  <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={() => setOpen2(false)}>
                  <Icon name='checkmark' /> Yes
                </Button>
              </Modal.Actions>
            </Modal>

            <Modal
              basic
              onClose={() => setOpen3(false)}
              onOpen={() => setOpen3(true)}
              open={open3}
              size='small'
              trigger={<Button circular icon='plus' style={margin} color={"primary"}  />}
            >
              <Header icon>
                <Icon name='cogs' />
                Neuen Prozess erstellen
              </Header>
              <Modal.Content>
               <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Weitere Formulardaten erstellen</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                      <Form>
                        <Form.Field>
                          <label>Radio Button?</label>
                          <Button circular icon='plus' style={margin} color={"secondary"}  />
                        </Form.Field>
                        <Form.Field>
                          <label>Input?</label>
                          <Button circular icon='plus' style={margin} color={"secondary"}  />
                        </Form.Field>
                        
                        <Button type='submit'>Submit</Button>
                      </Form>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row> 
                      <Table.Cell>
                      </Table.Cell>
                    </Table.Row>
                    {/*
                      <Table.Row>
                        <Table.Cell>Cell</Table.Cell>
                      </Table.Row>
                    */}
                    
                  </Table.Body>

                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan='3'>
                      <Pagi  />
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>  
              </Modal.Content>
              <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen3(false)}>
                  <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={() => setOpen3(false)}>
                  <Icon name='checkmark' /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
         </div>
        );

}





export default Test_Prozess