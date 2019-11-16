import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, Panel, ListItem, Group, Avatar,
				PanelHeader, HeaderButton, List, Cell, Alert, FormLayout, Button,
				platform, IOS } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24UserAdded from '@vkontakte/icons/dist/24/user_added';
import Icon24Privacy from '@vkontakte/icons/dist/24/privacy';
import '@vkontakte/vkui/dist/vkui.css';
import gameOver from './img/gameover.jpg';

import { Sport } from './panels/Sport/Sport';
import { Football } from './panels/Football/Football';

import { Team } from './panels/Team/Team';
import { MyTeams } from './panels/MyTeams/MyTeams';
import { CreateTeam } from './panels/CreateTeam/CreateTeam';

//import { SearchTeam } from './panels/SearchTeam/SearchTeam';
import { Search } from './panels/Search/Search';


import {getData, addUser, addData, deleteData, createTeam, searchTeam} from './util/requests';

const osname = platform();

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			popout: null,
			activePanel: 'home',
			fetchedUser: null,
			city_id: '',
			football: '',
			hokey: '',
			volleyball: '',
			referee: '',
			coach: '',
			teams: '',
			footballSettings: {},
			teamComponentStatus: '',
			//createTeamStatus: '',
			/*hockeySettings: {},
			volleyballSettings: {
			},
			refereeSettings: {},
			coachSettings: {}*/
		};

		this.openSheet = this.openSheet.bind(this);
		this.closePopout = this.closePopout.bind(this);
		this.setUserData = this.setUserData.bind(this);
		this.addNewUser = this.addNewUser.bind(this);
		this.addNewData = this.addNewData.bind(this);
		this.getUserData = this.getUserData.bind(this);
		this.deleteData = this.deleteData.bind(this);
		this.createTeam = this.createTeam.bind(this);
		this.searchTeam = this.searchTeam.bind(this);
		this.teamComponentStatus = this.teamComponentStatus.bind(this);
		this.createTeamStatus = this.createTeamStatus.bind(this);
		this.deleteProfileData = this.deleteProfileData.bind(this);

		this.changeActivePanel = this.changeActivePanel.bind(this);
	}

	openSheet(data){
		this.setState({ popout:
			<Alert
				actions = {data.action}
        onClose={this.closePopout}
      >
        <h2>{data.title}</h2>
        <p>{data.text}</p>
      </Alert>
			/*<ActionSheet
				onClose={() => this.setState({ popout: null })}
				title={data.title}
				text={data.text}
			>
				<ActionSheetItem autoclose onClick={() => this.addNewUser()}>Согласиться</ActionSheetItem>
				<ActionSheetItem autoclose theme="destructive">Отказаться</ActionSheetItem>
			</ActionSheet>*/
		});
	}
	closePopout () {
		this.setState({ popout: null });
	}

	componentDidMount(){
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
						this.setState({ fetchedUser: e.detail.data });
						this.getUserData(e.detail.data.id);
						//console.log(e.detail.data);
					break;
				default:
						console.log("Something went wrong");
						//this.getUserData();
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	changeActivePanel(e){
		this.setState({ activePanel : e })
	}

	requestStatus(e){
		console.log(`...${e}`);
	}

	addNewData(tab, value){
		//console.log(this.state);
		if(this.state[tab] === 0 || !this.state[tab]){
			this.setState({[tab]: 1});
		}
		this.setState({[tab + 'Settings']: value})
		Object.keys(value).forEach( key => {
			if(key === 'active'){
				addData(this.state.fetchedUser.id, tab, key, value[key], this.requestStatus)
			} else {
				addData(this.state.fetchedUser.id, tab, key, value[key] ? value[key].join(',') : '', this.requestStatus)
			}
		})
	}
	deleteData(tab){
		deleteData(this.state.fetchedUser.id, tab, this.requestStatus);
		if (tab !== 'mainBase') {
			this.setState({
				[tab]: 0,
				[tab+'Settings']: {}});
		}
	}

	setUserData(e){
		let data = JSON.parse(e);
		//console.table(data);
		for(let i = 0; i < data.length; i++){
			if(data[i] && i === 0){
				this.setState({
					city_id: parseInt(data[i].city_id),
					football: parseInt(data[i].football),
					teams: data[i].teams ? data[i].teams.split('*') : '',
					//hokey: parseInt(data[i].hokey),
					//volleyball: parseInt(data[i].volleyball),
					//referee: parseInt(data[i].referee),
					//coach: parseInt(data[i].coach),
				})
			} else if (data[i].football === 'football'){
				this.setState({
					footballSettings: {
						format: data[i].format ? data[i].format.split(',') : '',
						role: data[i].role ? data[i].role.split(',') : '',
						side: data[i].side ? data[i].side.split(',') : '',
						skill: data[i].skill ? data[i].skill.split(',') : '',
						active: data[i].active
					}
				})
			}
		}
	}
	addNewUser(){
			addUser(this.state.fetchedUser, this.requestStatus);
			//console.log("...new user added");
	}
	getUserData(id){
		getData(id, this.setUserData, this.openSheet,
			{
				name: 'conditions',
				title: 'Условия использования',
				text: 'Соглашаясь, вы позволяете приложению использовать ваши данные в ВК',
				action:
					[
						{
							title: 'Отмена',
							autoclose: true,
							style: 'cancel'
						}, {
							title: 'Хорошо',
							autoclose: true,
							action: () => this.addNewUser()
						}
					]
			}
		);
	}
	deleteProfileData(){
		this.deleteData('football');
		this.deleteData('mainBase');
		this.changeActivePanel('panelGameOver');
	}


	teamComponentStatus(data){
		this.setState({
			teamComponentStatus: data === 'search' ? false : true
		})
		this.changeActivePanel('panelCreateTeam');
	}
	createTeamStatus(e){
		let message = e;
		if (e.includes('*')) {
			message = e.slice(e.indexOf('*') + 1);
			const teamData = e.slice(0, e.indexOf('*'));
			const newTeamData = {
				name: teamData.slice(0, teamData.indexOf(' ')),
				type: teamData.slice(teamData.indexOf(' ') + 1),
			};
			const teamsArray = this.state.teams ? (this.state.teams).slice() : [];
			teamsArray.push(newTeamData);
			this.setState({
				teams: teamsArray
			})
		}
		this.openSheet({
			name: 'createTeam',
			title: '',
			text: message,
			action:
				[
					{
						title: message.includes('создана') ? 'Хорошо' : 'Эх-х-х',
						autoclose: true,
						style: message.includes('создана') ? 'default' : 'destructive'
					}
				]
		})
	}

	createTeam(data){
		if(data.teamType && data.teamName){
			createTeam(this.state.fetchedUser.id, data, this.createTeamStatus);
		} else {
			this.openSheet({
				name: 'createTeam',
				title: '',
				text: 'Необходимо ввести все данные',
				action:
					[
						{
							title: 'Попробую',
							autoclose: true,
							style: 'destructive'
						}
					]
			})
		}
	}
	searchTeam(data, callback){
		searchTeam(data, callback);
	}

	render() {
		return (
			<View popout={this.state.popout} activePanel={this.state.activePanel}>
				<Panel id="home">
					<PanelHeader>Профиль</PanelHeader>
					<Group>
					{this.state.fetchedUser &&
						<ListItem
							before={this.state.fetchedUser.photo_200 ? <Avatar src={this.state.fetchedUser.photo_200} size={80}/> : null}
							description={this.state.fetchedUser.city && this.state.fetchedUser.city.title ? this.state.fetchedUser.city.title : ''}
						>
							<b>{`${this.state.fetchedUser.first_name} ${this.state.fetchedUser.last_name}`}</b>
							, активный профиль: { this.state.football || this.state.hockey || this.state.volleyball ? 'спортсмен' : 'нет активного профиля'}
							{ this.state.referee ? ', судья' : ''}
							{ this.state.coach ? ', тренер' : ''}
						</ListItem>}
					</Group>
					<Group title="Выбор профиля">
						<List>
							<Cell expandable onClick={ () => this.setState({ activePanel: 'panelSport' })  } before={<Icon24UserAdded />}>Спортсмен</Cell>
							<Cell expandable onClick={ () => this.setState({ activePanel: 'panelReferee' }) } before={<Icon24Privacy />}>Судья</Cell>
							<Cell expandable onClick={ () => this.setState({ activePanel: 'panelCoach' }) } before={<Icon24Education />}>Тренер</Cell>
						</List>
					</Group>
					<FormLayout>
						<Button size="xl" level="destructive" onClick={ this.deleteProfileData }>Удалить профиль</Button>
					</FormLayout>
				</Panel>
			{/*Sports panels*/}
			<Panel id="panelSport">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'home' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'home' })}>Назад</HeaderButton>}>Спортсмен</PanelHeader>
				<Sport changeActivePanel={this.changeActivePanel} state={this.state} />
			</Panel>
			<Panel id="panelFootball">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'panelSport' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'panelSport' })}>Назад</HeaderButton>}>Футбол</PanelHeader>
				<Football id="football" changeActivePanel={this.changeActivePanel} state={this.state.footballSettings} addNewData={this.addNewData} deleteData={this.deleteData}/>
			</Panel>
			{/*Teams panels*/}
			<Panel id="panelTeam">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'panelSport' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'panelSport' })}>Назад</HeaderButton>}>Команда</PanelHeader>
				<Team changeActivePanel={this.changeActivePanel} teamComponentStatus={this.teamComponentStatus} teams={this.state.teams}/>
			</Panel>
			<Panel id="panelMyTeams">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'panelTeam' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'panelTeam' })}>Назад</HeaderButton>}>Мои команды</PanelHeader>
				<MyTeams myTeams={this.state.teams}/>
			</Panel>
			{/*<Panel id="panelSearchTeam">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'panelTeam' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'panelTeam' })}>Назад</HeaderButton>}>Найти команду</PanelHeader>
				<SearchTeam />
			</Panel>*/}
			<Panel id="panelCreateTeam">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'panelTeam' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'panelTeam' })}>Назад</HeaderButton>}>{this.state.teamComponentStatus ? 'Создать команду' : 'Найти команду'}</PanelHeader>
				<CreateTeam createTeam={this.createTeam} searchTeam={this.searchTeam} teamComponentStatus={this.state.teamComponentStatus}/>
			</Panel>
			{/*Search panel*/}
			<Panel id="panelSearch">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'panelSport' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'panelSport' })}>Назад</HeaderButton>}>Поиск</PanelHeader>
					<Search userId={this.state.fetchedUser}/>
			</Panel>
			{/*Referee panel*/}
			<Panel id="panelReferee">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'home' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'home' })}>Назад</HeaderButton>}>Судья</PanelHeader>
			</Panel>
			{/*Coach panel*/}
			<Panel id="panelCoach">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'home' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'home' })}>Назад</HeaderButton>}>Тренер</PanelHeader>
			</Panel>
			{/*GameOver panel*/}
			<Panel id="panelGameOver">
				<PanelHeader>Конец игры</PanelHeader>
				<img src={gameOver} alt="Конец игры" style={{width: '100%', height: '100%'}}/>
			</Panel>
			</View>
		);
	}
}

export default App;
