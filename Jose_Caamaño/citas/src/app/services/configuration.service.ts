import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  async getConfig(key: string): Promise<any> {
    const { value } = await Preferences.get({ key });
    return JSON.parse(value || 'null');
  }

  async setConfig(key: string, value: any): Promise<void> {
    await Preferences.set({
      key,
      value: JSON.stringify(value),
    });
  }
}
