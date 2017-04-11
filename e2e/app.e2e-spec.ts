import { OuctionPage } from './app.po';

describe('ouction App', () => {
  let page: OuctionPage;

  beforeEach(() => {
    page = new OuctionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
