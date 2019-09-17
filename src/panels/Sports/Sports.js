import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, Div, Button, Group, platform, IOS} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

const Sports = props => (
	<Panel id={props.id}>
    <PanelHeader
      left={<HeaderButton onClick={props.go} data-to="home">
        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
      </HeaderButton>}
    >
      Выбор вида спорта
    </PanelHeader>

		<Group title="Выберите вид спорта">
			<Div>
				<Button size="xl" level="2" onClick={props.go} data-to="football">
					Футбол
				</Button>
				<br/>
				{/*<Button size="xl" level="2" onClick={props.go} data-to="hockey">
					Хоккей
				</Button>*/}
			</Div>
		</Group>
	</Panel>
);

Sports.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Sports;
