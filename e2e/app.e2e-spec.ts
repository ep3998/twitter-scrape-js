import { TwitterScrapeJsPage } from './app.po';

describe('twitter-scrape-js App', () => {
  let page: TwitterScrapeJsPage;

  beforeEach(() => {
    page = new TwitterScrapeJsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
