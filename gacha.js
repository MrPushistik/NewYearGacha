const key = "F68L13A5";
const plr = document.querySelector(".plr");
const blesk = document.querySelector(".blesk-holder .value-number");
const pulls = document.querySelector(".pull-holder .value-number");
const pullsplus =  document.querySelector(".pull-holder .value-add");
const bleskplus =  document.querySelector(".blesk-holder .value-add");
const closeWin = document.querySelector(".window .reset");
const form = document.querySelector(".window");
const pull1 = document.querySelector(".pull-1");
const pull10 = document.querySelector(".pull-10");
const bannerT = document.querySelector(".banner-title .banner-text");
const myhistory = document.querySelector(".history");
const closeHistory = document.querySelector(".close-history");

const pers = {
    "Soup4ik": "Супчик",
    "Salatik": "Салатик",
    "Sashlik": "Сашлык",
}

plr.innerHTML = pers[localStorage.getItem("CURR")];
bannerT.innerHTML = "Новогодний " + pers[localStorage.getItem("CURR")] + "!";

const updateValues = () => {
    blesk.innerHTML = data.get("blesk");
    pulls.innerHTML = data.get("pulls");
}

updateValues();

pullsplus.onclick = () => {
    let blesktmp = data.get("blesk");
    let pullstmp = data.get("pulls");

    let add = Math.trunc(blesktmp / 5);

    pullstmp += add;
    blesktmp -= 5 * add;

    data.set("pulls", pullstmp);
    data.set("blesk", blesktmp);

    updateValues();
}

bleskplus.onclick = () => {
    let ask = document.querySelector(".ask");
    ask.classList.remove("disabled");
}

closeWin.onclick = () => {
    let ask = document.querySelector(".ask");
    ask.classList.add("disabled");
}

form.onsubmit = (e) => {
    e.preventDefault();
    const promo = document.querySelector(".promo");
    let a = promo.value;

    if (a.indexOf(key) != -1){       
        let blesktmp = data.get("blesk");
        blesktmp += Number(a.replace(key, ""));
        data.set("blesk", blesktmp);
        updateValues();
    }

    promo.value = "";
}

const ask = document.querySelector(".pulling");
const res = document.querySelector(".pull-res");
const after =  document.querySelector(".after-pulling");
const gift = document.querySelector(".get-gift");
const val = document.querySelector(".valueable");
const valName = document.querySelector(".valueable-name");
const stars = document.querySelector(".stars")
const exit = document.querySelector(".close");
const next = document.querySelector(".next");
let appearClass;


ask.addEventListener("animationend", (e) => {
    if (e.target.classList.contains("pulling")){
        ask.classList.remove("apper"); 
        res.classList.add(appearClass); 
    }
})

res.addEventListener("animationend", (e) => {
    res.classList.remove(appearClass);
    ask.classList.add("disabled");
    
    after.classList.remove("disabled");
    gift.classList.add("apper-after-pulling");
    val.classList.add("apper-after-pulling");
})

const todo = (quality) => {
    let giftName;

    switch(quality){
        case "3*":{
            giftName = "C Новым годом!";
            gift.style.backgroundImage = "url(img/common.png)";
            valName.innerHTML = giftName;
            for (let i = 0; i < 3; i++){
                stars.innerHTML += `<img class="star" src="img/star.png" alt="start">`
            }
            break;
        }
        case "4*":{
           
            let points = data.get("pointsR"); 
            points = (points + 1) % 4;
            data.set("pointsR", points);

            gift.style.backgroundImage = `url(img/rare${points}.png)`;

            switch(points){
                case 0: giftName = "Chupa Chups!"; valName.innerHTML = giftName; break;
                case 1: giftName = "Chupa Chups!"; valName.innerHTML = giftName; break;
                case 2: giftName = "Twix!"; valName.innerHTML = giftName; break;
                case 3: giftName = "MilkyWay!"; valName.innerHTML = giftName; break;
            }
            
            for (let i = 0; i < 4; i++){
                stars.innerHTML += `<img class="star" src="img/star.png" alt="start">`
            }
            break;
        }
        case "5*": {
            let points = data.get("points"); 
            points += 1;
            data.set("points", points);

            switch(points){
                case 1: {
                    gift.style.backgroundImage = `url(img/lega1.png)`;
                    giftName = "Значок!";
                    valName.innerHTML = giftName; break;
                }
                case 2: {
                    gift.style.backgroundImage = `url(img/lega2.png)`;
                    giftName = "Подарок!";
                    valName.innerHTML = giftName; break;
                }
                default: {
                    gift.style.backgroundImage = `url(img/legaX.png)`;
                    giftName = "Стрикер!";
                    valName.innerHTML = giftName;
                }
            }
            
            for (let i = 0; i < 5; i++){
                stars.innerHTML += `<img class="star" src="img/star.png" alt="start">`
            }

            break;
        }
    }
}

pull1.onclick = () => {

    let number = data.get("pulls");
    if (number <= 0){
        return;
    }
    number -= 1;
    data.set("pulls", number);
    updateValues();


    let quality = calculateRes(true);

    switch(quality){
        case "3*": appearClass = "pull-apper-common"; break;
        case "4*": appearClass = "pull-apper-rare"; break;
        case "5*": appearClass = "pull-apper-lega"; break;
    }

    todo(quality);
    
    exit.classList.remove("disabled");
    ask.classList.remove("disabled");
    ask.classList.add("apper");
}

exit.onclick = () => {
    exit.classList.add("disabled");
    after.classList.add("disabled");
    gift.classList.remove("apper-after-pulling");
    val.classList.remove("apper-after-pulling");
    stars.innerHTML = "";
    valName.innerHTML = "";
}

let curr_pull = 0;
let qualArr;
pull10.onclick = () => {

    let number = data.get("pulls");
    if (number <= 9){
        return;
    }
    number -= 10;
    data.set("pulls", number);
    updateValues();

    qualArr = calculateRes(false);

    appearClass = "pull-apper-common";

    if (qualArr.indexOf("5*") != -1){
        appearClass = "pull-apper-lega";    
    }
    else if (qualArr.indexOf("4*") != -1) {
        appearClass = "pull-apper-rare";
    }

    todo(qualArr[curr_pull]);
    curr_pull++;

    next.classList.remove("disabled");
    ask.classList.remove("disabled");
    ask.classList.add("apper");
}

next.onclick = () => {
    gift.classList.remove("apper-after-pulling");
    val.classList.remove("apper-after-pulling");

    gift.classList.add("disabled");
    val.classList.add("disabled");

    stars.innerHTML = "";
    valName.innerHTML = "";

    setTimeout(() => {
        todo(qualArr[curr_pull]);
        
        gift.classList.remove("disabled");
        gift.classList.add("apper-after-pulling");

        val.classList.remove("disabled");
        val.classList.add("apper-after-pulling");

        curr_pull++;
        if (curr_pull == 10){
            next.classList.add("disabled");
            exit.classList.remove("disabled");
            curr_pull = 0;
        }
    }, 100);
    
}


const calculatepull1 = () => {
    let pulled4 = data.get("pulled4");
    let pulled5 = data.get("pulled5");

    pulled4 += 1;
    pulled5 += 1;

    bool4 = false;
    bool5 = false;

    let chance5 = Math.random();
    let chance4 = Math.random();

    if (pulled5 <= 74){
        bool5 = chance5 < 0.006;
    }
    else {
        bool5 = chance5 < (0.006 + 0.062125 * (pulled5 - 74))
    }

    if (pulled4 <= 8){
        bool4 = chance4 < 0.051;
    }
    else{
        bool4 = chance4 < (0.051 + 0.4745 * (pulled4 - 8));
    }

    let res;

    if (bool5) {
        pulled5 = 0;
        res = "5*"
    }
    else if (bool4){
        pulled4 = 0;
        res = "4*"
    }
    else{
        res = "3*"
    }
 
    let tmpHistory = {
        pull4: pulled4,
        pull5: pulled5,
        qual: res,
        date: new Date().toLocaleTimeString()
    }

    let obj = data.get("history");
    obj.push(tmpHistory);
    data.set("history", obj);
    
    data.set("pulled4", pulled4);
    data.set("pulled5", pulled5);
    return res;
}

const calculateRes = (isOne) => {
    if (isOne){
        return calculatepull1();
    }
    else{
        let res = [];
        for (let i = 0; i < 10; i++){
            res.push(calculatepull1());
        }
        return res;
    }

}

closeHistory.onclick = () =>{
    let h = document.querySelector(".history-list");
    h.classList.add("disabled");
}

const pullHistory = document.querySelector(".pull-history");
myhistory.onclick = () => {
    let h = document.querySelector(".history-list");
    h.classList.remove("disabled");

    let arr = data.get("history");

    pullHistory.innerHTML = 
    `
        <div class="about-pull">
            <p class="h-cell after-4">от 4*</p>
            <p class="h-cell after-5">от 5*</p>
            <p class="h-cell pulled-gift">Тир</p>
            <p class="h-cell pulled-date">Время</p>
        </div>
    `
 
    for (let i = arr.length - 1; i >= 0; i--){
        let color = "rgb(84, 183, 255)";
        switch(arr[i].qual){
            case "4*": color="rgb(200,116,255)"; break;
            case "5*": color="rgb(255,190,0)"; break;
        }

        pullHistory.innerHTML += 
        `
        <div class="about-pull">
            <p class="cell after-4">${arr[i].pull4}</p>
            <p class="cell after-5">${arr[i].pull5}</p>
            <p class="cell pulled-gift" style="color:${color};">${arr[i].qual}</p>
            <p class="cell pulled-date">${arr[i].date}</p>
        </div>
        `
    }

}

plr.onclick = () => {
    window.open("index.html", "_self");
}