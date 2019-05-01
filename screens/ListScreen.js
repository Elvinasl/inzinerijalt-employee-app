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
        const { navigation } = this.props;
        const username = navigation.getParam('name', 'No name');
        const sales = navigation.getParam('sales', []);
        return (
            <ScrollView>
                {sales.length && (
                    sales.map(sale => (
                        <Text key={sale.id}>{sale.name}</Text>
                    )))
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});
