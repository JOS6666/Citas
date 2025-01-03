import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-manage-quotes',
  templateUrl: './manage-quotes.page.html',
  styleUrls: ['./manage-quotes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class ManageQuotesPage implements OnInit {
  newQuote = { text: '', author: '' };
  quotes: { id: number; text: string; author: string }[] = [];

  constructor(private quoteService: QuoteService) {}

  async ngOnInit() {
    this.quotes = await this.quoteService.getAllQuotes();
  }

  async addQuote() {
    await this.quoteService.addQuote(this.newQuote);
    this.quotes = await this.quoteService.getAllQuotes();
    this.newQuote = { text: '', author: '' };
  }

  async deleteQuote(quote: { id: number }) {
    await this.quoteService.deleteQuote(quote);
    this.quotes = await this.quoteService.getAllQuotes();
  }
}
