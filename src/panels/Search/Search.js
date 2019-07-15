import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, Div, Button, Group, platform, IOS} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

const Search = props => (
	<Panel id={props.id}>
    <PanelHeader
      left={<HeaderButton onClick={props.go} data-to="home">
        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
      </HeaderButton>}
    >
      Поиск команды
    </PanelHeader>

		<Group title="Поиск команды">
			<Div>
        Поиск команды для игры в <b>футбол, 6 x 6, левый полузащитник</b><br/><br/>
				<Button size="xl" level="2" onClick={props.go} data-to="searchResult">
					Поиск
				</Button>
			</Div>
		</Group>
	</Panel>
);

Search.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default Search;
