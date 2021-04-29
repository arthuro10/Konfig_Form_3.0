import React from "react"
import {Link} from "react-router-dom"
import { Card, Button, Modal ,Header } from 'semantic-ui-react'
import { observer } from "mobx-react";

import modellierStore from "../stores/Modellier_Store"
import uuid from "react-uuid";

const spacing = {
  margin: "8px",
};

@observer
export default class Start extends React.Component {
  constructor(props) {
    super(props); 

    this.showProzessItems = [];
    this.oneTime = false;
    this.prozess = {name : "", prozessId : 1, InputArr : [], OutputArr : []}
    this.prozesses = [];
    
    this.state = {
      open : false
      
    };
    modellierStore.resetDieProzess();

 }

 componentDidMount(){
  modellierStore.fetchProzesse();
  modellierStore.fetchCreateProzesse();
}

 onClickKomponente(a,b){
  let id;
  let name;
  let inputArr;
  let outputArr;
  this.prozesses.forEach(item => {
    let tmpProzess = [...item.prozess];
    id = tmpProzess[0].prozessId;
      if(id === b.id){
          name = tmpProzess[0].name;
          inputArr = [...tmpProzess[0].InputArr];
          outputArr = [...tmpProzess[0].OutputArr];
          this.prozess = {name : name, 
                          prozessId : id,
                          InputArr : inputArr,
                          OutputArr : outputArr}
          console.log(this.prozess);
      }
  });
  
  console.log(this.prozess);
  modellierStore.setDieProzess(this.prozess);
  window.location.hash = '/innercompfinished';
  
 }
 onClickDelete(a,b){
  let id;
  this.prozesses.forEach(item => {
    let tmpProzess = [...item.prozess];
    id = tmpProzess[0].prozessId;
      if(id === b.id){
        modellierStore.deletingProzess(item.id);
        location.hash = "/"
      }
  });
  
  
 }

 createProzessItems(prozessName,id){
    return(
      <Card style={spacing} key={uuid()} id={id}  >
          <Card.Content extra>
            <Header>{prozessName}</Header>
          </Card.Content>
          <Card.Content extra>
            <Button color="green" id={id} onClick={this.onClickKomponente.bind(this)}>Komponente</Button>
            <Button color="red" id={id}  onClick={this.onClickDelete.bind(this)}>Delete</Button>
          </Card.Content>
      </Card>
    )
 }

 onClickChangeInput() {
  this.setState({open : false})
  console.log(window.location.hash);
  window.location.hash = '/input_data';
  
 }
 onClickChangeNormal() {
  this.setState({open : false})
  console.log(window.location.hash);
  window.location.hash = '/model';
  
 }
 onClickChangeJSON() {
  this.setState({open : false})
  window.location.hash = '/jsonfiles';
  
 }

 onClickPlusBtn(){
  this.setState({open : !this.state.open})
 }

  
  
  render() {

    const spacing = {
      margin: "10px",
      padding: "10px",
    };

    const {allProzesses} = modellierStore;
    const Prozesse = [...allProzesses]
    console.log(Prozesse);

    {
        let id;
        let name;
        this.prozesses = Prozesse;
        this.prozesses.forEach(item => {
          let tmpProzess = [...item.prozess];
          console.log(tmpProzess[0]);
          name = tmpProzess[0].name;
          id = tmpProzess[0].prozessId;
          this.showProzessItems.push(this.createProzessItems(name,id));
        });
    }


        return (
          <div>
            {this.showProzessItems}
            <Button circular icon='plus'  style={spacing} primary onClick={this.onClickPlusBtn.bind(this)} />
            
            <Modal
              onClose={() => this.setState({open : false})}
              onOpen={() => this.setState({open : true})}
              open={this.state.open}
            >
              <Modal.Header>Auswahl</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header>JSON File oder eigene Angaben</Header>
                  <p>
                    Entweder wird eine JSON File gelesen und darüber wird ein Prozess erzeugt oder über die UI
                  </p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color="black"  onClick={this.onClickChangeNormal.bind(this)}>
                Generiere JSON
                </Button>
                <Button
                  color='green'
                  onClick={this.onClickChangeJSON.bind(this)}
                >
                Import JSON
                </Button>
              </Modal.Actions>
            </Modal>
          </div>
        
        );
    }
}