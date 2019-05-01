import React from 'react';
import {StyleSheet, Text, TextInput, ScrollView, Button} from 'react-native';


export default class App extends React.Component {

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
