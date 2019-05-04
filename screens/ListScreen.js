import React, { Component } from 'react';
import {Container, Header, Content, List, ListItem, Title, Body, Left, Right, Text, Button, Toast} from 'native-base';
import { StyleSheet, View, Alert } from "react-native";
import { AsyncStorage } from 'react-native';
import { Constants } from "expo";
import AddressListItem from "../components/AddressListItem";

export default class ListExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            salesWithAddresses: [],
            salesNoAddress: [],
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
                <Content>
                    <Button
                        onPress={() => this._handleDriveElseClick()}
                        block
                        info
                    >
                        <Text>Vykti kitur</Text>
                    </Button>
                    <List>
                        { salesWithAddresses && (
                            <AddressListItem
                                title={'Pardavimai su tiksliu adresu'}
                                sales={salesWithAddresses}
                                addressValue={'address'}
                                callback={this._handleDriveToAddress}
                            />
                        )}

                        { salesNoAddress && (
                            <AddressListItem
                                title={'Pardavimai be tikslaus adreso'}
                                sales={salesNoAddress}
                                addressValue={'name'}
                                callback={this._handleDriveToAddress}
                            />
                        )}
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
});
