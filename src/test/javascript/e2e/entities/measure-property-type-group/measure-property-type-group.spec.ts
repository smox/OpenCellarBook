import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MeasurePropertyTypeGroupComponentsPage from './measure-property-type-group.page-object';
import MeasurePropertyTypeGroupUpdatePage from './measure-property-type-group-update.page-object';
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

describe('MeasurePropertyTypeGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let measurePropertyTypeGroupComponentsPage: MeasurePropertyTypeGroupComponentsPage;
  let measurePropertyTypeGroupUpdatePage: MeasurePropertyTypeGroupUpdatePage;

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
    measurePropertyTypeGroupComponentsPage = new MeasurePropertyTypeGroupComponentsPage();
    measurePropertyTypeGroupComponentsPage = await measurePropertyTypeGroupComponentsPage.goToPage(navBarPage);
  });

  it('should load MeasurePropertyTypeGroups', async () => {
    expect(await measurePropertyTypeGroupComponentsPage.title.getText()).to.match(/Measure Property Type Groups/);
    expect(await measurePropertyTypeGroupComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete MeasurePropertyTypeGroups', async () => {
    const beforeRecordsCount = (await isVisible(measurePropertyTypeGroupComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(measurePropertyTypeGroupComponentsPage.table);
    measurePropertyTypeGroupUpdatePage = await measurePropertyTypeGroupComponentsPage.goToCreateMeasurePropertyTypeGroup();
    await measurePropertyTypeGroupUpdatePage.enterData();

    expect(await measurePropertyTypeGroupComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(measurePropertyTypeGroupComponentsPage.table);
    await waitUntilCount(measurePropertyTypeGroupComponentsPage.records, beforeRecordsCount + 1);
    expect(await measurePropertyTypeGroupComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await measurePropertyTypeGroupComponentsPage.deleteMeasurePropertyTypeGroup();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(measurePropertyTypeGroupComponentsPage.records, beforeRecordsCount);
      expect(await measurePropertyTypeGroupComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(measurePropertyTypeGroupComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
