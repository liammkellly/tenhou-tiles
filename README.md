# tenhou-tiles

> This replaces the tiles on the internet mahjong client Tenhou by custom design tiles.
> The primary use is to play with western friendly tiles (ie. arab numerals and latin script).
> It rewrites some code in the Tenhou client to use external resources instead of the standard ones.

## Thanks

Thanks to the creators of the existing Firefox extension.
https://addons.mozilla.org/en-GB/firefox/addon/tenhou-ui-translator/

## License

WTFPL

## Prerequisites

* Web server (can be any web hosting service)
* PHP engine with GdImage support
* Tile graphic ressources

## About tile ressources

These are not included in this repo.
You can use those included in the existing Firefox extension, just rename 0.png to 000.png, 1.png to 100.png, etc.

## Installation

* Edit loadjs.php and tenhou.php with the URL where you will host this
* Copy/upload loadjs.php, tenhou.php and serveimg.php to your server
* Create an img/ directory writable by the PHP engine
* Add tile visual ressources in the img/ directory

## Usage

* Browse to http://tenhou.net/3
* Inject the following code (you can copy-paste it to the address bar):
javascript:fetch('https://your-website.com/tenhou/tenhou.php').then((response) => response.text()).then((data) => document.write(data));
