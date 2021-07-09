import React from 'react';
import {Avatar, CardHeader, Tooltip} from '@material-ui/core';
import s from './FlatCard.module.css';

const CardHeaderView = (props) => {
    const {
        attributes: {
            title,
            address
        },
        relationships
    } = props;

    const realtor = relationships.type === 'agent' ?
        `${relationships.attributes.last_name} ${relationships.attributes.first_name}` :
        null;
    const realtorShort = realtor && realtor.split(/\s+/).map(word => word[0]).join('') || null
    return (
        <CardHeader
            avatar={
                <Tooltip title={realtor} arrow><Avatar>
                    {realtorShort || 'Агент не указан'}
                </Avatar>
                </Tooltip>
            }
            className={s.title}
            title={title}
            subheader={`${address.city}, ${address.street} ${address.house}, ${address.room}`}
        />
    );
}

export default CardHeaderView;
