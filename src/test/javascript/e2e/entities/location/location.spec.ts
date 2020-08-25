import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LocationComponentsPage from './location.page-object';
import LocationUpdatePage from './location-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Location e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let locationComponentsPage: LocationComponentsPage;
  let locationUpdatePage: LocationUpdatePage;

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
    locationComponentsPage = new LocationComponentsPage();
    locationComponentsPage = await locationComponentsPage.goToPage(navBarPage);
  });

  it('should load Locations', async () => {
    expect(await locationComponentsPage.title.getText()).to.match(/Locations/);
    expect(await locationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Locations', async () => {
    const beforeRecordsCount = (await isVisible(locationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(locationComponentsPage.table);
    locationUpdatePage = await locationComponentsPage.goToCreateLocation();
    await locationUpdatePage.enterData();

    expect(await locationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(locationComponentsPage.table);
    await waitUntilCount(locationComponentsPage.records, beforeRecordsCount + 1);
    expect(await locationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await locationComponentsPage.deleteLocation();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(locationComponentsPage.records, beforeRecordsCount);
      expect(await locationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(locationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
