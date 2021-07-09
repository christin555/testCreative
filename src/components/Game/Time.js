import React from 'react';
import s from './Game.module.css';
import {inject} from "mobx-react";

@inject(({GameStore}) => {
    return {
        time: GameStore.time
    };
})
class TimeView extends React.Component {
    render() {
        const {time} = this.props;

        return (
            <div className={s.time}>{time}</div>
        );
    }
}

export default TimeView;
