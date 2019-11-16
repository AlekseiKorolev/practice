import React from 'react';
import {Button, Div, List, Cell} from '@vkontakte/vkui';

export class MyTeams extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      teamName: '',
      teamType: '',
      teamSearchResult: 'Здесь отобразится результат поиска',
    };

    this.showMyTeams = this.showMyTeams.bind(this);
  }

//functions for serch
  showMyTeams(teams){
		//const teamsArray = teams.split('0');
		return teams.map( (value, index) =>
		/*	if (!value) {
				return
			}
			return*/
				value ?
					<Cell before={<Button level="destructive">Покинуть</Button>} key={index}>
						&nbsp;Команда <b>{value.slice(0, value.lastIndexOf(' '))}</b> по
						{value.slice(value.lastIndexOf(' ')+1) === 'football' ? ' футболу' : ''}
					</Cell> :
					''
		)
    /*if(Array.isArray(this.state.teamSearchResult)){
			return this.state.teamSearchResult.map( (id, index) =>
          <Cell key={id.type+index} before={<Button level="destructive">Покинуть</Button>}>&nbsp;Команда <b>{id.name}</b> по {id.type === 'football' ? 'футболу' : ''}, дата создания {id.date},&nbsp;
            <a href={"https://vk.com/id" + id.leader_id} target="_blank" rel="noopener noreferrer">лидер</a>
          </Cell>
      );
		}else{
			return <div>{this.state.teamSearchResult}</div>
		}*/
  }

  render(){
  	return (
  		<div>
        <Div>
          <List>
            {this.showMyTeams(this.props.myTeams)}
          </List>
        </Div>
  		</div>
  	)
  }
}
