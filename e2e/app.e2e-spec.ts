import { WebtestPage } from './app.po';

describe('webtest App', function() {
  let page: WebtestPage;

  beforeEach(() => {
    page = new WebtestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
