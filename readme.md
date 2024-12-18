# Genocide Signature

A set of scripts and templates to add to your email signature an olive emoji for every death in the ongoing genocide.

## Configuration

First, choose a destination path for your email's signature.

Copy the `.env.example` file to `.env`
```sh
cp .env.example .env
```

Edit the `.env` file to include the correct path for your signature files.
```sh
nano .env
```

Common practice is using a `~/.signature.txt` and/or `~/.signature.html` file.
```sh
API_URL=https://data.techforpalestine.org/api/v3/summary.json
SIGNATURE_PATH_HTML=/home/user/.signature.html
SIGNATURE_PATH_TEXT=/home/user/.signature.txt
```

Configure your email client to use these signature files for your different accounts. This is usually in the account settings of your email client. If you email client allows it, use the html file for html emails and the text file for plain text emails. Most clients will make you choose one or the other based on how you compose your emails.

## Usage

Install the node dependencies
```sh
npm i
```

And run the command.
```sh
npm run build
```

This should build both the html and text signature files at the defined destinations.
The texts used can be edited in the [`templates`](templates) directory.

## Cron

Set up a cronjob for the signatures. Use the way you prefer, but with crontab:
```
crontab -e
```
You can defined a daily schedule to fetch and write the signature files:
```
13 12 * * * npm run --prefix <this-directory> build
```
## Credits

This project was initiated by [Karl Moubarak](https://moubarak.eu/) during the [Declarations Pen Pals](https://varia.zone/declarations-pen-pals.html) worksession at [Varia](https://varia.zone) in Rotterdam.

The data used in the templates is sourced from https://data.techforpalestine.org/.

## License

This repository is published under and protected by the [CC4r*](LICENSE) license.
