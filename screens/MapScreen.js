import React, { Component } from 'react';
import { Container, Header, Content, Title, Body, Right, Text, Button } from 'native-base';
import { StyleSheet } from "react-native";

export default class ListExample extends Component {

    finishTask() {
        console.log('finished');
        const { navigation } = this.props;
        navigation.push('List')
    }

    render() {
        const { navigation } = this.props;
        const address = navigation.getParam('address', '');
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Darbas {address}</Title>
                    </Body>
                    <Right>
                        <Button
                            onPress={() => this.finishTask()}
                            danger
                        >
                            <Text>Baigti darbą</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});
