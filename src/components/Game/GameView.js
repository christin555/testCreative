import React from 'react';
import s from './Game.module.css';
import {Button} from '@material-ui/core';
import icons from './icons';
import {inject} from "mobx-react";
import classNames from 'classnames';
import Time from "./Time";

@inject(({GameStore}) => {
    return {
        isShown: GameStore.isShown,
        showCard: GameStore.showCard,
        deletedCards: GameStore.deletedCards,
        cards: GameStore.cards,
        gameIsStarted: GameStore.gameIsStarted,
        startGame: GameStore.startGame,
        results: GameStore.results
    };
})
class GameView extends React.Component {
    render() {
        const {
            isShown,
            showCard,
            deletedCards,
            cards,
            gameIsStarted,
            startGame,
            results
        } = this.props;

        const cardsBlock = cards.map(({value, icon}) => {
                if (deletedCards.has(value)) {
                    return <div className={s.card}/>
                }

                if (isShown.includes(value)) {
                    let imgIcon = <img className={s.imgCard} src={icons[icon]} alt="value"/>;
                    return <div className={classNames(s.openedCard, s.card)}>
                        {icon ? imgIcon : value}
                    </div>
                }

                return <div
                    onClick={() => gameIsStarted && showCard(value, icon)}
                    className={classNames(s.cardClosed, s.card)}/>
            }
        )
        return (
            <div className={s.wrapper}>
                <div className={s.toolbar}>
                    <Time/>
                    {
                        !gameIsStarted && <Button
                            onClick={startGame}
                            className={s.startButton}
                            variant="contained"
                            color="secondary">
                            Старт
                        </Button> || null
                    }
                </div>
                <div className={s.container}>
                    {cardsBlock}
                </div>
                <div className={s.results}>
                    Результаты
                    {
                        results.length ?
                            results.map((result) => <span> {result} </span>) :
                            <span> - </span>
                    }
                </div>
            </div>
        );
    }
}

export default GameView;
