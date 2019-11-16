import React from 'react';
import {Div, Group, List, Cell} from '@vkontakte/vkui';
import Icon24Users from '@vkontakte/icons/dist/24/users';
import Icon24Search from '@vkontakte/icons/dist/24/search';

export class Sport extends React.Component {

	sportInfo(e){
		let text='';
		if(e.football){
			text+='Футболист  ';
			if(e.footballSettings.format){
				text += 'формат игры:' + e.footballSettings.format.map(item => ' ' + item + 'x' + item);
				text += ',';
			};
			if(e.footballSettings.role){
				text += ' амплуа:' + e.footballSettings.role.map(item => ' ' + item);
				text += ',';
			};
			if(e.footballSettings.side){
				text += ' сторона: ' + e.footballSettings.side.map(item => ' ' + item);
				text += ',';
			};
			if(e.footballSettings.skill){
				text += ' навык: ' + e.footballSettings.skill.map(item => ' ' + item);
				text += ',';
			};
			if(e.footballSettings.active){
				text += ' в активном поиске';
				text += ',';
			};
			text = text.slice(0,text.length-1) + '.';
		} else
		/*if(e.hockey){
			text.push('Хоккеист ' + (e.hockeySettings.active ? 'в активном поиске' : ''));
		}
		if(e.volleyball){
			text.push('Воллейболист ' + (e.volleyballSettings.active ? 'в активном поиске' : ''));
		}*/
		{
			return 'Нет профиля'
		}
		return text
	}

	render(){
		return (
				<div>
					<Group>
						<Group title="Краткая информация">
							<Div>
							{ this.sportInfo(this.props.state) }
							</Div>
						</Group>
						<Group title="Инструменты">
							<List>
								<Cell expandable onClick={ () => this.props.changeActivePanel('panelSearch')  } before={<Icon24Search />}>
									Поиск партнера
								</Cell>
								<Cell expandable onClick={ () => this.props.changeActivePanel('panelTeam')  } before={<Icon24Users />}>
									Команда
								</Cell>
							</List>
						</Group>
						<Group title="Изменить данные">
							<List>
								<Cell expandable onClick={ () => this.props.changeActivePanel('panelFootball')  }>
									Футбол
								</Cell>
								{/*<Cell expandable onClick={ () => this.props.changeActivePanel('panelHockey') }>
									Хоккей
								</Cell>
								<Cell expandable onClick={ () => this.props.changeActivePanel('panelVoleyball') }>
									Волейбол
								</Cell>*/}
							</List>
						</Group>
					</Group>
				</div>
		)
	}
}
