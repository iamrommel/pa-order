import React from "react";
import {HeaderPanel} from './HeaderPanel';
import {PickupPoints} from './PickupPoints';

export class LeftDetailSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleOnRouteDetailChanged = (selectedItem) => {
        const {onRouteDetailChanged} = this.props;

        onRouteDetailChanged && onRouteDetailChanged(selectedItem);

    };

    render() {
        const {data} = this.props;

        return (
            <div>
                <HeaderPanel data={data}/>
                <PickupPoints route={data} onRouteDetailChanged={this.handleOnRouteDetailChanged}/>
            </div>
        );
    }
}
