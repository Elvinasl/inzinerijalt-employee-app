import React, { Component } from 'react';
import { Container, Header, Title, Body, Right, Text, Button } from 'native-base';
import { StyleSheet } from "react-native";
import { MapView, Location, Permissions } from 'expo';

export default class ListExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: null,
        };

        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.045,
        };
        this.setState({ region });
    };


    _finishTask() {
        console.log('finished');
        const { navigation } = this.props;
        navigation.push('List')
    }

    render() {
        const { navigation } = this.props;
        const { region } = this.state;
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
                    initialRegion={region}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
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
