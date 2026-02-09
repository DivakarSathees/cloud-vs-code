const puppeteer = require('puppeteer');
    (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox']
    });
    
    // Test case to verify the existence of book and delete buttons in the available batches page
    const page1 = await browser.newPage();
    try {
      await page1.goto('https://api.example.com/');
      await page1.setViewport({
        width: 1200,
        height: 1200,
      });
      await page1.waitForSelector('#addButton', { timeout: 2000 });
      const rowCount = await page1.$$eval('tr', rows => rows.length, { timeout: 2000 });
    
      if (rowCount >2) 
      {
        console.log('TESTCASE:Existence_of_add_and_table_along_with_rows_in_available_movies_page:success');
      } 
      else 
      {
        console.log('TESTCASE:Existence_of_add_and_table_along_with_rows_in_available_movies_page:failure');
      }
    } catch (e) {
      console.log('TESTCASE:Existence_of_add_and_table_along_with_rows_in_available_movies_page:failure');
    }  

    // Test case to verify the existence of review button and heading in the Movie Review form page
    const page2 = await browser.newPage();
    try {
      await page2.goto('https://api.example.com/');
      await page2.setViewport({
        width: 1200,
        height: 1200,
      });
      await page2.waitForSelector('#addButton', { timeout: 2000 });
      await page2.click('#addButton');
      const urlAfterClick = page2.url();
    //   await page2.waitForSelector('#backtomovies', { timeout: 2000 });
      const Message = await page2.$eval('h2', element => element.textContent.toLowerCase());
      // console.log(Message);
    if(Message.includes("add movie")&&urlAfterClick.toLowerCase().includes('movie/addmovie'))
    {
    console.log('TESTCASE:Existence_of_AddMovie_button_in_available_movies_page_and_Naviagte_to_AddMovieForm_with_heading:success');
    }    
    else{
    console.log('TESTCASE:Existence_of_AddMovie_button_in_available_movies_page_and_Naviagte_to_AddMovieForm_with_heading:failure');
    }
    } catch (e) {
      console.log('TESTCASE:Existence_of_AddMovie_button_in_available_movies_page_and_Naviagte_to_AddMovieForm_with_heading:failure');
    } 


    const page3 = await browser.newPage();
    try {
      await page3.goto('https://api.example.com/');
      await page3.setViewport({
        width: 1200,
        height: 1200,
      });
      await page3.waitForSelector('#deleteButton', { timeout: 2000 });
      await page3.click('#deleteButton');

    console.log('TESTCASE:Existence_of_delete_button:success');

    } catch (e) {
      console.log('TESTCASE:Existence_of_delete_button:failure');
    } 

    finally{
    await page1.close();
    await page2.close();
    await page3.close();
    await browser.close();
    }
  
})();