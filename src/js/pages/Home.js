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

 onClickCardItem(a,b){
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

 createProzessItems(prozessName,id){
    return(
      <Card style={spacing} key={uuid()} id={id} onClick={this.onClickCardItem.bind(this)} >
          <Card.Content extra>
            <Header>{prozessName}</Header>
          </Card.Content>
      </Card>
    )
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
      if(!this.oneTime){
        let i;
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
      this.oneTime = true;
    }


      
        return (
          <div>
            {this.showProzessItems}
            <Button circular icon='plus' style={spacing} primary onClick={this.onClickPlusBtn.bind(this)} />

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
                <Button color='black' onClick={this.onClickChangeNormal.bind(this)}>
                  Normal
                </Button>
                <Button
                  color='green'
                  onClick={this.onClickChangeJSON.bind(this)}
                >
                JSON
                </Button>
              </Modal.Actions>
            </Modal>
            

          </div>
        
        );
    }
}