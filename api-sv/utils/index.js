'use strict'

const fs = require('fs')
const path = require('path')
const readline = require('readline')
const utils = require('util')
const { google } = require('googleapis')
const readFile = utils.promisify(fs.readFile)

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
const TOKEN_PATH = 'token.json'

const readTheFile = async () => {
  try {
    const content = await readFile(path.resolve(__dirname, 'credentials.json'))
    return JSON.parse(content)
  } catch (error) {
    console.error(error)
  }
}

const authorize = async () => {
  const credentials = await readTheFile()

  const {client_secret, client_id, redirect_uris} = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0])

  try {
    const token = await readFile(path.resolve(__dirname, TOKEN_PATH))
    oAuth2Client.setCredentials(JSON.parse(token))
    return oAuth2Client
  } catch (error) {
    console.error(error)
    getAccessToken(oAuth2Client)
  }
}

const getAccessToken = async oAuth2Client => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })

  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', async code => {

    rl.close()

    const getToken = utils.promisify(oAuth2Client)
    const writeFile = utils.promisify(fs.writeFile)

    try {
      const token = await getToken(code)
      oAuth2Client.setCredentials(token)
      await writeFile(TOKEN_PATH, JSON.stringify(token))
      listEvents(oAuth2Client)
    } catch (error) {
      console.error('Error retrieving access token', error);
    }
  })
}

const listEvents = async () => {
  const auth = await authorize()
  const calendar = google.calendar({ version: 'v3', auth })

  return new Promise((resolve, reject) => {
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    }, (err, res) => {
      if (err) reject(err)

      resolve(res.data.items)
    })
  })
}

module.exports = { listEvents }
