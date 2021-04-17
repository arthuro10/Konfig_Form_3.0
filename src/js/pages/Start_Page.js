import React from 'react'
import { observer } from "mobx-react";

import modellierStore from "../stores/Modellier_Store"


@observer
export default class Start_Page extends React.Component {
    constructor(props){
        super(props);
        //modellierStore.fetchProzesse();
        //modellierStore.fetchCreateProzesse();
        modellierStore.resetDieProzess();
    }

    componentDidMount(){
        modellierStore.fetchProzesse();
        modellierStore.fetchCreateProzesse();
    }

    render(){
        modellierStore.fetchProzesse();
        modellierStore.fetchCreateProzesse();

        const zentriert = {
            marginLeft: "auto",
            marginRight: "auto"
          }

        return (
            <div>
                <h1 style={zentriert}>Start Page</h1>
            </div>
        )
    }
}