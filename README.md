# Food Planner

This food planner is something I've wanted to make for awhile. All of the free options are terrible or don't let you use your own recipes. To get a headstart, I am using Trello for most of the manual processes that I have not automated yet. This gives us a good overall structure and persistence layer so that we only have to create a frontend that does the small features we want to add. This could eventually become either a complete standalone app or we could turn this into a Trello plugin. For now it will just be a frontend that talks to the Trello API and runs locally.

## Main Features:
- Recipe Scraper
- Drag to calendar planning
- Grocery list


## TODO List (somewhat prioritized):

* Pull in new recipes automatically into the "New Things" list
  * Scrape skinnytaste.com
  * Scrape other sites
  * From an image
  * Save all the bits:
    * Url
    * Number of servings
    * Ingredients
    * Directions
    * Some tags? (Slow Cooker, Meatless, etc)
    * Cook/Prep/Total Time
    * Amount Per Serving
    * Picture
* Display chosen list from trello (list, filters, etc)
* Drag from chosen list to current week display
* Generate a shopping list and put that in a trello card
* Display the shopping list trello card
* Pull kid days/weekends/etc (and probably more events) from a google calendar
  * Configure what colors/icons show per type of event
