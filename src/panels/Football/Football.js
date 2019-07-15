import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, Div, FormLayout, Radio, Group, Checkbox, Select, Cell, Switch, platform, IOS} from '@vkontakte/vkui';
import './Football.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

const Football = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<HeaderButton onClick={props.go} data-to="home">
				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			Футбол
		</PanelHeader>
    <FormLayout>
    <Group title="Формат" style={{ padding: '0px 2rem' }}>
        <div>
          <Radio name="team" value="11">11 x 11</Radio>
          <Radio name="team" value="8">8 x 8</Radio>
          <Radio name="team" value="6" defaultChecked>6 x 6</Radio>
        </div>
    </Group>
    <Group title="Амплуа" style={{ padding: '0px 2rem' }}>
        <div>
          <Radio name="role" value="goalkeeper">Вратарь</Radio>
          <Radio name="role" value="defender">Защитник</Radio>
          <Radio name="role" value="semi-defender" defaultChecked>Полузащитник</Radio>
          <Radio name="role" value="forward">Нападающий</Radio>
        </div>
    </Group>
    <Group title="Предпочитаемая сторона" style={{ padding: '0px 2rem' }}>
          <Checkbox value="right">Право</Checkbox>
          <Checkbox value="left" defaultChecked>Лево</Checkbox>
          <Checkbox value="center">Центр</Checkbox>
    </Group>
    <Div style={{ padding: '0px 2rem' }}>
      <Select top="Основное преимущество" placeholder="Выберите из списка">
        <option value="speed">Скорость</option>
        <option value="phisics">Физика</option>
        <option value="skill">Техника</option>
        <option value="pass">Пас</option>
        <option value="power">Удар</option>
      </Select>
    </Div>
    <Group style={{ padding: '0px 2rem' }}>
      <Cell asideContent={<Switch />}>
        В поиске команды
      </Cell>
    </Group>
    </FormLayout>
	</Panel>
);

Football.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Football;
