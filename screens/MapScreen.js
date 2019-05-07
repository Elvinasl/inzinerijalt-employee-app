import React, { Component } from 'react';
import { Container } from 'native-base';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import RegularHeader from "../components/RegularHeader";
import MapDirections from "../components/Map/MapDirections";

export default class ListExample extends Component {

    constructor(props) {
        super(props);

        const address = props.navigation.getParam('address', '-');

        let destination = null;
        if (address.latitude && address.longitude) {
            destination = {
                latitude: parseFloat(address.latitude),
                longitude: parseFloat(address.longitude),
            }
        } else {
            destination = address.name;
        }

        this.state = {
            destinationAddress: destination,
            destinationName: address.name
        };

        this.startTime = new Date().getTime();
    }

    _finishTask = () => {
        this._sendDrivenData();
        const { navigation } = this.props;
        navigation.push('List')
    };

    _sendDrivenData() {
        const endTime = new Date().getTime();

        const data = {
          startTime: this.startTime,
          endTime: endTime,
        };

        // TODO: add more data
    }

    render() {
        const { destinationAddress, destinationName } = this.state;
        return (
            <Container style={styles.container}>
                <RegularHeader
                    title={destinationName}
                    rightBtnText={'Baigti darbą'}
                    onRightPress={this._finishTask}
                />
                { destinationAddress &&
                    <MapDirections
                      destination={destinationAddress}
                    />
                }
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        display: 'flex',
        flexDirection: 'column',

    },
});
