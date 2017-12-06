import { AppclientSrcPage } from './app.po';

describe('appclient-src App', function() {
  let page: AppclientSrcPage;

  beforeEach(() => {
    page = new AppclientSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
