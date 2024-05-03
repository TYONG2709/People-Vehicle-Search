import exp from 'constants';

// load playwright library
const { test, expect } = require('@playwright/test');

// URL of my website (local host)
const websiteURL = "http://127.0.0.1:5500/HTML_CSS_JS_files/home_page.html";

// guide the test to my website
test.beforeEach(async({ page }) => {
    await page.goto(websiteURL);
});

/* HTML test */
// pages count (at least 3 pages)

// all files name correctly 
// (all letters are in lower case and there is no special characters except hyphen)


/* CSS test */

/* other People search test */

/* other Vehicle search test */

/* other Add a Vehicle test */
