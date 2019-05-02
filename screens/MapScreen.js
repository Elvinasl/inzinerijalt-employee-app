import React, { Component } from 'react';
import { Container, Header, Title, Body, Right, Text, Button } from 'native-base';
import { StyleSheet } from "react-native";
import { MapView } from 'expo';

export default class ListExample extends Component {

    _finishTask() {
        console.log('finished');
        const { navigation } = this.props;
        navigation.push('List')
    }

    render() {
        const { navigation } = this.props;
        const address = navigation.getParam('address', '');
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Darbas {address}</Title>
                    </Body>
                    <Right>
                        <Button
                            onPress={() => this._finishTask()}
                            danger
                        >
                            <Text>Baigti darbą</Text>
                        </Button>
                    </Right>
                </Header>
                <MapView
                    style={styles.mapContainer}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
    }
});
