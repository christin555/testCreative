import React from 'react';
import s from './FlatCard.module.css';
import {CardActions, IconButton, Card, CardMedia} from '@material-ui/core';
import CardHeader from './CardHeader';
import FavoriteIcon from '@material-ui/icons/Favorite';
import noImage from './noImage.png';
import CardContent from './CardContent';
import classNames from "classnames";

const FlatCard = (props) => {
    const {
        id,
        type,
        inFavorite,
        attributes,
        relationships,
        setFavorite
    } = props;

    const handlerSetFavorite = () => setFavorite(id, !inFavorite);

    return (
        <div className={s.card}>
            <Card>
                <CardHeader
                    attributes={attributes}
                    relationships={relationships}/>
                <CardMedia
                    className={s.image}
                    component={'img'}
                    image={noImage}
                    src={noImage}
                    title="noImage"
                />
                <CardContent type={type} attributes={attributes}/>
                <CardActions>
                    <IconButton onClick={handlerSetFavorite} size={'middle'}>
                        <FavoriteIcon className={classNames(s.icon, {[s.inFavorite]: inFavorite})}/>
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}

export default FlatCard;
