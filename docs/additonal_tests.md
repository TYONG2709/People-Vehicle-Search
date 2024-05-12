### Additonal tests created
test file: [additional-tests.spec.js](/Tests_files/additional-tests.spec.js)

#### HTML
1. <strong>files - at least three html pages created</strong>
   - <em>(line number 22 to 27)</em>
   - testing by checking how many pages the menu (navigation bar) can links to. Expect to be more than 2 pages (exclusive).
2. <strong>file names - lower case & no special character (except hyphen)</strong>
   - <em>(line number 31 to 65)</em>
   - testing by checking the html, css and js links for each pages (the link must have contain the file name). Click the link in the navigation menu bar by using for eg. `getByRole('link', {name: "People Search"}).click()`. Expect the file name to be all lower letters and only have hyphen.
3. <strong>html charset - character set on all pages</strong>
   - <em>(line number 68 to 80)</em>
   - testing by checking `<meta>` tag in `<head>` to have attribute `charset` with `utf-8` for each page.
4. <strong>html title - title exists in all pages</strong>
   - <em>(line number 83 to 94)</em>
   - testing by expecting each page to have title by using `expect(page).toHaveTitle()`.
5. <strong>html heading - add a vehicle heading</strong>
   - <em>(line number 97 to 100)</em>
   - testing by checking whether the `Add a Vehicle` page have heading or not.
6. <strong>html - nav links works</strong>
   - <em>(line number 103 to 129)</em>
   - testing by using `locator('menu').getByRole().click()` and check whether it arrive the correct page by expecting the location page to have the correct title. Test this for all the navigation links in all pages
7. <strong>html - all pages using the same nav menu</strong>
   - <em>(line number 132 to 147)</em>
   - testing by checking whether the navigation bar have the same `id` and same number of links in `menu` tag for all pages.
8. <strong>html - all pages should have `<aside>` & `<footer>`</strong>
   - <em>(line number 150 to 162)</em>
   - testing by checking whether all pages pass the tests: `expect(page.locator('aside')).toBeVisible()` and `expect(page.locator('footer')).toBeVisible()`.

#### CSS
1. <strong>css flex - nav links should have css flex horizontally & links should use up the horizontal space</strong>
   - <em>(line number 166 to 179)</em>
   - testing by checking whether the list `ul` in `menu` tag have the css: `display: flex` and `flex-direction: row`.
   - and also testing whether the navigation links uses the same css: `font-size: 16px`, `width: 150px` and `height: 23px`.
2. <strong>css list - bullets are removed from nav links</strong>
   - <em>(line number 182 to 184)</em>
   - testing by checking whether it has this css: `list-style: outside none none`.
3. <strong>css - only one ul in the page using flex & none list style</strong>
   - <em>(line number 187 to 204)</em>
   - testing with the following steps:
    1. count the number of `ul` in the page
    2. if > 1, check whether the other `ul` (not nav menu) has the following css: `flex-direction: row` and `list-style: outside none none`.
    3. if = 1, just check whether the `ul` is visible or not.
4. <strong>css - main, sidebar & footer sections should have 1px solid black border and both 10px margin & padding</strong>
   - <em>(line number 207 to 225)</em>
   - testing by checking whether `<main>`, `<aside>` and `<footer>` have the css: `margin: 10px`, `padding: 10px` and `border: 1px solid rgb(0, 0, 0)`.

(additonal information: `grid-template-column: 1fr 1fr 1fr 1fr` & `grid-template-row: 1fr 1fr 1fr 1fr 1fr 1fr 1fr`)

5. <strong>css grid - header should be on top of the page, full width in grid layout</strong>
   - <em>(line number 228 to 237)</em>
   - testing by checking whether the `<header>` have css: `grid-column: 1 / 5` and `grid-row: 1 / 2`.
6. <strong>css grid - sidebar & main at the middle of the page, width ratio 1:4, left:right</strong>
   - <em>(line number 240 to 254)</em>
    - testing by checking whether the `<aside>` have css: `grid-column: 1` and `grid-row: 2 / 7`.
    - testing by checking whether the `<main>` have css: `grid-column: 2 / 5` and `grid-row: 2 / 7`.
7. <strong>css grid - footer should be at the bottom of the page, full width in grid layout</strong>
   - <em>(line number 257 to 266)</em>
   - testing by checking whether the `<footer>` have css: `grid-column: 1 / 5` and `grid-row: 7`.

Note: <strong><u>specific viewport block - when width is < 500px</u></strong> is a `test.describe()` which test the webpage <strong>when the page width is < 500px (media queries)</strong> <em>(line number 269 to 296)</em>

8. <strong>css list - nav links will flex vertically if page width < 500px</strong>
   - <em>(line number 273 to 278)</em>
   - testing by checking whether the list `ul` in `menu` tag have the css: `display: flex` and `flex-direction: column` when the webpage width > 500px.

(additonal information for media queries (width < 500px): `grid-template-column: 1fr 1fr 1fr 1fr` & `grid-template-row: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr`)

9. <strong>css grid - sidebar & footer at the bottom of the page, width ratio 1:4, left:right (when width is < 500px)</strong>
    - <em>(line number 281 to 295)</em>
    - testing by checking whether the `<aside>` have css: `grid-column: 1` and `grid-row: 8`.
    - testing by checking whether the `<footer>` have css: `grid-column: 2 / 5` and `grid-row: 8`.

#### JavaScripts
##### People Search
1. <strong>search people by "RW765FR" - should return one record</strong>
   - <em>(line number 301 to 312)</em>
   - testing by inputing `'RW765FR'` into input `#license` and click `Submit` button afterwards. It should return one result with all the information about the owner and success message.
2. <strong>search people by adding both "Lai" & "DL890GB" - should return error</strong>
   - <em>(line number 315 to 322)</em>
   - testing by inputing `'Lai'` and `'DL890GB'` in both input `#name` and `#license` and click `Submit` button afterwards. It should return error message.
3. <strong>search people with no inputs - should return error</strong>
   - <em>(line number 325 to 330)</em>
   - testing by entering no inputs and click `Submit` straight away. It should return error message.
4. <strong>search people by "Ong" - should return no result found</strong>
   - <em>(line number 333 to 339)</em>
   - testing by entering `'Ong'` (not in the database) into `#name` and click `Submit` afterwards. It should return no result and 'no result found' message.
5. <strong>search people by "AB345FG" - should return no result found</strong>
   - <em>(line number 342 to 348)</em>
    - testing by entering `'AB345FG'` into input `#license` and click `Submit`. It should return no result and 'no result found' message.
##### Vehicle Search
6. <strong>search vehicle by "SFD43FH" - should return one record with owner</strong>
   - <em>(line number 352 to 364)</em>
   - testing by entering `'SFD43FH'` into input `#rego` and click `Submit`. It should return one result and a success message.
7. <strong>search vehicle with no input - should return error</strong>
   - <em>(line number 367 to 373)</em>
   - testing by entering no input and click `Submit`. It should return error message.
8. <strong>search vehicle by "HI101LM" - should return no result found</strong>
   - <em>(line number 376 to 383)</em>
   - testing by entering `'HI101LM'` (not in the database) into input `#rego` and click `Submit`. It should return no result and 'no result found' message.
##### Add a Vehicle
9. <strong>add vehicle with existing owner "Rachel Smith" - should return success with no need to add owner details</strong>
    - <em>(line number 387 to 410)</em>
    - testing by entering new vehicle details with existing owner `'Rachel Smith'` and click `Add Vehicle`. It should not appear add owner option and return successful message.
    - after that, check whether the new vehicle is in the database by going to Vehicle Search page. It should show success result
10.  <strong>add vehicle with missing inputs - should return error</strong>
    - <em>(line number 413 to 421)</em>
    - testing by entering no inputs and click `Add vehicle`. It should return error message.
11.  <strong>add owner with missing inputs - should return error</strong>
    - <em>(line number 424 to 437)</em>
    - testing by entering all details about new vehicle but with an owner name not in the database. After `Add vehicle` was click, straight away click `Add owner` button without adding any owner details. It should return error message.


###### [back to main page](../README.md)