function route() {

}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.hasAttribute("data-nav")) {
            document.querySelector("main").innerHTML = `<h1>${event.target.getAttribute("href")}</h1>`;
        }
    });
});