import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Football from './panels/Football/Football';
import Hockey from './panels/Hockey/Hockey';
import Sports from './panels/Sports/Sports';
import Search from './panels/Search/Search';
import SearchResult from './panels/SearchResult/SearchResult';

import {getData} from './util/requests';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
		};
	}

	printRequest(e){
		console.log(e);
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					//
			}
			getData(this.printRequest);
			console.table(e.detail.data);
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	}

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
				<Football id="football" fetchedUser={this.state.fetchedUser} go={this.go}/>
				<Hockey id="hockey" frtchedUser={this.state.fetchedUser} go={this.go}/>
				<Search id="search" frtchedUser={this.state.fetchedUser} go={this.go}/>
				<Sports id="sports" frtchedUser={this.state.fetchedUser} go={this.go}/>
				<SearchResult id="searchResult" frtchedUser={this.state.fetchedUser} go={this.go}/>
			</View>
		);
	}
}

export default App;
