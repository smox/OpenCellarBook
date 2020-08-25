import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MeasurePropertyValueComponentsPage from './measure-property-value.page-object';
import MeasurePropertyValueUpdatePage from './measure-property-value-update.page-object';
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

describe('MeasurePropertyValue e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let measurePropertyValueComponentsPage: MeasurePropertyValueComponentsPage;
  let measurePropertyValueUpdatePage: MeasurePropertyValueUpdatePage;

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
    measurePropertyValueComponentsPage = new MeasurePropertyValueComponentsPage();
    measurePropertyValueComponentsPage = await measurePropertyValueComponentsPage.goToPage(navBarPage);
  });

  it('should load MeasurePropertyValues', async () => {
    expect(await measurePropertyValueComponentsPage.title.getText()).to.match(/Measure Property Values/);
    expect(await measurePropertyValueComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete MeasurePropertyValues', async () => {
    const beforeRecordsCount = (await isVisible(measurePropertyValueComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(measurePropertyValueComponentsPage.table);
    measurePropertyValueUpdatePage = await measurePropertyValueComponentsPage.goToCreateMeasurePropertyValue();
    await measurePropertyValueUpdatePage.enterData();

    expect(await measurePropertyValueComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(measurePropertyValueComponentsPage.table);
    await waitUntilCount(measurePropertyValueComponentsPage.records, beforeRecordsCount + 1);
    expect(await measurePropertyValueComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await measurePropertyValueComponentsPage.deleteMeasurePropertyValue();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(measurePropertyValueComponentsPage.records, beforeRecordsCount);
      expect(await measurePropertyValueComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(measurePropertyValueComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
