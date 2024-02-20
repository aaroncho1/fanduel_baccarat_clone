let nav = document.getElementById("navbar");
let sticky = nav.offsetTop;
window.onscroll = () => {
    sticker()
};
let sticker = () => {
    if (window.pageYOffset >= sticky) {
        nav.classList.add("sticky")
    } else {
        nav.classList.remove("sticky")
    }
}
