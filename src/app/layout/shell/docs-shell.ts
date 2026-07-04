import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocsHeader } from '../header/docs-header';
import { PageToc } from '../page-toc/page-toc';
import { SidebarNav } from '../sidebar-nav/sidebar-nav';

@Component({
  selector: 'app-docs-shell',
  imports: [DocsHeader, PageToc, RouterOutlet, SidebarNav],
  templateUrl: './docs-shell.html',
  styleUrl: './docs-shell.scss',
})
export class DocsShell {}
