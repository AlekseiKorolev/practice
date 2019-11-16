import React from 'react';
import {Group, FormLayout, FormLayoutGroup, Input, Select, Button, Div,
        List, Cell} from '@vkontakte/vkui';

export class CreateTeam extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      teamName: '',
      teamType: '',
      teamSearchResult: 'Здесь отобразится результат поиска',
    };
    this.changeTeamName = this.changeTeamName.bind(this);
    this.changeTeamType = this.changeTeamType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showTeamSearchResult = this.showTeamSearchResult.bind(this);
    this.teamSearchResult = this.teamSearchResult.bind(this);
  }
//handles
  changeTeamName(e){
    this.setState({
      teamName: e.target.value
    })
  }
  changeTeamType(e){
    this.setState({
      teamType: e.target.value
    })
  }
  handleSubmit(){
    this.props.teamComponentStatus ?
      this.props.createTeam(this.state) :
      this.props.searchTeam(this.state, this.teamSearchResult);
  }
//functions for search
  teamSearchResult(e){
    if(e){
      this.setState({ teamSearchResult: JSON.parse(e)});
    }else{
      this.setState({ teamSearchResult: 'Ничего не найдено'});
    }
  }
  showTeamSearchResult(){
    if(Array.isArray(this.state.teamSearchResult)){
			return this.state.teamSearchResult.map( (id, index) =>
          <Cell key={id.type+index} before={<Button level="commerce">Вступить</Button>}>&nbsp;Команда <b>{id.name}</b> по {id.type === 'football' ? 'футболу' : ''}, дата создания {id.date},&nbsp;
            <a href={"https://vk.com/id" + id.leader_id} target="_blank" rel="noopener noreferrer">лидер</a>
          </Cell>
      );
		}else{
			return <div>{this.state.teamSearchResult}</div>
		}
  }

  render(){
  	return (
  		<div>
  			<Group title="Создать команду">
          <FormLayout>
            <FormLayoutGroup top="Данные о команде">
              <Input type="text" placeholder="Имя команды" defaultValue="" onChange={this.changeTeamName}/>
              <Select placeholder="Выберите вид спорта" onChange={this.changeTeamType}>
                <option value="football">Футбол</option>
              </Select>
              <Button size="xl" level="2" onClick={ this.handleSubmit }>
              { this.props.teamComponentStatus ? 'Создать команду' : 'Найти команду' }
              </Button>
            </FormLayoutGroup>
          </FormLayout>
  			</Group>
        <Div>
          { this.props.teamComponentStatus ? '' :
          <List>
            {this.showTeamSearchResult()}
          </List>}
        </Div>
  		</div>
  	)
  }
}
