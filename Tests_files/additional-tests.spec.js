import exp from 'constants';

// load playwright library
const { test, expect } = require('@playwright/test');

// URL of my website (local host)
const websiteURL = "http://127.0.0.1:5500/HTML_CSS_JS_files/home_page.html";
// NOTE: this will direct to my home_page

// guide the test to my website
test.beforeEach(async({ page }) => {
    await page.goto(websiteURL);
});

/* HTML test */
// pages count (at least 3 pages)
test('at least three html pages created', async ({ page }) => {
    // check by how many links in the menu bar (since all of that are html files)
    const numPages = await page.locator('menu').locator('ul').locator('a').count();
    expect(numPages).toBeGreaterThan(2);
});

// all files name correctly 
// (all letters are in lower case and there is no special characters except hyphen)
test('file names - are in lower case and no special character (except hyphen)', async({ page }) => {
    // home page
});

// character set exists

// title of the page exists

// all pages has menu and use the same menu (check the same id)

// all pages should have sidebar (aside) and footer (footer)
// semantic elements!

/* CSS test */
// css flex horizontal for navigation links 
// and the links should use up all the horizontal space

// bullets are removed from navigation links

// only one ul list in the page using flex and removed bullet (which is navigation links)

// border margin padding (for main, sidebar and footer)

// grid layout - header should be on top of the page, full width \

// sidebar and main - ratio 1:4, left:right

// footer should be at the bottom of a page, full width

// media queries when the page width less than 500px
// navigation links are now vertically stacked
// sidebar and footer, ratio 1:4, left:right, now bottom of the page

/* other People search test */

/* other Vehicle search test */

/* other Add a Vehicle test */
