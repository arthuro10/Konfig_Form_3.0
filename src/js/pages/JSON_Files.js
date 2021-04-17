import React from 'react'
import uuid from 'react-uuid';
import { Button, Segment } from 'semantic-ui-react';

import modellierStore from "../stores/Modellier_Store"

export default class JSON_Files extends React.Component{
    constructor(props){
        super(props);
        this.oneTime = false;
        this.showBtn = [];
        this.prozess = {name : "", prozessId : 1, InputArr : [], OutputArr : []}
        this.prozesses = [];
    }

    onClickBtn(a,b) {
        let id;
        let name;
        let inputArr;
        let outputArr;
        this.prozesses.forEach(item => {
            let tmpProzess = [item.prozess_json];
            console.log(tmpProzess);
            id = tmpProzess[0].id;
            if(id === b.id){
                name = tmpProzess[0].name;
                inputArr = [...tmpProzess[0].inputArr];
                outputArr = [...tmpProzess[0].outputArr];
                this.prozess = {name : name, 
                                prozessId : id,
                                InputArr : inputArr,
                                OutputArr : outputArr}
                console.log(this.prozess);
            }
        });
        
        modellierStore.setDieProzess(this.prozess);
        window.location.hash = '/innercomp';
    }

    createBtn (name,id) {

        return(
            <Segment key={uuid()}>
            <Button id={id} onClick={this.onClickBtn.bind(this)} primary>
            {name}
            </Button>
            </Segment>
        )

    }

    render(){
        const {allCreateProzesses} = modellierStore;
        const Prozesse = [...allCreateProzesses]
        console.log(Prozesse);

        {
            if(!this.oneTime){
              let id;
              let name;
              this.prozesses = Prozesse;
              this.prozesses.forEach(item => {
                let tmpProzess = [item.prozess_json];
                console.log(tmpProzess);
                name = tmpProzess[0].name;
                id = tmpProzess[0].id;
                console.log(name);
                console.log(id);
                this.showBtn.push(this.createBtn(name,id));
              });

              

            }
            this.oneTime = true;
          }

        

        return(
            <div>
                {this.showBtn}
            </div>
        )
    }
}


/*
for(i = 0; i< Prozesse.length; i++){
                let tmpProzess = [Prozesse[i].prozess_json];
                console.log(tmpProzess);
                name = tmpProzess[0].name;
                id = tmpProzess[0].id;
                console.log(name);
                console.log(id);
                this.showBtn.push(this.createBtn(name,id));
                
              } */
