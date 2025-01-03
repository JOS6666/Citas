import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { ManageQuotesPage } from './manage-quotes/manage-quotes.page';
import { SettingsPage } from './settings/settings.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'manage-quotes', component: ManageQuotesPage },
  { path: 'settings', component: SettingsPage },
];
