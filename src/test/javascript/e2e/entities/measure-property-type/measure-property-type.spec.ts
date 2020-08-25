import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MeasurePropertyTypeComponentsPage from './measure-property-type.page-object';
import MeasurePropertyTypeUpdatePage from './measure-property-type-update.page-object';
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

describe('MeasurePropertyType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let measurePropertyTypeComponentsPage: MeasurePropertyTypeComponentsPage;
  let measurePropertyTypeUpdatePage: MeasurePropertyTypeUpdatePage;

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
    measurePropertyTypeComponentsPage = new MeasurePropertyTypeComponentsPage();
    measurePropertyTypeComponentsPage = await measurePropertyTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load MeasurePropertyTypes', async () => {
    expect(await measurePropertyTypeComponentsPage.title.getText()).to.match(/Measure Property Types/);
    expect(await measurePropertyTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete MeasurePropertyTypes', async () => {
    const beforeRecordsCount = (await isVisible(measurePropertyTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(measurePropertyTypeComponentsPage.table);
    measurePropertyTypeUpdatePage = await measurePropertyTypeComponentsPage.goToCreateMeasurePropertyType();
    await measurePropertyTypeUpdatePage.enterData();

    expect(await measurePropertyTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(measurePropertyTypeComponentsPage.table);
    await waitUntilCount(measurePropertyTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await measurePropertyTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await measurePropertyTypeComponentsPage.deleteMeasurePropertyType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(measurePropertyTypeComponentsPage.records, beforeRecordsCount);
      expect(await measurePropertyTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(measurePropertyTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
