import React from 'react';
import {
  Text, Body, Title, Right, Button, Header,
} from 'native-base';
import PropTypes from 'prop-types';

export default class RegularHeader extends React.Component {
  render() {
    const { title, onRightPress, rightBtnText } = this.props;
    return (
      <Header>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right>
          <Button
            onPress={onRightPress}
            danger
          >
            <Text>{rightBtnText}</Text>
          </Button>
        </Right>
      </Header>
    );
  }
}

RegularHeader.propTypes = {
  title: PropTypes.string.isRequired,
  rightBtnText: PropTypes.string.isRequired,
  onRightPress: PropTypes.func.isRequired,
};
