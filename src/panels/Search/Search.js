import React from 'react';
import {Div, Button, Select, FormLayoutGroup} from '@vkontakte/vkui';
import {searchData} from '../../util/requests';

export class Search extends React.Component {
	constructor(props){
		super(props);
		this.state={
			side: '',
			role: '',
			format: '',
			skill: '',
			searchResult: 'Здесь отобразится результат поиска',
		}

		this.changeState = this.changeState.bind(this);
		this.startSearch = this.startSearch.bind(this);
		this.searchResult = this.searchResult.bind(this);
		this.showSearchResult = this.showSearchResult.bind(this);
	}

	changeState(e){
		this.setState({ [e.target.name]: e.target.value });
	}

	startSearch(){
		//console.log(this.state);
		searchData(this.state, this.searchResult);
	}

	searchResult(e){
		//console.log(e);
		if(e){
			this.setState({ searchResult: JSON.parse(e)});
		}else{
			this.setState({ searchResult: 'Ничего не найдено'});
		}
	}

	showSearchResult(){
		//console.log(this.state.searchResult);
		//console.log(this.state.searchResult);
		if(Array.isArray(this.state.searchResult)){
			return this.state.searchResult.map( id => {
					if (Number(id.id_vk) !== this.props.userId.id)
					return <li key={id.id_vk}><a href={"https://vk.com/id" + id.id_vk} target="_blank" rel="noopener noreferrer">{id.first_name + ' ' + id.last_name}</a></li>
				});
		}else{
			return <div>{this.state.searchResult}</div>
		}
	}

	render(){
		return(
			<FormLayoutGroup>
			{/*<Panel id={this.props.id}>
				<PanelHeader
					left={<HeaderButton onClick={this.props.go} data-to="home">
						{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
					</HeaderButton>}
				>
					Поиск
				</PanelHeader>*/}
				<br/>
				<Div style={{ padding: '0px 2rem' }}>
					<Select name="side" top="Предпочитаемая сторона" placeholder="любое" onChange={this.changeState}>
						<option value="right">Право</option>
						<option value="left">Лево</option>
						<option value="center">Центр</option>
					</Select>
				</Div>
				<br/>
				<Div style={{ padding: '0px 2rem' }}>
					<Select name="role" top="Амплуа" placeholder="любое" onChange={this.changeState}>
						<option value="goalkeeper">Вратарь</option>
						<option value="defender">Защитник</option>
						<option value="semi-defender">Полузащитник</option>
						<option value="forward">Нападающий</option>
					</Select>
				</Div>
				<br/>
				<Div style={{ padding: '0px 2rem' }}>
					<Select name="format" top="Формат" placeholder="любое" onChange={this.changeState}>
						<option value="11">11 x 11</option>
						<option value="8">8 x 8</option>
						<option value="6">6 x 6</option>
					</Select>
				</Div>
				<br/>
		    <Div style={{ padding: '0px 2rem' }}>
		      <Select name="skill" top="Основное преимущество" placeholder="любое" onChange={this.changeState}>
		        <option value="speed">Скорость</option>
		        <option value="phisics">Физика</option>
		        <option value="skill">Техника</option>
		        <option value="pass">Пас</option>
		        <option value="power">Удар</option>
		      </Select>
		    </Div>
				<br/>
				<Div>
					<Button size="xl" level="secondary" onClick={this.startSearch}>
						Искать
					</Button>
				</Div>
				<Div>
					<ul style={{listStyle: 'none'}}>
						{this.showSearchResult()}
					</ul>
				</Div>
			{/*</Panel>*/}
			</FormLayoutGroup>
		);
	}
}
