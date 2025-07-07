import exp from 'constants';

// load playwright library
const { test, expect } = require('@playwright/test');

// URL of my website (local host) - NOTE: this will direct to people-search page
const websiteURL = "http://127.0.0.1:5500/HTML_CSS_JS_files/people-search.html";

/* other links to other pages */
// vehicle search page
const vehicleURL = "http://127.0.0.1:5500/HTML_CSS_JS_files/vehicle-search.html";
// add a vehicle page
const addingURL = "http://127.0.0.1:5500/HTML_CSS_JS_files/add-a-vehicle.html";

// guide the test to my website
test.beforeEach(async({ page }) => {
    await page.goto(websiteURL);
});

/* HTML test */
// pages count (at least 3 pages)
test('files - at least three html pages created', async ({ page }) => {
    // check by how many links in the menu bar (since all of that are html files)
    const numPages = await page.locator('menu').locator('ul').locator('a')
                                .count();
    expect(numPages).toBeGreaterThan(2);
});

// all files name correctly 
// (all letters are in lower case and there is no special characters except hyphen)
test('file names - lower case & no special character (except hyphen)', async({ page }) => {
    const cssFile = "page-view.css"; // css file name (must be same for all pages too)
    // people search page
    await page.getByRole('link', { name: 'People search' }).click();
    /* 1. html file */ await expect(page.url()).toContain('people-search.html');
    /* 2. css file */  const css1 = await page.locator('link').getAttribute('href')
                                                .then((data) => {return data});
                       await expect(css1).toContain(cssFile);
    /* 3. js file */ const js1 = await page.locator('body').locator('script')
                                            .first().getAttribute('src')
                                            .then((data) => {return data});
                     await expect(js1).toContain('people-search.js');

    // vehicle search page
    await page.goto(vehicleURL);
    /* 1. */ await expect(page.url()).toContain('vehicle-search.html');
    /* 2. */ const css2 = await page.locator('link').getAttribute('href')
                                    .then((data) => {return data});
             await expect(css2).toContain(cssFile);
    /* 3. */ const js2 = await page.locator('body').locator('script')
                                    .first().getAttribute('src')
                                    .then((data) => {return data});
             await expect(js2).toContain('vehicle-search.js');

    // add a vehicle page
    await page.goto(addingURL);
    /* 1. */ await expect(page.url()).toContain('add-a-vehicle.html');
    /* 2. */ const css3 = await page.locator('link').getAttribute('href')
                                    .then((data) => {return data});
             await expect(css3).toContain(cssFile);
    /* 3. */ const js3 = await page.locator('body').locator('script')
                                    .first().getAttribute('src')
                                    .then((data) => {return data});
             await expect(js3).toContain('add-a-vehicle.js');
});

// character set exists
test('html charset - character set on all pages', async({ page }) => {
    const set = "utf-8";
    // people search page
    await expect(page.locator('head').locator('meta')).toHaveAttribute('charset', set);
    
    // vehicle search page
    await page.goto(vehicleURL);
    await expect(page.locator('head').locator('meta')).toHaveAttribute('charset', set);
    
    // add a vehicle page
    await page.goto(addingURL);
    await expect(page.locator('head').locator('meta')).toHaveAttribute('charset', set);
});

// title of page exists
test('html title - title exists in all pages', async({ page }) => {
    // people search page
    await expect(page).toHaveTitle('People Search');
    
    // vehicle search page
    await page.goto(vehicleURL);
    await expect(page).toHaveTitle('Vehicle Search');
    
    // add a vehicle page
    await page.goto(addingURL);
    await expect(page).toHaveTitle('Add a Vehicle');
});

// heading for Add a Vehicle
test('html heading - add a vehicle heading', async({ page }) => {
    await page.goto(addingURL);
    await expect(page.getByRole('heading', { name: 'Add a Vehicle' })).toBeVisible();
});

// nav links in menu works perfectly fine
test('html - nav links works', async({ page }) => {
    // people search page
    await page.locator('menu').getByRole('link', { name: 'Vehicle search'}).click();
    await expect(page).toHaveTitle('Vehicle Search');
    /* back to people page and click link for add a vehicle page */
    await page.goto(websiteURL);
    await page.locator('menu').getByRole('link', { name: 'Add a vehicle'}).click();
    await expect(page).toHaveTitle('Add a Vehicle');

    // vehicle search page
    await page.goto(vehicleURL);
    await page.locator('menu').getByRole('link', { name: 'People search'}).click();
    await expect(page).toHaveTitle("People Search");
    /* back to vehicle page and click link for add a vehicle page */
    await page.goto(vehicleURL);
    await page.locator('menu').getByRole('link', { name: 'Add a vehicle'}).click();
    await expect(page).toHaveTitle('Add a Vehicle');

    // add a vehicle page
    await page.goto(addingURL);
    await page.locator('menu').getByRole('link', { name: 'People search'}).click();
    await expect(page).toHaveTitle("People Search");
    /* back to add a vehicle page and click link for vehicle page */
    await page.goto(addingURL);
    await page.locator('menu').getByRole('link', { name: 'Vehicle search'}).click();
    await expect(page).toHaveTitle('Vehicle Search');
});

// all pages has menu and use the same menu
test('html - all pages using the same nav menu', async({ page }) => {
    // menu information
    const menuId = "menu";
    const navCount = 3;
    // check for people search page
    await expect(page.locator('menu')).toHaveAttribute('id', menuId);
    await expect(page.locator('menu').locator('ul').locator('li')).toHaveCount(navCount);
    // check for vehicle search page
    await page.goto(vehicleURL);
    await expect(page.locator('menu')).toHaveAttribute('id', menuId);
    await expect(page.locator('menu').locator('ul').locator('li')).toHaveCount(navCount);
    // check for add a vehicle page
    await page.goto(addingURL);
    await expect(page.locator('menu')).toHaveAttribute('id', menuId);
    await expect(page.locator('menu').locator('ul').locator('li')).toHaveCount(navCount);
});

// all pages should have sidebar (aside) and footer (footer) - semantic elements!
test('html - all pages should have <aside> & <footer>', async({ page }) => {
    // people search page
    await expect(page.locator('aside')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    // vehicle search page
    await page.goto(vehicleURL);
    await expect(page.locator('aside')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    // add a vehicle search page
    await page.goto(addingURL);
    await expect(page.locator('aside')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
});

/* CSS test */
// css flex horizontal for navigation links and the links should use up all the horizontal space
test('css flex - nav links should have css flex horizontally & links should use up the horizontal space', async({ page }) => {
    // css flex horizontally
    await expect(page.locator('menu').locator('ul')).toHaveCSS('display', 'flex');
    await expect(page.locator('menu').locator('ul')).toHaveCSS('flex-direction', 'row');
    
    // links should take up the whole horizontal spaces
    /* size information: */ 
    const width = '150px'; const height = '23px'; const fontSize = '16px';
    
    const links = await page.getByRole('link', { name: 'People search' });
    await expect(links).toHaveCSS('font-size', fontSize);
    await expect(links).toHaveCSS('width', width);
    await expect(links).toHaveCSS('height', height);
});

// bullets are removed from navigation links
test('css list - bullets are removed from nav links', async({ page }) => {
    await expect(page.getByRole('link', { name: 'People search' })).toHaveCSS('list-style', 'outside none none');
});

// only one ul list in the page using flex and removed bullet (which is navigation links)
test('css - only one ul in the page using flex & none list style', async({ page }) => {
    /* 1. count the number of ul in the page 
       2. if more than one, check whether the ul (not nav menu) has flex & none list-style 
          if only one, just passed */

    // get ul in the page
    const ulCount = await page.locator('ul').count();
    if(ulCount === 1){
        await expect(page.locator('ul')).toBeVisible();
    }
    else{
        const ul = await page.getByRole('list');
        for(const i = 2; i <= ulCount; i++){
            await expect(ul.nth(i)).not.toHaveCSS('flex-direction', 'row');
            await expect(ul.nth(i)).not.toHaveCSS('list-style', 'outside none none');
        }
    }
});

// border margin padding (for main, sidebar and footer)
test('css - main, sidebar & footer sections should have 1px solid black border and both 10px margin & padding', async({ page }) => {
    const space = '10px';
    const border = '1px solid rgb(0, 0, 0)';

    /* main */ const main = page.locator('main');
    await expect(main).toHaveCSS('margin', space);
    await expect(main).toHaveCSS('padding', space);
    await expect(main).toHaveCSS('border', border);

    /* sidebar */ const sidebar = page.locator('aside');
    await expect(sidebar).toHaveCSS('margin', space);
    await expect(sidebar).toHaveCSS('padding', space);
    await expect(sidebar).toHaveCSS('border', border);

    /* footer */ const footer = page.locator('footer');
    await expect(footer).toHaveCSS('margin', space);
    await expect(footer).toHaveCSS('padding', space);
    await expect(footer).toHaveCSS('border', border);
});

// grid layout - header should be on top of the page, full width
test('css grid - header should be on top of the page, full width in grid layout', async({ page }) => {
    const header = await page.locator('header');

    // information about the grid layout set up in #container (body):
    // grid-template-column: 1fr 1fr 1fr 1fr; (so 1 / 2 for header to place on top of the page)
    // grid-template-row: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; (so 1 / 5 for header to occupied full width)

    await expect(header).toHaveCSS('grid-column', "1 / 5");
    await expect(header).toHaveCSS('grid-row', "1 / 2");
});

// sidebar and main - ratio 1:4, left:right, at the miidle of the page
test('css grid - sidebar & main at the middle of the page, width ratio 1:4, left:right', async({ page }) => {
    const sidebar = await page.locator('aside');
    const main = await page.locator('main');

    // information about the grid layout set up in #container (body):
    // grid-template-column: 1fr 1fr 1fr 1fr;
    // (so 1 for sidebar, 2 / 5 for main)
    // grid-template-row: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    // (so 2 / 7 for both sidebar & main)

    await expect(sidebar).toHaveCSS('grid-column', '1');
    await expect(sidebar).toHaveCSS('grid-row', '2 / 7');
    await expect(main).toHaveCSS('grid-column', '2 / 5');
    await expect(main).toHaveCSS('grid-row', '2 / 7');
});

// footer should be at the bottom of a page, full width
test('css grid - footer should be at the bottom of the page, full width in grid layout', async({ page }) => {
    const footer = await page.locator('footer');

    // information about the grid layout set up in #container (body):
    // grid-template-column: 1fr 1fr 1fr 1fr; (so 1 / 5 for footer to occupied full width)
    // grid-template-row: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; (so 7 for footer to stay at the bottom)

    await expect(footer).toHaveCSS('grid-column', '1 / 5');
    await expect(footer).toHaveCSS('grid-row', '7');
});

// media queries when the page width less than 500px
test.describe('specific viewport block - when width is < 500px', () => {
    test.use({ viewport: { width: 499, height: 835} });
  
    // navigation links are now vertically stacked
    test('css list - nav links will flex vertically if page width < 500px', async ({ page }) => {
        const navMenu = await page.locator('menu').locator('ul');

        await expect(navMenu).toHaveCSS('display', 'flex');
        await expect(navMenu).toHaveCSS('flex-direction', 'column');
    });

    // sidebar and footer, ratio 1:4, left:right, now bottom of the page
    test('css grid - sidebar & footer at the bottom of the page, width ratio 1:4, left:right (when width is < 500px)', async({ page }) => {
        const sidebar = await page.locator('aside');
        const footer = await page.locator('footer');

        // information about the grid layout set up in #container (body):
        // grid-template-columns: 1fr 1fr 1fr 1fr;
        // (so 1 for sidebar, 2 / 5 for footer)
        // grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        // (so 8 for both)

        await expect(sidebar).toHaveCSS('grid-column', '1');
        await expect(sidebar).toHaveCSS('grid-row', '8');
        await expect(footer).toHaveCSS('grid-column', '2 / 5');
        await expect(footer).toHaveCSS('grid-row', '8');
    })
  });

/* JS test */
/* other People search test */
// when search by license number...
test('search people by "RW765FR" - should return one record', async({ page }) => {
    await page.locator('#license').fill('RW765FR');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#results').locator('div')).toHaveCount(1);
    await expect(page.locator('#results')).toContainText('2');
    await expect(page.locator('#results')).toContainText('Lewis Thomson');
    await expect(page.locator('#results')).toContainText('Nottingham');
    await expect(page.locator('#results')).toContainText('1949-01-15');
    await expect(page.locator('#results')).toContainText('2018-03-25');
    await expect(page.locator('#message')).toContainText('Search successful');
});

// when error - two inputs by user...
test('search people by adding both "Lai" & "DL890GB" - should return error', async({ page }) => {
    await page.locator('#name').fill('Lai');
    await page.locator('#license').fill('DL890GB');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#results').locator('div')).toHaveCount(0);
    await expect(page.locator('#message')).toContainText('Error');
});

// when error - no inputs by user...
test('search people with no inputs - should return error', async({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#results').locator('div')).toHaveCount(0);
    await expect(page.locator('#message')).toContainText('Error');
});

// when no result found by searching name...
test('search people by "Ong" - should return no result found', async({ page }) => {
    await page.locator('#name').fill('Ong');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#results').locator('div')).toHaveCount(0);
    await expect(page.locator('#message')).toContainText('No result found');
})

// when no result found by searching license number...
test('search people by "AB345FG" - should return no result found', async({ page }) => {
    await page.locator('#license').fill('AB345FG');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#results').locator('div')).toHaveCount(0);
    await expect(page.locator('#message')).toContainText('No result found');
});

/* other Vehicle search test */
// when return all details including owner...
test('search vehicle by "SFD43FH" - should return one record with owner', async({ page }) => {
    await page.goto(vehicleURL);
    await page.locator('#rego').fill('SFD43FH');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#results').locator('div')).toHaveCount(1);
    await expect(page.locator('#results')).toContainText('Lancia');
    await expect(page.locator('#results')).toContainText('Thema');
    await expect(page.locator('#results')).toContainText('Blue');
    await expect(page.locator('#results')).toContainText('Oliver Reps');
    await expect(page.locator('#results')).toContainText('JR123DE');
    await expect(page.locator('#message')).toContainText('Search successful');
});

// when error - empty input by user...
test('search vehicle with no input - should return error', async({ page }) => {
    await page.goto(vehicleURL);
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#results').locator('div')).toHaveCount(0);
    await expect(page.locator('#message')).toContainText('Error');
});

// when no result found...
test('search vehicle by "HI101LM" - should return no result found', async({ page }) => {
    await page.goto(vehicleURL);
    await page.locator('#rego').fill('HI101LM');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#results').locator('div')).toHaveCount(0);
    await expect(page.locator('#message')).toContainText('No result found');
});

/* other Add a Vehicle test */
// when owner exists in the system while adding a vehicle...
test('add vehicle with existing owner "Rachel Smith" - should return success with no need to add owner details', async({ page }) => {
    await page.goto(addingURL);
    await page.locator('#rego').fill('NG213GP');
    await page.locator('#make').fill('Lamborghini');
    await page.locator('#model').fill('Aventador');
    await page.locator('#colour').fill('black');
    await page.locator('#owner').fill('Rachel Johnson');
    await page.getByRole('button', { name: 'Add vehicle' }).click();

    await expect(page.locator('#message')).toContainText('Vehicle added successfully');

    // check whether the vehicle was added
    await page.getByRole('link', { name: 'Vehicle search' }).click();
    await page.locator('#rego').fill('NG213GP');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page.locator('#results').locator('div')).toHaveCount(1);
    await expect(page.locator('#results')).toContainText('Lamborghini');
    await expect(page.locator('#results')).toContainText('Aventador');
    await expect(page.locator('#results')).toContainText('black');
    await expect(page.locator('#results')).toContainText('Rachel Johnson');
    await expect(page.locator('#results')).toContainText('JK239GB');
    await expect(page.locator('#message')).toContainText('Search successful');
});

// when error - inputs error by user (during addding vehicle)
test('add vehicle with missing inputs - should return error', async({ page }) => {
    await page.goto(addingURL);
    await page.locator('#rego').fill('NG213GP');
    await page.locator('#make').fill('Mercedes');
    await page.locator('#owner').fill('Teng Ong');
    await page.getByRole('button', { name: 'Add vehicle' }).click();

    await expect(page.locator('#message')).toContainText('Error');
});

// when error - inputs error by user (during adding owner)
test('add owner with missing inputs - should return error', async({ page }) => {
    await page.goto(addingURL);
    // add vehicle details first (with owner 'Teng Ong' who not added into the database)
    await page.locator('#rego').fill('UN173RS');
    await page.locator('#make').fill('Mercedes');
    await page.locator('#model').fill('Benz');
    await page.locator('#colour').fill('sliver');
    await page.locator('#owner').fill('Teng Ong');
    await page.getByRole('button', { name: 'Add vehicle' }).click();

    // add owner
    await page.getByRole('button', { name: 'Add owner' }).click();
    await expect(page.locator('#message')).toContainText('Error');
});