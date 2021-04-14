import React from "react"
import { HashRouter, Route } from 'react-router-dom';
import { observer } from "mobx-react";

import NavigationBar from "../components/NavigationBar"

import Start_Page from '../pages/Start_Page'
import Home from "../pages/Home"
import Model from "../pages/Modellierung"
import ModelFinish from "../pages/ModellierungFinished"
import Inner_Comp from "../pages/Inner_Component"
import Inner_CompFinishedProzesse from "../pages/Inner_ComponentFinishesProzesse"
import Result from "../pages/Result"
import Result_Finished from "../pages/Result_finished"
import Prozesse from "../pages/Prozesse"
import JSON_Files from "../pages/JSON_Files"



// durch die Annotation @observer 
@observer
export default class Layout extends React.Component {
    render() {
        const containerStyle = { 
            marginTop: "5px"
        };

        return (
            <HashRouter>
                <div>
                    <NavigationBar location={location}/>
                    <div class="container" style={containerStyle}>
                        <div class="row">
                            <div class="col-xs-12">
                                <Route exact path="/" component={Start_Page}/>
                                <Route exact path="/home" component={Home}/>
                                <Route exact path="/model" component={Model}/>
                                <Route exact path="/modelfinished" component={ModelFinish}/>
                                <Route exact path="/innercomp" component={Inner_Comp}/>
                                <Route exact path="/innercompfinished" component={Inner_CompFinishedProzesse}/>
                                <Route exact path="/result" component={Result}/>
                                <Route exact path="/resultfin" component={Result_Finished}/>
                                <Route exact path="/prozesse" component={Prozesse}/>
                                <Route exact path="/jsonfiles" component={JSON_Files}/>
                            </div>
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}