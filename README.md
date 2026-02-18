# gatsby-starter-default
The default Gatsby starter.

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/).

## Install

Make sure that you have the Gatsby CLI program installed:
```sh
npm install --global gatsby-cli
```

And run from your CLI:
```sh
gatsby new gatsby-example-site
```

Then you can run it by:
```sh
cd gatsby-example-site
gatsby develop
```

## Using the json generation script to update the Devotional passage json!

Within `/static/assets/scripts` directory there is a 2024Devotionals.pdf file containing the devotional passages of the year.
Highlight the column (Month) you are interested in pulling and copy and past the contents to  `/static/assets/scripts/devotional.txt` (Override any existing content)

For example, for the month of March you will copy and paste the contents like below (You can find the full example in  `/static/assets/scripts/devotional.txt`)

```
1 마가복음 8:1-13
2 막 8:14-26
3 막 8:27-9:1
4 막 9:2-13
5 막 9:14-29 
6 막 9:30-37 
...
```

Finally, when you are done run
```
npm run create-devotional
```
The script will propt you to enter the translated name of the book mentioned in the devotional.
*Note that if a month contains more than one books it will not be able to update properly -- It is suggested to split the month in multiple pieces to contain just one book and join them together.*

You will find `devotional-for-the-month.json` file created then copy its contents to the appropriate place in `daily-devotion-passages.json`

## Using the chat gpt prompt to build the devotional JSON

Alternatively, within `/static/assets/scripts/gpt-prompts` you will find `pdf-to-json-devotion-prompt.md`

You could visit chatgpt.com, upload both the prompt file, and the PDF containing all of the devotional to the chat. 

Let ChatGPT do the work for you 😁

*It is somehow not fully deterministic.. not sure why, use at your discretion. You MAY (or may not) need to give it a few more inputs..*

IF it does some random things. You might want to follow up with

```
> Use the prompt to create a downloadable JSON file as instructed
```

## Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)
