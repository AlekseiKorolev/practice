import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, ActionSheet, ActionSheetItem, Panel, ListItem, Group, Avatar,
				PanelHeader, HeaderButton, platform, IOS, List, Cell } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24UserAdded from '@vkontakte/icons/dist/24/user_added';
import Icon24Privacy from '@vkontakte/icons/dist/24/privacy';
import '@vkontakte/vkui/dist/vkui.css';

import {Sport} from './panels/Sport/Sport';
/*import {Home} from './panels/Home';*/
import {Football} from './panels/Football/Football';
/*import Hockey from './panels/Hockey/Hockey';
import Sports from './panels/Sports/Sports';*/
import {Search} from './panels/Search/Search';
/*import SearchResult from './panels/SearchResult/SearchResult';*/

import {getData, addUser, addData, deleteData} from './util/requests';

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
			footballSettings: {},
			/*
			hockeySettings: {},
			volleyballSettings: {
				type: ''
			},
			refereeSettings: {},
			coachSettings: {}*/
		};

		this.openSheet = this.openSheet.bind(this);
		this.setUserData = this.setUserData.bind(this);
		this.addNewUser = this.addNewUser.bind(this);
		this.addNewData = this.addNewData.bind(this);
		this.getUserData = this.getUserData.bind(this);
		this.deleteData = this.deleteData.bind(this);

		this.changeActivePanel = this.changeActivePanel.bind(this);
	}

	openSheet(id){
		this.setState({ popout:
			<ActionSheet
				onClose={() => this.setState({ popout: null })}
				title='Условия использования'
				text='Соглашаясь использовать приложение, вы позволяете приложению
					использовать ваши личные данные: индентификационный номер, текущий город
					проживания и фотографию профиля'
			>
				<ActionSheetItem autoclose onClick={() => this.addNewUser(id)}>Согласиться</ActionSheetItem>
				{/*<ActionSheetItem autoclose theme="destructive">Отказаться</ActionSheetItem>*/}
			</ActionSheet>
		});
	}

	addNewData(tab, value){
		console.log(this.state);
		//console.log(tab);
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
		this.setState({
			[tab]: 0,
			[tab+'Settings']: {}});

	}

	requestStatus(e){
		console.log(`...${e}`);
	}

	setUserData(e){
		let data = JSON.parse(e);
		//console.table(data);
		for(let i = 0; i < data.length; i++){
			if(data[i] && i === 0){
				this.setState({
					city_id: parseInt(data[i].city_id),
					football: parseInt(data[i].football),
					hokey: parseInt(data[i].hokey),
					volleyball: parseInt(data[i].volleyball),
					referee: parseInt(data[i].referee),
					coach: parseInt(data[i].coach),
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

	addNewUser(id){
			addUser(this.state.fetchedUser, this.requestStatus);
			//console.log("...new user added");
	}

	getUserData(id){
		getData(id, this.setUserData, this.openSheet);
	}

	componentDidMount() {
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
				</Panel>

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
			<Panel id="panelTeam">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'panelSport' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'panelSport' })}>Назад</HeaderButton>}>Команда</PanelHeader>
			</Panel>
			<Panel id="panelSearch">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'panelSport' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'panelSport' })}>Назад</HeaderButton>}>Поиск</PanelHeader>
					<Search userId={this.state.fetchedUser}/>
			</Panel>

			<Panel id="panelReferee">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'home' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'home' })}>Назад</HeaderButton>}>Судья</PanelHeader>
			</Panel>

			<Panel id="panelCoach">
				<PanelHeader
					left={<HeaderButton onClick={() => this.setState({ activePanel: 'home' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					addon={<HeaderButton onClick={() => this.setState({ activePanel: 'home' })}>Назад</HeaderButton>}>Тренер</PanelHeader>
			</Panel>
				{/*<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go}/>
				<Football id="football" go={this.go} userData={this.state} addNewData={this.addNewData}/>
				<Hockey id="hockey" go={this.go}/>
				<Search id="search" go={this.go} userId={this.state.fetchedUser}/>
				<Sports id="sports" go={this.go}/>
				<SearchResult id="searchResult" go={this.go} userData={this.state}/>*/}
			</View>
		);
	}
}

export default App;
