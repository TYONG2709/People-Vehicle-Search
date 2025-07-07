# Introducing the Searching System 
This is a small project to showcase my ability to create a simple website that able to connect the search with database stored in **Supabase**.

### Short brief about the website
*This webpage to allow user (in this case probably road transport officer) to have a fast search of the people and respective vehicle. This front end page is connected to database with all the information of `People` and `Vehicles`.*

> [!TIP] Future plan:
> - design a better UI
> - use a more easy, nicer framework
> - be aware on security concerns, such as possible SQL injection attack on search bar

## Working Files
### Front End 
| Implementations | Files |
| --------------- | ----- |
| **HTML** | <ul><li>[People Search page](/HTML_CSS_JS_files/people-search.html)</li><li>[Vehical Search page](/HTML_CSS_JS_files/vehicle-search.html)</li><li>[Add a Vehicle page](/HTML_CSS_JS_files/add-a-vehicle.html)</li></ul> |
| **CSS** | [Page View (all pages should have the same css)](/HTML_CSS_JS_files/page-view.css) <br /> **Note: there is a media queries in css file for the page with pagewidth less than 500px (from line number 263 to 524)** |

### Back End
| Implementations | Files |
| --------------- | ----- |
| **JavaScript** | **Module files** <ul><li>[People Search js](/HTML_CSS_JS_files/people-search.js)</li><li>[Vehicle Search js](/HTML_CSS_JS_files/vehicle-search.js)</li><li>[Add a Vehicle js](/HTML_CSS_JS_files/add-a-vehicle.js)</li></ul> **Test File (testing with Playwright)** <ul><li>[Simple People Search test](/tests-files/simple-search-test.spec.js)</li><li>[Other tests](/tests-files/additional-tests.spec.js)</li></ul> <br /> <strong>Note: Please run the sample test file first before running the additional test file. If some of the test failed, run it individually and it will pass. Run it with PlayWright test.</strong> |
| <image src="Images/supabase.png" alt="Supabase logo" height="35" />  | **Online <em>PostgreSQL</em> database**<br />[Document about how I setup the database](/docs/adding_database.md) |
