import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, Div, platform, IOS} from '@vkontakte/vkui';
import './Hockey.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

const Hockey = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<HeaderButton onClick={props.go} data-to="home">
				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			Хоккей
		</PanelHeader>
    <Div style={{ textAlign: 'center' }}>
    В разработке
    </Div>
	</Panel>
);

Hockey.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Hockey;
