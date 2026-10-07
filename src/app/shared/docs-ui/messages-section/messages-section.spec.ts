import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';

import { expectNoAxeViolations } from '../testing/axe';
import { MessagesSection } from './messages-section';

describe('MessagesSection', () => {
  let fixture: ComponentFixture<MessagesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesSection],
      providers: [
        provideKikitaUi(),
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesSection);
    fixture.componentRef.setInput('groups', [
      {
        group: 'avatar',
        interfaceName: 'KuiAvatarMessages',
        note: 'Messages of kui-avatar.',
        rows: [{ name: 'fallback', type: 'string', description: 'Default Avatar.' }],
      },
      {
        group: 'avatarGroup',
        interfaceName: 'KuiAvatarGroupMessages',
        note: 'Messages of kui-avatar-group.',
        rows: [{ name: 'label', type: 'string', description: 'Default Avatar group.' }],
      },
    ]);
    fixture.detectChanges();
  });

  it('renders one table per message group', () => {
    const root = fixture.nativeElement as HTMLElement;
    const tables = root.querySelectorAll('app-api-table');

    expect(root.querySelector('h2')?.id).toBe('messages');
    expect(tables).toHaveLength(2);
    expect(tables[1]?.textContent).toContain('label');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
