import React from 'react'
import { observer } from "mobx-react";

import modellierStore from "../stores/Modellier_Store"


@observer
export default class Start_Page extends React.Component {
    constructor(props){
        super(props);
        modellierStore.resetDieProzess();
    }



    render(){
        modellierStore.fetchProzesse();
        modellierStore.fetchCreateProzesse();

        const zentriert = {
            marginLeft: "auto",
            marginRight: "auto",
            textAlign : "center"
          }
        const background = {
            backgroundColor : "blue"
          }

        return (
            <div >
                <h1 style={zentriert}>Start Page</h1>
            </div>
        )
    }
}