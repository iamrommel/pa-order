import React from 'react';
import {connect} from 'react-redux';
import {Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body} from 'native-base';
import { CommonScreen, BusyButton } from 'pcmli.umbrella.react-native'


export const Overview = () => {
        return (
            <CommonScreen mainToolbar="menu" title="Overview">
                <Content padder>
                    <Text>
                        Should display something useful about the overview page
                    </Text>

                </Content>
            </CommonScreen>
        );
}
