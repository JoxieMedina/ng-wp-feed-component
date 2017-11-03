import { WpPlaygroundPage } from './app.po';

describe('wp-playground App', () => {
  let page: WpPlaygroundPage;

  beforeEach(() => {
    page = new WpPlaygroundPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
