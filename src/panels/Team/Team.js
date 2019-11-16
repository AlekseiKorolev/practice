import React from 'react';
import {Div, Group, List, Cell} from '@vkontakte/vkui';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24UserOutgoing from '@vkontakte/icons/dist/24/user_outgoing';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';

export const Team = (props) => {
	return (
		<div>
			<Group>
        <Group title="Краткая информация">
          <Div>
            { props.teams ? 'Вы состоите в командах, подробнее на вкладке "Мои команды"' : 'Команда отсутствует'}
          </Div>
        </Group>
        <Group title="Инструменты">
					<List>
						<Cell expandable onClick={ () => props.changeActivePanel('panelMyTeams')  } before={<Icon24UserOutgoing />}>
							Мои команды
						</Cell>
						<Cell expandable onClick={ () => props.teamComponentStatus('search')  } before={<Icon24Search />}>
							Поиск команды
						</Cell>
						<Cell expandable onClick={ () => props.teamComponentStatus('create')  } before={<Icon24FavoriteOutline />}>
							Создать команду
						</Cell>
					</List>
				</Group>
			</Group>
		</div>
	)
}
