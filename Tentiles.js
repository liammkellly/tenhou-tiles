// ==UserScript==
// @name         TenTiles
// @version      0.2
// @description  Makes Tenhou.net UI easier on Western players
// @author       Liam Kelly
// @updateURL    https://raw.githubusercontent.com/liammkellly/tenhou-tiles/main/Tentiles.js
// @match        *://tenhou.net/3*
// @noframes
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==



(async () => {

    function addOptionsButton() {
        let settingsScripts = document.createElement("script");
        settingsScripts.innerText = 'function saveSettings(){' +
            'let transLanguage = document.getElementById("transLanguage").value;' +
            'let replaceTilesStatus = document.getElementById("replaceTilesBox").checked;' +
            'let updateTransStatus = document.getElementById("updateTrans").checked;' +
            'let newURL = "https://tenhou.net/3/#updateTiles=" + (replaceTilesStatus == true ? "1" : "0")' +
            '+ "updateTrans=" + (updateTransStatus == true ? "1" : "0")' +
            '+ "transLanguage=" + transLanguage;' +
            //'alert(newURL);' +
            'location.replace(newURL);' +
            'location.reload(true);' +
            '};';
        document.head.appendChild(settingsScripts);

        let optionsWindow = document.createElement("div");
        optionsWindow.id = "optionsWindow";
        optionsWindow.style.zIndex = 1000;
        optionsWindow.style.display = "none";
        optionsWindow.style.position = "absolute";
        optionsWindow.style.fontSize = "1em";
        optionsWindow.style.position = "absolute";
        optionsWindow.style.left = "30%";
        optionsWindow.style.width = "40%";
        optionsWindow.style.top = "40%";
        optionsWindow.style.textAlign = "center";
        optionsWindow.style.backgroundColor = "grey";
        optionsWindow.innerHTML = `TenTiles userscript options.<br />
        Saving changes will refresh the page.<br /><br />
        <table>
        <tr><td>Replace tiles</td><td><input type="checkbox" id="replaceTilesBox" ` + (tenSettings.replaceTiles == true ? "checked" : "") + `></td></tr>
        <tr><td>Translate UI</td><td><input type="checkbox" id="updateTrans"  ` + (tenSettings.translateUI == true ? "checked" : "") + `></td></tr>
        <tr><td>Target language:</td><td><select id="transLanguage">
        <option value="DEFAULT" ` + (tenSettings.translationLN == "DEFAULT" ? "selected" : "") + `>Default</option>
        <option value="ENG" ` + (tenSettings.translationLN == "ENG" ? "selected" : "") + `>English</option>
        <option value="FRA_TRAD" ` + (tenSettings.translationLN == "FRA_TRAD" ? "selected" : "") + `>French - complete</option>
        <option value="FRA_DEFT" ` + (tenSettings.translationLN == "FRA_DEFT" ? "selected" : "") + `>French - default</option>
        <option value="VIE" ` + (tenSettings.translationLN == "VIE" ? "selected" : "") + `>Vietnamese</option>
        <option value="ES" ` + (tenSettings.translationLN == "ES" ? "selected" : "") + `>Spanish</option>
        <option value="POL" ` + (tenSettings.translationLN == "POL" ? "selected" : "") + `>Polish</option>
        <option value="RUS_DEFT" ` + (tenSettings.translationLN == "RUS_DEFT" ? "selected" : "") + `>Russian</option></select></td></tr>
        </table>
        <button onclick="saveSettings()" ontouchstart="saveSettings()" value="Save settings">Save settings</button>`;
        document.body.appendChild(optionsWindow);

        let optionsButtonDiv = document.createElement("div");
        optionsButtonDiv.style.position = "fixed";
        optionsButtonDiv.style.zIndex = 1000;
        let optionsButton = document.createElement("button");
        optionsButton.innerText = "TenTiles options";
        optionsButton.style.fontSize = "0.5em"
        optionsButton.ontouchstart = function () {

            let optionsWindow = document.getElementById("optionsWindow");
            if (optionsWindow.style.display == "block") {
                optionsWindow.style.display = "none";
            } else {
                optionsWindow.style.display = "block";
            };

        };
        optionsButton.onclick = function () {

            let optionsWindow = document.getElementById("optionsWindow");
            if (optionsWindow.style.display == "block") {
                optionsWindow.style.display = "none";
            } else {
                optionsWindow.style.display = "block";
            };

        };
        optionsButton.id = "optionsButton";
        optionsButtonDiv.appendChild(optionsButton);
        document.body.appendChild(optionsButtonDiv);
    }

    function injectPatch() {
        fetch("https://tenhou.net/3/latest.js").then(
            t => t.text()).then(
                t => varToReplace = t[t.search("vieww") + 18]).then(
                    () => fetch("https://tenhou.net/3/")).then(
                        t => t.text()
                    ).then(t => {
                        if (tenSettings.replaceTiles) {
                            document.write(
                                t.replace("e.src=src;",
                                    'fetch(src).then((responseSrc) => responseSrc.text()).then((dataSrc) => e.text=dataSrc.replace("cdn.tenhou.net/5/img/","\\" +  (' + varToReplace + ' == 0 ? \\"' + ressourcesURL + '\\" : \\"cdn.tenhou.net/5/img/\\") + \\""));')
                            );
                        }
                        if (tenSettings.translateUI) {
                            startUpdatingUI();
                        }
                        addOptionsButton();
                    }).then();


    }




    let tenSettings = await GM.getValue('tenSettings');
    if (tenSettings) {
        tenSettings = JSON.parse(tenSettings);
    }

    if (!tenSettings) {
        alert("The TenTiles userscript is being run for the first time. It will set default values, you can change them later using the TenTiles button on the splashpage.");
        tenSettings = {
            "ressourcesURL": "tentiles.7854.ovh/serveimg.php?img=",
            "replaceTiles": true,
            "translationsURL": "https://tentiles.7854.ovh/translations.json",
            "translationLN": "ENG",
            "translateUI": true
        };
        await GM.setValue('tenSettings', JSON.stringify(tenSettings));
    }

    const URL = window.location.href;
    let regex = /updateTiles=([0-1])/g;
    let matches = URL.matchAll(regex);
    matches = Array.from(matches)

    if (matches[0]) {
        if (matches[0][1] == 1) {
            tenSettings.replaceTiles = true;
        } else if (matches[0][1] == 0) {
            tenSettings.replaceTiles = false;
        }
    }

    regex = /updateTrans=([0-1])/g;
    matches = URL.matchAll(regex);
    matches = Array.from(matches)

    if (matches[0]) {
        if (matches[0][1] == 1) {
            tenSettings.translateUI = true;
        } else if (matches[0][1] == 0) {
            tenSettings.translateUI = false;
        }
    }

    regex = /transLanguage=([A-Z_]*)/g;
    matches = URL.matchAll(regex);
    matches = Array.from(matches)

    if (matches[0]) {
        tenSettings.translationLN = matches[0][1];
    }

    // alert("updateTiles: " + tenSettings.replaceTiles + "\ntranslateUI: " + tenSettings.translateUI + "\nlanguage: " + tenSettings.translationLN);

    await GM.setValue('tenSettings', JSON.stringify(tenSettings));

    let resourcesURL = tenSettings.ressourcesURL;

    let checkConnectivity;
    let Httpreq = new XMLHttpRequest();
    Httpreq.onreadystatechange = function () {
        if (Httpreq.readyState === 4) {
            if (Httpreq.status === 200) {
                checkConnectivity = true;
            } else {
                checkConnectivity = false;
                addOptionsButton();
            }
        }
    }
    Httpreq.open("GET", tenSettings.translationsURL, false);
    Httpreq.send(null);

    if (checkConnectivity) {
        let allTranslations = JSON.parse(Httpreq.responseText);
        let exactTranslation = allTranslations['exactTranslation'];
        let partialTranslation = allTranslations['partialTranslation'];

        function nodeCeption(node) {
            if (node.nodeType == 3) {
                for (oneTranslation in exactTranslation) {
                    if (exactTranslation[oneTranslation][tenSettings.translationLN] ) {
                        node.nodeValue = node.nodeValue.replace(oneTranslation, exactTranslation[oneTranslation][tenSettings.translationLN]);
                    } else {
                        node.nodeValue = node.nodeValue.replace(oneTranslation, exactTranslation[oneTranslation]['DEFAULT']);
                    }
                }

                for (oneTranslation in partialTranslation) {
                    if (partialTranslation[oneTranslation][tenSettings.translationLN] ) {
                        node.nodeValue = node.nodeValue.replace(oneTranslation, partialTranslation[oneTranslation][tenSettings.translationLN]);
                    } else {
                        node.nodeValue = node.nodeValue.replace(oneTranslation, partialTranslation[oneTranslation]['DEFAULT']);
                    }
                }
            } else {
                node.childNodes.forEach(nodeCeption);
            }
        }
        function startUpdatingUI() {
            const callback = (mutationList, observer) => {
                observer.disconnect();

                for (individualMutation in mutationList) {
                    nodeCeption(mutationList[individualMutation].target);
                }
                observer.observe(document.body, { childList: true, subtree: true });
            };
            const observer = new MutationObserver(callback);
            observer.observe(document.body, { childList: true, subtree: true });
        }



        injectPatch();
    }
})();
