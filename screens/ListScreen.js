import React, { Component } from 'react';
import {Container, Header, Content, List, ListItem, Title, Body, Right, Text, Button, Toast} from 'native-base';
import { StyleSheet, View, Alert } from "react-native";
import { AsyncStorage } from 'react-native';

export default class ListExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            sales: [],
        };
    }

    componentWillMount() {
        this._getDateFromStorage();
    }

    _getDateFromStorage() {
        AsyncStorage.getItem('data')
            .then((responseJson) => {
                if (responseJson !== null) {
                    // taking date from the local storage and assigning it to the state
                    const { username, sales } = JSON.parse(responseJson);
                    this.setState({
                        username,
                        sales,
                    });
                }
            }).catch(() => {
            Toast.show({
                text: "Nepavyko gauti išsaugotų duomenų.",
                buttonText: "Supratau",
                position: "bottom",
                type: "danger",
                duration: 3000
            })
        });
    }

    _handleDriveElseClick() {
        // TODO: Drive else action
        console.log('drive else click');
    }

    _verifyDriveToAddress(address, callback) {
        Alert.alert(
            'Ar tikai norite vykti adresu:', `${address}?`, [
                {text: 'Atšaukti', onPress: () => {}, style: 'cancel'},
                {text: 'Taip', onPress: () => callback(address)},
            ],
        );
    }

    _handleDriveToAddress = (address) => {
        const { navigation } = this.props;
        navigation.push('Map', { address })
    };

    _logout() {
        const { navigation } = this.props;
        // clear storage data and redirect to login screen
        AsyncStorage.removeItem('data').then(() => {
            navigation.push('Login')
        });
    }

    render() {
        const { username, sales } = this.state;
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>{username} darbai</Title>
                    </Body>
                    <Right>
                        <Button
                            style={styles.driveElseBtn}
                            onPress={() => this._logout()}
                            danger
                        >
                            <Text>Atsijungti</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.driveElseBtn}>
                    <Button
                        onPress={() => this._handleDriveElseClick()}
                        block
                        info
                        large
                    >
                        <Text>Vykti kitur</Text>
                    </Button>
                </View>
                <Content>
                    <List>
                        {sales.length ? (
                            sales.map(sale => (
                                <ListItem key={sale.id}>
                                    <Text>{sale.name}</Text>
                                    <Right style={styles.container}>
                                        <Button success large onPress={() => this._verifyDriveToAddress(sale.name, this._handleDriveToAddress)}>
                                            <Text>Vykti</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
                            ))) : null
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    driveElseBtn: {
        marginTop: 20,
        marginBottom: 20
    }
});
