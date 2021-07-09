import React from 'react';
import s from './FlatsView.module.css';
import {inject} from "mobx-react";
import FlatCard from './FlatCard';

@inject(({FlatsStore}) => {
    return {
        objects: FlatsStore.objects,
        setFavorite: FlatsStore.setFavorite
    };
})
class FlatsView extends React.Component {
    render() {
        const {
            objects,
            setFavorite
        } = this.props;

        const cards = objects.map((card) => <FlatCard setFavorite={setFavorite} {...card}/>)
        return (
            <div className={s.wrapper}>
                {cards}
            </div>
        );
    }
}

export default FlatsView;
