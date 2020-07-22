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


# Development

To run this locally, do an npm install and then run the command `yarn dev`. It uses webpack locally and will open in a browser tab and update automatically on save.
Webpack will automatically run the eslint checks and display any errors in the browser (it will auto-fix anything that it can).

When committing to master, the deployment on heroku will automatically rebuild itself.

