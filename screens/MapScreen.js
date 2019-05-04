import React, { Component } from 'react';
import { Container, Title, Body, Right, Text, Button } from 'native-base';
import { Dimensions, StyleSheet, Alert } from 'react-native';
import { MapView, Location, Permissions, Constants } from 'expo';
import MapViewDirections from 'react-native-maps-directions';
import Globals from '../Globals';
import DestinationButtons from "../components/Map/DestinationButtons";
import RegularHeader from "../components/RegularHeader";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_DIRECTIONS_API_KEY = Globals.GOOGLE_DIRECTIONS_API;

export default class ListExample extends Component {

    constructor(props) {
        super(props);

        this.state = {
            destinationAddress: 'Guobu aklg. 3',//props.navigation.getParam('address', '-'),
            region: null,
            destinationCoordinates: null,
            distance: null,
            duration: null,
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

    _onDirectionsReady = (directions) => {
        const { distance, duration, coordinates } = directions;
        const destinationCoordinates = coordinates[coordinates.length - 1];

        this.mapView.fitToCoordinates(coordinates, {
            edgePadding: {
                right: (width / 20),
                bottom: (height / 20),
                left: (width / 20),
                top: (height / 20),
            }
        });
        this.setState({ destinationCoordinates, distance, duration })
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
        const { region, destinationCoordinates, destinationAddress, duration, distance } = this.state;
        return (
            <Container style={styles.container}>
                <RegularHeader
                    title={`Darbas ${destinationAddress}`}
                    rightBtnText={'Baigti darbą'}
                    onRightPress={this._finishTask}
                />
                { duration && distance &&
                    <DestinationButtons duration={duration} distance={distance} />
                }
                { region
                && <MapView
                        initialRegion={region}
                        style={styles.mapContainer}
                        ref={c => this.mapView = c}
                        loadingEnabled={true}
                        showsUserLocation={true}
                        followsUserLocation={true}
                    >
                    {destinationCoordinates &&
                        <MapView.Marker coordinate={destinationCoordinates} />
                    }
                    { region && destinationAddress &&
                        <MapViewDirections
                            origin={region}
                            destination={destinationAddress}
                            apikey={GOOGLE_DIRECTIONS_API_KEY}
                            strokeWidth={5}
                            strokeColor="blue"
                            onReady={this._onDirectionsReady}
                            onError={this._onError}
                        />
                    }
                </MapView>}
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
    mapContainer: {
        flex: 99,
        zIndex: 0,
    },
});
