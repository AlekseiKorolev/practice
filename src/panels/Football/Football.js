import React from 'react';
import {FormLayout,Checkbox, Cell, Switch, FormLayoutGroup, Button} from '@vkontakte/vkui';
import './Football.css';

export class Football extends React.Component {
	constructor(props){
		super(props);

		this.checkState = this.checkState.bind(this);
		this.changeState = this.changeState.bind(this);
		this.deleteData = this.deleteData.bind(this);
	}

	deleteData(){
		this.props.deleteData('football');
		this.props.changeActivePanel('panelSport')
	}

	checkState(e){
		if(e === 'active'){
			return isNaN(parseInt(this.props.state.active)) ? 0 : parseInt(this.props.state.active)
		}
		return Object.keys(this.props.state).some(key => {
			try{
				return this.props.state[key].some(item => item === e)
			}catch(error){
				//console.warn(error);
			}
		})
	}

	changeState(e){
		let football = this.props.state;
		let newValue = [];
		if(e.target.id === 'active'){
			football.active = e.target.checked ? 1 : 0;
		} else {
			let settings = {
				format: ['11','8','6'],
				role: ['goalkeeper','defender','semi-defender','forward'],
				side: ['left','right','center'],
				skill: ['skill','pass','power','speed','phisics']
			}
			let key = Object.keys(settings).filter(key => {
				if(settings[key].includes(e.target.id)){
					return key
				}
			});
			try{
				newValue = this.props.state[key].filter(item => item !== e.target.id);
			}catch(error){
				//console.warn(error)
			}
			!e.target.checked || newValue.push(e.target.id);
			football[key] = newValue;
		}
		this.props.addNewData('football',football);
	}

	render(){
		return(
			<div>
				<FormLayout>
					<FormLayoutGroup top="Формат">
						<Checkbox id='11' defaultChecked={this.checkState('11')} onChange={this.changeState}>11 x 11</Checkbox>
						<Checkbox id='8' defaultChecked={this.checkState('8')} onChange={this.changeState}>8 x 8</Checkbox>
						<Checkbox id='6' defaultChecked={this.checkState('6')} onChange={this.changeState}>6 x 6</Checkbox>
					</FormLayoutGroup>
					<FormLayoutGroup top="Амплуа">
						<Checkbox id='goalkeeper'  defaultChecked={this.checkState('goalkeeper')} onChange={this.changeState}>Вратарь</Checkbox>
						<Checkbox id='defender' defaultChecked={this.checkState('defender')} onChange={this.changeState}>Защитник</Checkbox>
						<Checkbox id='semi-defender' defaultChecked={this.checkState('semi-defender')} onChange={this.changeState}>Полузащитник</Checkbox>
						<Checkbox id='forward' defaultChecked={this.checkState('forward')} onChange={this.changeState}>Нападающий</Checkbox>
					</FormLayoutGroup>
					<FormLayoutGroup top="Предпочитаемая сторона">
						<Checkbox id='left' defaultChecked={this.checkState('left')} onChange={this.changeState}>Лево</Checkbox>
						<Checkbox id='right' defaultChecked={this.checkState('right')} onChange={this.changeState}>Право</Checkbox>
						<Checkbox id='center' defaultChecked={this.checkState('center')} onChange={this.changeState}>Центр</Checkbox>
					</FormLayoutGroup>
					<FormLayoutGroup top="Основное преимущество">
						<Checkbox id='speed' defaultChecked={this.checkState('speed')} onChange={this.changeState}>Скорость</Checkbox>
						<Checkbox id='pass' defaultChecked={this.checkState('pass')} onChange={this.changeState}>Пас</Checkbox>
						<Checkbox id='skill' defaultChecked={this.checkState('skill')} onChange={this.changeState}>Техника</Checkbox>
						<Checkbox id='power' defaultChecked={this.checkState('power')} onChange={this.changeState}>Удар</Checkbox>
						<Checkbox id='phisics' defaultChecked={this.checkState('phisics')} onChange={this.changeState}>Физика</Checkbox>
					</FormLayoutGroup>
					<FormLayoutGroup top="Статус">
						<Cell asideContent={<Switch id='active' defaultChecked={this.checkState('active')}/>} onChange={this.changeState}>
							В поиске команды
						</Cell>
					</FormLayoutGroup>
					{/*<Button size="xl" onClick={ () => this.changeSettings('save')}>Сохранить данные</Button>*/}
					<Button size="xl" level="destructive" onClick={ this.deleteData }>Удалить данные</Button>
				</FormLayout>
			</div>
		);
	}
}
