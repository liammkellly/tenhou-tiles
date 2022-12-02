# tenhou-tiles

> This replaces the tiles on the internet mahjong client Tenhou by custom design tiles.
> The primary use is to play with western friendly tiles (ie. arab numerals and latin script).
> It rewrites some code in the Tenhou client to use external resources instead of the standard ones.
> If you don't want to or don't know how to install this, you can try it here: https://tentiles.work.gd

## Thanks

Thanks to the creators of the existing Firefox extension.
https://addons.mozilla.org/en-GB/firefox/addon/tenhou-ui-translator/

## Disclaimer

This is provided as-is. I'm not a professionnal programmer so it might very well not work for you. If it does, all the best, otherwise sorry but it is what it is. You're very welcome to re-use and fix.

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

## Installation

* Host the tile visual ressources on your web hosting. Note that it has to have CORS allowed or the ressources won't load on tenhou.net
* Edit tentiles.js with the URL where you will host this (if using serveimg.php this should end in serveimg.php?img= ; otherwise this should point to the folder where you have all the ressources including the final /)
* Copy the content of tenhou.js and paste it in the URL field of a bookmark in your browser

## Usage

* Browse to http://tenhou.net/3
* Open the bookmark. Note: this is called a bookmarklet, your browser might require some specific settings to use it. Use your search engine of choice to learn more about bookmarklets usage.