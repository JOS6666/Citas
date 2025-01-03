import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class SettingsPage implements OnInit {
  allowDeleteOnStartup = false;

  constructor(private configService: ConfigurationService) {}

  async ngOnInit() {
    this.allowDeleteOnStartup = (await this.configService.getConfig('allowDeleteOnStartup')) || false;
  }

  async toggleDeleteOption() {
    await this.configService.setConfig('allowDeleteOnStartup', this.allowDeleteOnStartup);
  }
}
