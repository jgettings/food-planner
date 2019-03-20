# Food Planner

This food planner is something I've wanted to make for awhile. All of the free options are terrible or don't let you use your own recipes. To get a headstart, I am using Trello for most of the manual processes that I have not automated yet. This gives us a good overall structure and persistence layer so that we only have to create a frontend that does the small features we want to add. This could eventually become either a complete standalone app or we could turn this into a Trello plugin. For now it will just be a frontend that talks to the Trello API and runs locally.

## Main Features:
- Recipe Importer
- Automatic Grocery list
- Drag to calendar planning

## Recipe Importer
I wanted a way to paste a link somewhere and have a recipe imported automatically. It won't be that easy until I can spin up a backend and do it from there. Until then, CORS will stand in our way. To work around the CORS issue, I've settled on pasting in the DOM element and parsing that HTML instead. Since most of my own recipes are coming from skinnytaste.com, parsing those recipes is the most prioritized and tested. If other sites or formats are necessary, they can be added to the issues list in github with the `parser` label.

The best way to grab the html to import is to right click inside of the recipe box (assuming most blogs and recipe sites have this separated from the actual blog post text, etc). Click "inspect element" and scroll up in the DOM until you find the main recipe box element. On skinnytaste, this is the element with the "recipe" id. Right click on this element in dev tools and copy the HTML. Paste this into the import box in the app and click "Import Recipe".

## How to use this with Trello
(Put some info here and how to set it up, once we do the local storage thing or whatever)


## TODO List (somewhat prioritized):

* Update react
* Move this list to github issues
* Store api keys and stuff somewhere so we can deploy this somewhere (local storage? some type of server config?)
* Generate a shopping list and put that in a trello card
* Display the shopping list trello card
* Automate labels from import html
* Automate picture from import html
* Display chosen list from trello (list, filters, etc)
* Add from chosen list to current week (w/ just a button first, just add it to the next empty day)
* Drag from chosen list to current week display
* Pull kid days/weekends/etc (and probably more events) from a google calendar
  * Configure what colors/icons show per type of event
* Track how long it's been since food was made, like for leftovers and knowing if food is still good
* Display weather on the calendar
