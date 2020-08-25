import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PossiblePTypesForMTypesComponentsPage from './possible-p-types-for-m-types.page-object';
import PossiblePTypesForMTypesUpdatePage from './possible-p-types-for-m-types-update.page-object';
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

describe('PossiblePTypesForMTypes e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let possiblePTypesForMTypesComponentsPage: PossiblePTypesForMTypesComponentsPage;
  let possiblePTypesForMTypesUpdatePage: PossiblePTypesForMTypesUpdatePage;

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
    possiblePTypesForMTypesComponentsPage = new PossiblePTypesForMTypesComponentsPage();
    possiblePTypesForMTypesComponentsPage = await possiblePTypesForMTypesComponentsPage.goToPage(navBarPage);
  });

  it('should load PossiblePTypesForMTypes', async () => {
    expect(await possiblePTypesForMTypesComponentsPage.title.getText()).to.match(/Possible P Types For M Types/);
    expect(await possiblePTypesForMTypesComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PossiblePTypesForMTypes', async () => {
    const beforeRecordsCount = (await isVisible(possiblePTypesForMTypesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(possiblePTypesForMTypesComponentsPage.table);
    possiblePTypesForMTypesUpdatePage = await possiblePTypesForMTypesComponentsPage.goToCreatePossiblePTypesForMTypes();
    await possiblePTypesForMTypesUpdatePage.enterData();

    expect(await possiblePTypesForMTypesComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(possiblePTypesForMTypesComponentsPage.table);
    await waitUntilCount(possiblePTypesForMTypesComponentsPage.records, beforeRecordsCount + 1);
    expect(await possiblePTypesForMTypesComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await possiblePTypesForMTypesComponentsPage.deletePossiblePTypesForMTypes();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(possiblePTypesForMTypesComponentsPage.records, beforeRecordsCount);
      expect(await possiblePTypesForMTypesComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(possiblePTypesForMTypesComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
