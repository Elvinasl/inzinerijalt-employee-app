import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Title, Body, Right, Text, Button } from 'native-base';
import { StyleSheet, View, Alert } from "react-native";

export default class ListExample extends Component {

    handleDriveElseClick() {
        // TODO: Drive else action
        console.log('drive else click');
    }

    verifyDriveToAddress(address, callback) {
        Alert.alert(
            'Ar tikai norite vykti adresu:', `${address}?`, [
                {text: 'Atšaukti', onPress: () => {}, style: 'cancel'},
                {text: 'Taip', onPress: () => callback(address)},
            ],
        );
    }

    handleDriveToAddress = (address) => {
        const { navigation } = this.props;
        navigation.push('Map', { address })
    };

    render() {
        const { navigation } = this.props;
        // TODO: store these variables in local storage
        const username = navigation.getParam('name', '');
        const sales = navigation.getParam('sales', []);
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>{username} darbai</Title>
                    </Body>
                    <Right>
                        <Button
                            style={styles.driveElseBtn}
                            onPress={() => navigation.push('Login')}
                            danger
                        >
                            <Text>Atsijungti</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.driveElseBtn}>
                    <Button
                        onPress={() => this.handleDriveElseClick()}
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
                                        <Button success large onPress={() => this.verifyDriveToAddress(sale.name, this.handleDriveToAddress)}>
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
