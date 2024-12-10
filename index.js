import 'dotenv/config'
import { writeFileSync } from 'fs'
import * as ejs from "ejs"

const {
  API_URL,
  SIGNATURE_PATH_HTML,
  SIGNATURE_PATH_TEXT,
} = process.env

console.log('API_URL: ', API_URL)
console.log('SIGNATURE_PATH_HTML:', SIGNATURE_PATH_HTML)
console.log('SIGNATURE_PATH_TEXT:', SIGNATURE_PATH_TEXT)

const summary = await fetch_summary_data()

const data = {
  DEATH_COUNT : summary.killed.total,
  REPORT_DATE : format_date( summary.last_update ),
  MONTH_COUNT : months_from_reports( summary.reports ),
}

ejs.renderFile( 'templates/html.ejs', data, (err, html) => writeFileSync( SIGNATURE_PATH_HTML, html ) )
ejs.renderFile( 'templates/text.ejs', data, (err, text) => writeFileSync( SIGNATURE_PATH_TEXT, text ) )

console.log(`Succesfully wrote html & text signatures to disk.`)

async function fetch_summary_data() {
  try {
    const response = await fetch( API_URL )
    if (!response.ok) {
      throw new Error(`Error in data fetch; response status: ${response.status}`)
    }
    const { gaza } = await response.json()
    return gaza
  } catch (error) {
    console.log(`Error in data fetch, more info below`)
    console.error(error.message)
  }
}

function format_date( str ) {
  const date = new Date( str )
  const opts = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleDateString('en-GB', opts)
}

function months_from_reports( reports ) {
  const years = Math.floor( reports / 365 )
  const remainder_days = reports % 365
  const months_from_remainder_days = Math.floor( remainder_days / 30 )
  return 12 * years + months_from_remainder_days
}
