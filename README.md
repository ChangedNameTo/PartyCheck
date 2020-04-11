# Welcome to PartyCheck

After being stuck on e5s for close to 150 pulls, I started to see the same people in many of my parties. I wanted to create an easy way to evauluate if I'd played with someone before. This scans your FFLogs username and pulls every person you've played with in Savage/EX content. It's still heavily under development, and is my first stab at react so can be buggy.

## Getting Started

### Prerequisites

Uses npm and react.

### Installing
Normal npm installation. Clone, then run 

`npm i`

If using yarn 

`yarn i`

### Running Tests
Leverages Cypress for testing. All features must include an accompanying `.spec` file, or the PR will be rejected.

To run tests:

`npm cypress:open`

## Contributing
Right now this is my personal project to learn react. That's not to say that I will reject pull requests, but rather I will prioritize things as I see fit and work on them when I can. If there's something I would rather do myself because I find it interesting, I will do so.

## Todo

- [ ] Filter out Limit Breaks, Pets, "Multiple Players", etc.
- [ ] New favicon
- [ ] Link directly to the pull/log on the subfight table
- [ ] Create a search bar to limit results down to a couple people
- [ ] Create a filter for certain fights/jobs
- [ ] Create a "Party" side table that uses a button on the row to "Build" a party out of the people you're doing content with.
- [ ] Leverage cookies so you can save your username
- [ ] Leverage cookies so you can save your character name
- [ ] Leverage cookies so you can save tags/notes about players
- [ ] Create an export system to allow tags/notes to be shared amongst people

## License

This project is licensed under the MIT License - see the LICENSE file for details
