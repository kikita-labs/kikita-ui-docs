import { Component } from '@angular/core';

import { KuiAvatarGroupComponent, type KuiAvatarItem } from '@kikita-labs/ui';

const MEMBERS: readonly KuiAvatarItem[] = [
  { src: 'https://i.pravatar.cc/64?img=12', name: 'Nikita Repin', status: 'online' },
  { name: 'Anya Murashova', status: 'away' },
  { name: 'Timur Ognev' },
  { name: 'Vera Saltykova' },
  { name: 'Ilya Denisov' },
];

@Component({
  selector: 'app-avatar-group-example',
  imports: [KuiAvatarGroupComponent],
  templateUrl: './avatar-group-example.html',
  styleUrl: './avatar-group-example.scss',
})
export class AvatarGroupExample {
  protected readonly members = MEMBERS;
}
