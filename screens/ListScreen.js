import React, { Component } from 'react';
import {Container, Header, Content, List, ListItem, Title, Body, Left, Right, Text, Button, Toast} from 'native-base';
import { StyleSheet, View, Alert } from "react-native";
import { AsyncStorage } from 'react-native';
import { Constants } from "expo";

export default class ListExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            salesNoAddress: [],
            salesWithAddresses: [],
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
                    const { username, salesNoAddress, salesWithAddresses } = JSON.parse(responseJson);
                    this.setState({
                        username,
                        salesNoAddress,
                        salesWithAddresses,
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
        const { username, salesNoAddress, salesWithAddresses } = this.state;
        console.log(salesNoAddress)
        return (
            <Container style={styles.MainContainer}>
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
                <Content style={styles.driveElseBtn}>
                    <Button
                        onPress={() => this._handleDriveElseClick()}
                        block
                        info
                        large
                    >
                        <Text>Vykti kitur</Text>
                    </Button>
                </Content>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>Pardavimai su tiksliu adresu</Text>
                        </ListItem>
                        {salesWithAddresses.length ? (
                            salesWithAddresses.map(sale => (
                                <ListItem key={sale.id}>
                                    <Left>
                                        <Text>{sale.name}</Text>
                                    </Left>
                                    <Right style={styles.container}>
                                        <Button
                                            onPress={() => this._verifyDriveToAddress(sale.address, this._handleDriveToAddress)}
                                            success
                                            large
                                        >
                                            <Text>Vykti</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
                            ))) : null
                        }
                        <ListItem itemDivider>
                            <Text>Pardavimai be tikslaus adreso</Text>
                        </ListItem>
                        {salesNoAddress.length ? (
                            salesNoAddress.map(sale => (
                                <ListItem key={sale.id}>
                                    <Left>
                                        <Text>{sale.name}</Text>
                                    </Left>
                                    <Right style={styles.container}>
                                        <Button
                                            onPress={() => this._verifyDriveToAddress(sale.name, this._handleDriveToAddress)}
                                            success
                                            large
                                        >
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
    MainContainer: {
        paddingTop: Constants.statusBarHeight,
    },
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
