import { SquizerPage } from './app.po';

describe('squizer App', () => {
  let page: SquizerPage;

  beforeEach(() => {
    page = new SquizerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
