import React from 'react';
import {
  Button, Text, ListItem, Left, Right,
} from 'native-base';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class AddressListItem extends React.Component {
  render() {
    const { title, BtnText, sales, callback } = this.props;
    return (
      <React.Fragment>
        <ListItem itemDivider>
          <Text>{title}</Text>
        </ListItem>
        {sales.map(sale => (
          <ListItem key={sale.id}>
            <Left>
              <Text>{sale.name}</Text>
            </Left>
            <Right style={styles.container}>
              <Button
                onPress={() => callback(sale)}
                success
                large
              >
                <Text>{BtnText}</Text>
              </Button>
            </Right>
          </ListItem>
        ))}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
});

AddressListItem.propTypes = {
  title: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  sales: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  ])).isRequired,
  BtnText: PropTypes.string,
};

AddressListItem.defaultProps = {
  BtnText: 'Vykti',
};
