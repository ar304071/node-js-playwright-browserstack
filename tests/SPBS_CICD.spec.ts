import * as dotenv from 'dotenv'
import { test, expect, selectors,Page,BrowserContext } from '@playwright/test';
import { faker } from '@faker-js/faker';
import * as sflib from '../Util/splibrary';
import * as fs from 'fs';



let lFile = process.cwd() + process.env.FCTD;


dotenv.config();






test.afterEach(async ({ page }, testInfo) => {
   await sflib.SP_Logout_Event(page);
});

// After All Action ******************************************************
test.afterAll(async ({ page }) => {
  await page.close();
  if (process.env.DEBUGENV == "1") 
      await sflib.saveTestResult("_SP");


});


sflib.gRunLevelSP.forEach(data => {
  test.describe('DESC_001', () => {
    test.use({ baseURL: `${data.Baseline}`});
   // ---------------- Driver Starts ---------------------------
    test(`SP_001_LogInandLogout - ${data.Baseline}`, async ({ page }) => {
    let lRun = Number(`${data.RunLevel}`);
    await sflib.SP_Login_Event(page, lRun);
    console.log('LogIn and Logout Process');
   // ---------------- Driver Ends ---------------------------

      });

    });
});
