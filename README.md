# Who's That Pokemon?!
This is a game where users can guess what pokemon is displayed to see if they're right or wrong!
Correct pokemon get added to the box. The user can also see their best win streak and compare it to their current win streak. The current win streak resets with an incorrect guess.

## Installation

Please have [json server](https://www.npmjs.com/package/json-server) installed.

We accessed a free external api to display random pokemon. We also utilize json server and store correct pokemon answers to a db.json file. This allows us to pull from the db.json to fill the box with pokemon from correct answers.

To host with a live list please run through terminal/cmd:

`json-server --watch db.json`

## Contributions

Please report any bugs/errors through the issue ticketing system. Any improvements to features or functionality can be submitted through pull requests.

## References

[PokeAPI](https://pokeapi.co/)

[StackOverflow LOL](https://stackoverflow.com/)
