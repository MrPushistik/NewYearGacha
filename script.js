const selectPers = (pers) => {
    localStorage.setItem("CURR", pers);
    window.open("gacha.html", "_self");
}

const exit = document.querySelector(".close");
exit.onclick = () => {
    localStorage.clear();
}