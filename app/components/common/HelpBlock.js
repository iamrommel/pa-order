import React from "react";
import {Text, variables} from 'native-base';

export const HelpBlock = (props) => {
    const {help, error} = props;

    return (
        <Text note style={{color :  error ?  variables.brandDanger : variables.brandInfo, marginLeft : 5}}>{error || help}</Text>
    )
};