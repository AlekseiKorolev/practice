import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, Div, Group, platform, IOS} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

const SearchResult = props => (
	<Panel id={props.id}>
    <PanelHeader
      left={<HeaderButton onClick={props.go} data-to="home">
        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
      </HeaderButton>}
    >
      Результаты поиска
    </PanelHeader>

		<Group>
			<Div>
				Пока никого не нашли
			</Div>
		</Group>
	</Panel>
);

SearchResult.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default SearchResult;
