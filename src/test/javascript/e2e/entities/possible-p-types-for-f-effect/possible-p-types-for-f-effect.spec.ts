import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PossiblePTypesForFEffectComponentsPage from './possible-p-types-for-f-effect.page-object';
import PossiblePTypesForFEffectUpdatePage from './possible-p-types-for-f-effect-update.page-object';
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

describe('PossiblePTypesForFEffect e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let possiblePTypesForFEffectComponentsPage: PossiblePTypesForFEffectComponentsPage;
  let possiblePTypesForFEffectUpdatePage: PossiblePTypesForFEffectUpdatePage;

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
    possiblePTypesForFEffectComponentsPage = new PossiblePTypesForFEffectComponentsPage();
    possiblePTypesForFEffectComponentsPage = await possiblePTypesForFEffectComponentsPage.goToPage(navBarPage);
  });

  it('should load PossiblePTypesForFEffects', async () => {
    expect(await possiblePTypesForFEffectComponentsPage.title.getText()).to.match(/Possible P Types For F Effects/);
    expect(await possiblePTypesForFEffectComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PossiblePTypesForFEffects', async () => {
    const beforeRecordsCount = (await isVisible(possiblePTypesForFEffectComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(possiblePTypesForFEffectComponentsPage.table);
    possiblePTypesForFEffectUpdatePage = await possiblePTypesForFEffectComponentsPage.goToCreatePossiblePTypesForFEffect();
    await possiblePTypesForFEffectUpdatePage.enterData();

    expect(await possiblePTypesForFEffectComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(possiblePTypesForFEffectComponentsPage.table);
    await waitUntilCount(possiblePTypesForFEffectComponentsPage.records, beforeRecordsCount + 1);
    expect(await possiblePTypesForFEffectComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await possiblePTypesForFEffectComponentsPage.deletePossiblePTypesForFEffect();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(possiblePTypesForFEffectComponentsPage.records, beforeRecordsCount);
      expect(await possiblePTypesForFEffectComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(possiblePTypesForFEffectComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
