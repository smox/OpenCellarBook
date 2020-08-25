import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MeasureEntryComponentsPage from './measure-entry.page-object';
import MeasureEntryUpdatePage from './measure-entry-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('MeasureEntry e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let measureEntryComponentsPage: MeasureEntryComponentsPage;
  let measureEntryUpdatePage: MeasureEntryUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    measureEntryComponentsPage = new MeasureEntryComponentsPage();
    measureEntryComponentsPage = await measureEntryComponentsPage.goToPage(navBarPage);
  });

  it('should load MeasureEntries', async () => {
    expect(await measureEntryComponentsPage.title.getText()).to.match(/Measure Entries/);
    expect(await measureEntryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete MeasureEntries', async () => {
    const beforeRecordsCount = (await isVisible(measureEntryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(measureEntryComponentsPage.table);
    measureEntryUpdatePage = await measureEntryComponentsPage.goToCreateMeasureEntry();
    await measureEntryUpdatePage.enterData();

    expect(await measureEntryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(measureEntryComponentsPage.table);
    await waitUntilCount(measureEntryComponentsPage.records, beforeRecordsCount + 1);
    expect(await measureEntryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await measureEntryComponentsPage.deleteMeasureEntry();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(measureEntryComponentsPage.records, beforeRecordsCount);
      expect(await measureEntryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(measureEntryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
