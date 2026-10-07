import { createProviderDefaultsTabs } from './create-provider-defaults-tabs';

describe('createProviderDefaultsTabs', () => {
  it('builds application and subtree snippets for the defaults key', () => {
    const [application, subtree] = createProviderDefaultsTabs('datePicker');

    expect(application?.code).toContain('provideKikitaUi({');
    expect(application?.code).toContain('datePicker: {');
    expect(subtree?.code).toContain('provideKuiDefaults({');
    expect(subtree?.code).toContain('datePicker: {');
  });
});
