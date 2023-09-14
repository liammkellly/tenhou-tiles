// ==UserScript==
// @name         TenTiles
// @version      0.1
// @description  Makes Tenhou.net UI easier on Western players
// @author       Liam Kelly
// @match        *://tenhou.net/3/
// @noframes
// ==/UserScript==

const resourcesURL = "tentiles.work.gd/serveimg.php?img=";

function injectPatch(tilesSwitch) {

    fetch("https://tenhou.net/3/latest.js").then(
        t => t.text()).then(
            t => varToReplace = t[t.search("vieww") + 18]).then(
                () => fetch("https://tenhou.net/3/")).then(
                    t => t.text()
                ).then(t => document.write(
                    t.replace("e.src=src;",
                        'fetch(src).then((responseSrc) => responseSrc.text()).then((dataSrc) => e.text=dataSrc' +
                        (tilesSwitch == 1 ? '.replace("cdn.tenhou.net/5/img/","\\" +  (' + varToReplace + ' == 0 ? \\"' + resourcesURL + '\\" : \\"cdn.tenhou.net/5/img/\\") + \\"")' : '') +
                        '.replace("四","4")' + ');')
                )
                ).then();
}

let TenTilesConnectivityTest = document.createElement("img");
TenTilesConnectivityTest.src = "https://" + resourcesURL + "vieww000039.png";
TenTilesConnectivityTest.addEventListener("load", function () {
    injectPatch(1);
    clearTimeout(loadingTimeout);
})

let NotificationBox = document.createElement("div");
NotificationBox.innerHTML = "Now patching... Don't refresh!";
document.body.appendChild(NotificationBox);
NotificationBox.style.fontSize = "3em";
NotificationBox.style.position = "absolute";
NotificationBox.style.left = "30%";
NotificationBox.style.width = "40%";
NotificationBox.style.top = "40%";
NotificationBox.style.textAlign = "center";
NotificationBox.style.zIndex = "1000";
NotificationBox.style.backgroundColor = "grey";

const loadingTimeout = setTimeout(() => {
    TenTilesConnectivityTest.remove();
    NotificationBox.innerHTML = "Unable to load ressources, patching translation only."
    setTimeout(() => {
        NotificationBox.remove();
        injectPatch();
    }, 2000);
}, 10000);

