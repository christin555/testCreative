import {observable, autorun, makeObservable} from 'mobx';
import API from './mock/API';

class GameStore {
    @observable objects = [];

    constructor() {
        makeObservable(this);

        autorun(this.getObjects)
    }


    getObjects = async () => {
        try {
            this.objects = await API.get('getObjects');
        } catch (err) {
            this.objects = []
        }
    }

    setFavorite = async (objectId, action) => {
        try {
            await API.post('setFavorite', {
                userId: 1,
                objectId,
                action
            });
            this.objects = this.objects.map(({id, ...restParams}) => {
                if (id === objectId) {
                    return {id, ...restParams, inFavorite: action}
                }
                return {id, ...restParams}
            })

        } catch (_) {
            this.objects = []
        }
    }
}

export default GameStore;