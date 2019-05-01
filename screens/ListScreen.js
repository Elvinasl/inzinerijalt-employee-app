import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TextInput, ScrollView, Button} from 'react-native';


export default class ListScreen extends React.Component {

    static navigationOptions = {
        title: 'Jūsų darbai',
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ScrollView>
                <Text>Hello</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});


ListScreen.propTypes = {
    name: PropTypes.string.isRequired,
    sales: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
    }))
};
