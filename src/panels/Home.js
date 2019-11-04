import React from 'react';
import { Panel, ListItem, Group, Avatar, PanelHeader, CellButton, View, HeaderButton, platform, IOS} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

export class Home extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			activePanel: 'home'
		}
	}

	render(){
		return (
			<View activePanel={this.state.activePanel}>

				<Panel id="home">
					<Group>
					{this.props.fetchedUser &&
						<ListItem
							before={this.props.fetchedUser.photo_200 ? <Avatar src={this.props.fetchedUser.photo_200}/> : null}
							description={this.props.fetchedUser.city && this.props.fetchedUser.city.title ? this.props.fetchedUser.city.title : ''}
						>
							{`${this.props.fetchedUser.first_name} ${this.props.fetchedUser.last_name}`}
						</ListItem>}
					</Group>
					<Group>
						<CellButton onClick={ () => this.setState({ activePanel: 'panelSport' })  }>
							Спортсмен
						</CellButton>
					</Group>
					<Group>
						<CellButton onClick={ () => this.setState({ activePanel: 'panelReferee' }) }>
							Судья
						</CellButton>
					</Group>
					<Group>
						<CellButton onClick={ () => this.setState({ activePanel: 'panelCoach' }) }>
							Тренер
						</CellButton>
					</Group>
				</Panel>

				<Panel id="panelSport">
					<PanelHeader
						left={<HeaderButton onClick={() => this.setState({ activePanel: 'home' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
						addon={<HeaderButton onClick={() => this.setState({ activePanel: 'home' })}>Назад</HeaderButton>}
					>
						Спортсмен
					</PanelHeader>
					<br/>
					    Написать что-нибудь здесь
				</Panel>

				<Panel id="panelReferee">
					<PanelHeader
						left={<HeaderButton onClick={() => this.setState({ activePanel: 'panelProfile' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					>
						Судья
					</PanelHeader>
				</Panel>

				<Panel id="panelCoach">
					<PanelHeader
						left={<HeaderButton onClick={() => this.setState({ activePanel: 'panelProfile' })}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
					>
						Тренер
					</PanelHeader>
				</Panel>
			</View>
		)
	}
}
