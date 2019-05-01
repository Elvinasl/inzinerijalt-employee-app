import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Title, Body, Right, Text, Button } from 'native-base';
import { StyleSheet, View } from "react-native";

export default class ListExample extends Component {

    handleDriveElseClick() {
        // TODO: Drive else action
        console.log('drive else click');
    }

    handleDriveToAddress(address) {
        // TODO: implement drive to address
        console.log(address);
    }

    render() {
        const { navigation } = this.props;
        const username = navigation.getParam('name', 'No name');
        const sales = navigation.getParam('sales', []);
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>{username} darbai</Title>
                    </Body>
                    <Right>
                        <Button style={styles.driveElseBtn} onPress={() => navigation.push('Login')}>
                            <Text>Atsijungti</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.driveElseBtn}>
                    <Button block info onPress={() => this.handleDriveElseClick()}>
                        <Text>Vykti kitur</Text>
                    </Button>
                </View>
                <Content>
                    <List>
                        {sales.length && (
                            sales.map(sale => (
                                <ListItem key={sale.id}>
                                    <Text>{sale.name}</Text>
                                    <Right style={styles.container}>
                                        <Button success large onPress={() => this.handleDriveToAddress(sale.name)}>
                                            <Text>Vykti</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
                            )))
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
