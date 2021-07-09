import React from 'react';
import {CardContent} from '@material-ui/core';
import s from './FlatCard.module.css';

const CardContentView = (props) => {
    const {
        type,
        attributes: {
            area,
            unit,
            rooms
        }
    } = props;
    return (
        <CardContent className={s.content}>
            <span> Тип: {type} </span>
            <span> Кол-во комнат: {rooms} </span>
            <span> Площадь: {`${area} ${unit}`} </span>
        </CardContent>
    );
}

export default CardContentView;
