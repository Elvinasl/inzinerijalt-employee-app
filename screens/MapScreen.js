import React, { Component } from 'react';
import { Container } from 'native-base';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import RegularHeader from "../components/RegularHeader";
import MapDirections from "../components/Map/MapDirections";

export default class ListExample extends Component {

    constructor(props) {
        super(props);

        this.state = {
            destinationAddress: 'Guobu aklg. 3',//props.navigation.getParam('address', '-'),
        };
    }

    _finishTask() {
        console.log('finished');
        const { navigation } = this.props;
        navigation.push('List')
    }

    render() {
        const { destinationAddress } = this.state;
        return (
            <Container style={styles.container}>
                <RegularHeader
                    title={`Darbas ${destinationAddress}`}
                    rightBtnText={'Baigti darbą'}
                    onRightPress={this._finishTask}
                />
                <MapDirections
                    destination={destinationAddress}
                />
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
