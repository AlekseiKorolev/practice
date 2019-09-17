import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, Div, FormLayout, Radio, Group, Checkbox, Select, Cell, Switch, platform, IOS} from '@vkontakte/vkui';
import './Football.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

export class Football extends React.Component {
	constructor(props){
		super(props);

		this.changeState = this.changeState.bind(this);
	}

	changeState(e){
		this.props.addNewData(e.target.name, e.target.value)
	}

	render(){
		return(
			<Panel id={this.props.id}>
				<PanelHeader
					left={<HeaderButton onClick={this.props.go} data-to="sports">
						{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
					</HeaderButton>}
				>
					Футбол
				</PanelHeader>
		    <Group title="Формат" style={{ padding: '0px 2rem' }}>
					<div>
		          <Radio name="format" value="11" defaultChecked={this.props.userData.format === "11"} onChange={this.changeState}>11 x 11</Radio>
		          <Radio name="format" value="8" defaultChecked={this.props.userData.format === "8"} onChange={this.changeState}>8 x 8</Radio>
		          <Radio name="format" value="6" defaultChecked={this.props.userData.format === "6"} onChange={this.changeState}>6 x 6</Radio>
		       </div>
		    </Group>
		    <Group title="Амплуа" style={{ padding: '0px 2rem' }}>
		        <div>
		          <Radio name="role" value="goalkeeper" defaultChecked={this.props.userData.role === "goalkeeper"} onChange={this.changeState}>Вратарь</Radio>
		          <Radio name="role" value="defender" defaultChecked={this.props.userData.role === "defender"} onChange={this.changeState}>Защитник</Radio>
		          <Radio name="role" value="semi-defender" defaultChecked={this.props.userData.role === "semi-defender"} onChange={this.changeState}>Полузащитник</Radio>
		          <Radio name="role" value="forward" defaultChecked={this.props.userData.role === "forward"} onChange={this.changeState}>Нападающий</Radio>
		        </div>
		    </Group>
		    <Group title="Предпочитаемая сторона" style={{ padding: '0px 2rem' }}>
		          <Radio name="side" value="right" defaultChecked={this.props.userData.side === "right"} onChange={this.changeState}>Право</Radio>
		          <Radio name="side" value="left" defaultChecked={this.props.userData.side === "left"} onChange={this.changeState}>Лево</Radio>
		          <Radio name="side" value="center" defaultChecked={this.props.userData.side === "center"} onChange={this.changeState}>Центр</Radio>
		    </Group>
		    <Div style={{ padding: '0px 2rem' }}>
		      <Select name="skill" top="Основное преимущество" placeholder="могу всё" defaultValue={this.props.userData.skill} onChange={this.changeState}>
		        <option value="speed">Скорость</option>
		        <option value="phisics">Физика</option>
		        <option value="skill">Техника</option>
		        <option value="pass">Пас</option>
		        <option value="power">Удар</option>
		      </Select>
		    </Div>
		    <Group style={{ padding: '0px 2rem' }}>
		      <Cell asideContent={<Switch name="active" defaultChecked={this.props.userData.active} onChange={this.changeState}/>}>
		        В поиске команды
		      </Cell>
		    </Group>
			</Panel>
		);
	}
}
