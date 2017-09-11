import React from "react";
import {Text, Icon, variables} from 'native-base';
import {View} from 'react-native'

export const EmptyView = (props) => {
    let {value, style} = props;
    value = value || 'No data available';
    style = Object.assign({}, style, {color: variables.brandWarning, fontStyle: 'italic'});
    return <Text style={style} note>{value}</Text>;
};

export const CommonViewer = (props) => {
    let {emptyValue, value, icon, style} = props;


    let viewStyle = {marginTop: 5, marginBottom: 5, marginRight: 5, marginLeft: 10};
    viewStyle = Object.assign({}, viewStyle, style.text);
    let containerStyle = Object.assign({}, style.container, {flexDirection: 'row'});


    let renderValue = <EmptyView style={viewStyle} value={emptyValue}/>;
    if (value) {
        renderValue = <Text style={viewStyle}>{value}</Text>
    }

    if (icon) {
        renderValue = (
            <View style={containerStyle}>
                <Icon name={icon} style={{  justifyContent: 'center' }}/>
                {renderValue}
            </View>
        );
    }

    return renderValue;
};


CommonViewer.defaultProps = {
    style: {
        container: {},
        text: {}
    }
};
