import { Component } from '@angular/core';

import {
  KuiCellDirective,
  KuiRowDirective,
  KuiTableDirective,
  KuiThDirective,
  KuiThGroupDirective,
} from '@kikita-labs/ui';

interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly department: string;
  readonly location: string;
  readonly status: 'Active' | 'Invited' | 'Suspended';
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Ava Chen',
    role: 'Engineer',
    department: 'Platform',
    location: 'Remote',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Liam Osei',
    role: 'Designer',
    department: 'Product',
    location: 'Berlin',
    status: 'Invited',
  },
  {
    id: '3',
    name: 'Noor Malik',
    role: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Priya Rao',
    role: 'Support',
    department: 'Operations',
    location: 'Singapore',
    status: 'Suspended',
  },
  {
    id: '5',
    name: 'Tomas Silva',
    role: 'Engineer',
    department: 'Platform',
    location: 'Lisbon',
    status: 'Active',
  },
];

@Component({
  selector: 'app-sticky-header-table-example',
  imports: [
    KuiCellDirective,
    KuiRowDirective,
    KuiTableDirective,
    KuiThDirective,
    KuiThGroupDirective,
  ],
  templateUrl: './sticky-header-table-example.html',
  styleUrl: './sticky-header-table-example.scss',
})
export class StickyHeaderTableExample {
  protected readonly rows = TEAM_MEMBERS;
}
