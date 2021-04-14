import React, { Component } from 'react'
import { Menu, Header } from 'semantic-ui-react'
import { Link } from "react-router-dom";


export default class NavigationBar extends Component {

  constructor() {
    super();
    this.state = { activeItem : "start" }
    this.modelURL = 'http://localhost:8080/#/model';
    this.innerCompShowURL = 'http://localhost:8080/#/innercompshow';
    this.innerCompURL = 'http://localhost:8080/#/innercomp';
    this.resultURL = 'http://localhost:8080/#/result';
  }

  handleItemClick = (e, { name }) => {
    if(window.location.href === this.modelURL 
      || window.location.href === this.innerCompShowURL
      || window.location.href === this.innerCompURL
      || window.location.href === this.resultURL ){
      alert('Anmerkung: Alle Variablen werden zurückgesetzt.');
      // Modal damit man besser darauf reagieren kann. 
    }

    this.setState({ activeItem: name });

  }
  


  render() {
    const { activeItem } = this.state

    return (
      <Menu pointing  className={"myNavBar"}>
        <Menu.Item > 
         <Header>   Prozess Modellierung  </Header>                    
        </Menu.Item>
        <Menu.Item></Menu.Item>
        <Menu.Item></Menu.Item>
        <Menu.Item
          as={Link} to='/' 
          name='Start Page'
          active={activeItem === '/'}
          onClick={this.handleItemClick}
          icon='star'>                        
        </Menu.Item>
        
        <Menu.Item></Menu.Item>
        <Menu.Item></Menu.Item>
        <Menu.Item
          as={Link} to='/home' 
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          icon='home'>                        
        </Menu.Item>
        
        <Menu.Item></Menu.Item>
        <Menu.Item></Menu.Item>
        <Menu.Item
          as={Link} to='/prozesse' 
          name='prozesse'
          active={activeItem === 'prozesse'}
          onClick={this.handleItemClick}
          icon='cogs'>                        
        </Menu.Item>
        <Menu.Item></Menu.Item>

      </Menu>
    )
  }
}
