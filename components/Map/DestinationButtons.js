import React from 'react';
import { Text, Badge, Container } from 'native-base';
import { StyleSheet, View } from "react-native";
import PropTypes from 'prop-types';

export default class DestinationButtons extends React.Component {

    render() {
        let { duration, distance, isVisible } = this.props;
        duration = duration.toFixed(0);
        distance = distance.toFixed(0);
        return (
            <React.Fragment>
                { isVisible &&
                    <Container style={styles.mapHeader}>
                        <Badge info>
                            <Text>Laikas iki darbo: { duration } min</Text>
                        </Badge>
                        <View style={styles.secondButton}>
                            <Badge info>
                                <Text>Atstumas iki darbo: { distance } km</Text>
                            </Badge>
                        </View>
                    </Container>
                }
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    mapHeader: {
        zIndex: 1,
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 100,
        left: 10,
        flexDirection: 'row',
    },
    secondButton: {
        marginLeft: 10,
    }
});

DestinationButtons.propTypes = {
    duration: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    isVisible: PropTypes.bool,
};

DestinationButtons.defaultProps = {
    isVisible: true
};
