import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';


import Home from './panels/Home';
import {Football} from './panels/Football/Football';
import Hockey from './panels/Hockey/Hockey';
import Sports from './panels/Sports/Sports';
import {Search} from './panels/Search/Search';
import SearchResult from './panels/SearchResult/SearchResult';

import {getData, addUser, addData} from './util/requests';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			popout: null,
			activePanel: 'home',
			fetchedUser: null,
			type: 'football',
			format: '',
			role: '',
			side: '',
			skill: '',
			active: '',
		};

		this.openSheet = this.openSheet.bind(this);
		this.setUserData = this.setUserData.bind(this);
		this.addNewUser = this.addNewUser.bind(this);
		this.addNewData = this.addNewData.bind(this);
		this.getUserData = this.getUserData.bind(this);
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

	addNewData(key, value){
		value = key === 'active' ? !this.state.active : value;
		this.setState({ [key]: value });
		addData(this.state.fetchedUser.id, key, value, this.requestStatus);
		console.log('...data added');
	}

	requestStatus(e){
		console.log(`...${e}`);
	}

	setUserData(e){
		let data = JSON.parse(e);
		if(data){
			this.setState({
				type: data[0].type,
				format: data[0].format,
				role: data[0].role,
				side: data[0].side,
				skill: data[0].skill,
				active: data[0].active,
			})
		}
		//console.log("User exist");
		//console.log(this.state);
		//console.log(this.state.activePanel);
	}

	addNewUser(id){
		//console.log(id);
		//this.openSheet();
		//if(this.state.accept){
			addUser(this.state.fetchedUser, this.requestStatus);
			console.log("...new user added");
		//}else{
			//console.log("I'm, sorry (");
		//}

	}

	getUserData(id){
		//get request
		//if exist do nothing
		//else
		//getData(data.id, this.setUserData, this.addNewUser);
		getData(id, this.setUserData, this.openSheet);
		/*getData(data.id, this.printRequest);
		this.setState({ fetchedUser: data });*/
		//console.log(data);
		//console.log(data.id);
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
						this.getUserData();
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	}

	render() {
		return (
			<View popout={this.state.popout} activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} userData={this.state}/>
				<Football id="football" go={this.go} userData={this.state} addNewData={this.addNewData}/>
				<Hockey id="hockey" go={this.go}/>
				<Search id="search" go={this.go} userId={this.state.fetchedUser}/>
				<Sports id="sports" go={this.go}/>
				<SearchResult id="searchResult" go={this.go} userData={this.state}/>
			</View>
		);
	}
}

export default App;
