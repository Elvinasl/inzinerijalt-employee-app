import React, { Component } from 'react';
import { Container, Header, Title, Body, Right, Text, Button } from 'native-base';
import { Dimensions, StyleSheet, Alert } from 'react-native';
import { MapView, Location, Permissions, Constants } from 'expo';
import MapViewDirections from 'react-native-maps-directions';
import Globals from '../Globals';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_DIRECTIONS_API_KEY = Globals.GOOGLE_DIRECTIONS_API;

export default class ListExample extends Component {

    constructor(props) {
        super(props);

        const address = props.navigation.getParam('address', '');
        this.state = {
            address: address,
            region: null,
            destination: {
                latitude: 55.782822,
                longitude: 21.492790,
            },
        };

        this.mapView = null;
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
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };
        this.setState({ region });
    };

    _showRoutePreview = (result) => {
        this.mapView.fitToCoordinates(result.coordinates, {
            edgePadding: {
                right: (width / 20),
                bottom: (height / 20),
                left: (width / 20),
                top: (height / 20),
            }
        });
    };

    _onError = (errorMessage) => {
        Alert.alert('Klaida', errorMessage);
    };


    _finishTask() {
        console.log('finished');
        const { navigation } = this.props;
        navigation.push('List')
    }

    render() {
        const { region, destination, address } = this.state;
        return (
            <Container style={styles.container}>
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
                { region &&
                    <MapView
                        initialRegion={region}
                        style={styles.mapContainer}
                        ref={c => this.mapView = c}
                        loadingEnabled={true}
                        showsUserLocation={true}
                        followsUserLocation={true}
                    >
                    {destination &&
                        <MapView.Marker coordinate={destination} />
                    }
                    { destination && region && (
                        <MapViewDirections
                            origin={region}
                            destination={destination}
                            apikey={GOOGLE_DIRECTIONS_API_KEY}
                            strokeWidth={5}
                            strokeColor="blue"
                            onReady={this._showRoutePreview}
                            onError={this._onError}
                        />
                    )}
                </MapView>}
    </Container>
        );
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
    },
    container: {
        paddingTop: Constants.statusBarHeight,
    },
});
