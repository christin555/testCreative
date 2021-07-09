import {observable, action, computed, toJS, reaction, makeObservable} from 'mobx';
import cardsInit from './Cards';

class GameStore {

    @observable isShown = [];
    @observable countCard = {};
    @observable deletedCards = new Set();
    @observable cards = []
    @observable gameIsStarted = false;
    @observable seconds = 0;
    @observable results = []

    constructor() {
        makeObservable(this);
        this.countCard = cardsInit.reduce((res, {icon}) => {
            res[icon] = []
            return res
        }, {})

        this.generateCards();
        reaction(
            () => this.deletedCards.size === this.cards.length,
            this.stopGame
        )
    }

    @computed get time() {
        if (this.seconds < 60) {
            return `${this.seconds}s`
        }
        const minute = Math.floor((this.seconds / 60) % 60);
        const second = this.seconds % 60;

        if (this.seconds >= 60) {
            return `${minute}m ${second}s `
        }
        const hour = Math.floor(this.seconds / 3600);
        return `${hour}h  ${minute}m ${second}s `
    }

    @action startGame = () => {
        this.gameIsStarted = true;
        this.seconds = 0;
        this.startTimer = setInterval(() => this.setTime(), 1000);
    }

    @action stopGame = () => {
        clearInterval(this.startTimer);

        if (this.seconds) {
            this.results.push(this.time);
        }

        this.gameIsStarted = false;
        this.deletedCards.clear();
        this.seconds = 0;
        this.generateCards();
    }

    @action setTime = () => {
        this.seconds += 1;
    }

    @action generateCards = () => {
        this.cards = cardsInit
            .map((item) => ({sort: Math.random(), ...item}))
            .sort((a, b) => a.sort - b.sort)
    }

    @action showCard = (item, icon) => {
        if (this.isShown.length === 2) {
            return
        }
        this.isShown = [item, ...this.isShown]
        this.countCard[icon].push(item);
        setTimeout(this.closeCard, 1000, item, icon);
    }

    @action closeCard = (deletedValue, icon) => {
        this.checkCards();
        this.isShown = toJS(this.isShown.filter((value) => value !== deletedValue))
        this.countCard[icon] = Object.values(this.countCard[icon]).filter((value) => value !== deletedValue);
    }

    @action deleteCard = (values) => {
        values.forEach((item) => this.deletedCards.add(item))
    }

    @action checkCards = () => {
        const coincided = []
        Object.values(this.countCard).forEach((items) => {
            if (items.length > 1) {
                coincided.push(...items)
            }
        });

        if (!coincided.length) {
            return
        }
        this.deleteCard(coincided)
    }
}

export default GameStore;