import { SharedAppPage } from './app.po';

describe('shared-app App', function() {
  let page: SharedAppPage;

  beforeEach(() => {
    page = new SharedAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
