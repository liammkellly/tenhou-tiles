# tenhou-tiles

> This replaces the tiles on the internet mahjong client Tenhou by custom design tiles and translates the user interface.
> The primary use is to play with western friendly tiles (ie. arab numerals and latin script).
> It rewrites some code in the Tenhou client to use external resources from an alternate server instead of the standard ones.
> You can run your own instance on your server or use this one: https://tentiles.7854.ovh

## Thanks

Thanks to the creators of the existing Firefox extension.
https://addons.mozilla.org/en-GB/firefox/addon/tenhou-ui-translator/

## Disclaimer

This is provided as-is. It's relatively hacky so it might break, although it has worked well so far. If it continues, all the best, otherwise sorry but it is what it is. You're very welcome to re-use and fix.

## License

WTFPL

## Prerequisites

* Web server with Cross-Origin Resource Sharing (CORS) enabled
* Tile graphic ressources
* PHP engine with GD library (optional)

## About tile ressources

These are not included in this repo.
You can use those included in the existing Firefox extension or others with the same layout.
The Tenhou client will fetch different ressources depending on the resolution of your browser window, with the last 3 digits of the filename defining the size of the ressource.
The easiest setup is to use the serveimg.php script to resize on demand.
you should include the base ressources named 000.png, 100.png, ..., 400.png, in a img/ folder. If the script is able to write in this folder it will save the resized ressources for future use, saving CPU.
Alternatively, if you don't have a PHP engine with GD library, you can pre-render all the files. In that case the naming convention is viewwXXXYYY.png with XXX the base ressource (000, 1000, ..., 400) and YYY the width divided by 10.

## About translation resources

This userscript uses the translation from the existing Firefox extension repackaged as a json.

## Installation

* Host the tile and translation ressources on your web hosting. Note that it has to have CORS allowed or the ressources won't load on tenhou.net. The php script serving images will attempt to set the proper headers, make sure the server allows. (If you want to use the default tentiles.7854.ovh server, you can skip this)
* Edit Tentiles.js with the URL where you will host this. (If you want to use the default tentiles.7854.ovh server, you can skip this)
* Add Tentiles.js to whatever Userscript manager you use (tested with https://github.com/quoid/userscripts on Mac and iOS)

## Usage

* Browse to http://tenhou.net/3
* Wait for the patching to happen
* Start a test game to ensure all resources loaded as expected
