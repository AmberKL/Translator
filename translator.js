const from = document.querySelector(".from");
const to = document.querySelector(".to");
const swap = document.querySelector(".swap");
const select = document.querySelectorAll("select");
const translateBtn = document.querySelector("#translateBtn");
const volumeFrom = document.querySelector("#volume-from");
const copyFrom = document.querySelector("#copy-from");
const volumeTo = document.querySelector("#volume-to");
const copyTo = document.querySelector("#copy-to");
const fromText = document.getElementById("fromText");
const toText = document.getElementById("toText");

select.forEach((key, id) => {
    for (var countryCode in countries) {
        var selected = id == 0 ? countryCode == "en-GB" ? "selected" : "" : countryCode == "es-ES" ? "selected" : "";
        let option = `<option ${selected} value="${countryCode}">${countries[countryCode]}</option>`;
        key.insertAdjacentHTML("beforeend", option);
    }
});

swap.addEventListener("click", () => {
    let tempText = fromText.value;
    let tempLang = select[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    select[0].value = select[1].value;
    select[1].value = tempLang;
});




translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
    translateFrom = select[0].value,
    translateTo = select[1].value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
            }
        });
        toText.setAttribute("placeholder", "Translation");
    });
});