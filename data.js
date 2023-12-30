class Data{
    constructor(){
        if (!localStorage.getItem("DATA")){
            let obj = {
                Soup4ik: {
                    blesk: 0,
                    pulls: 0,
                    pulled4: 0,
                    pulled5: 0,
                    points: 0,
                    pointsR: 0,
                    history: [],
                },
                Salatik: {
                    blesk: 0,
                    pulls: 0,
                    pulled4: 0,
                    pulled5: 0,
                    points: 0,
                    pointsR: 0,
                    history: [],
                },
                Sashlik: {
                    blesk: 0,
                    pulls: 0,
                    pulled4: 0,
                    pulled5: 0,
                    points: 0,
                    pointsR: 0,
                    history: [],
                }
            }
            let json = JSON.stringify(obj);
            localStorage.setItem("DATA", json);
        }
    }

    get(pole){
        let pers = localStorage.getItem("CURR");
        let json = localStorage.getItem("DATA");
        return JSON.parse(json)[pers][pole];
    }

    set(pole, value){
        let pers = localStorage.getItem("CURR");
        let json = localStorage.getItem("DATA");
        let obj = JSON.parse(json);
        obj[pers][pole] = value;
        localStorage.setItem("DATA", JSON.stringify(obj));
    }
}

const data = new Data();