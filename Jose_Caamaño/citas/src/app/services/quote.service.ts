import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private dbInstance: SQLiteObject | null = null;
  private quotes: { id: number; text: string; author: string }[] = [];
  getRandomQuote: any;

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      const db = await this.sqlite.create({
        name: 'quotes.db',
        location: 'default',
      });

      this.dbInstance = db;

      
      await db.executeSql(
        `CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, author TEXT)`,
        []
      );

      
      const result = await db.executeSql(`SELECT COUNT(*) AS count FROM quotes`, []);
      const count = result.rows.item(0).count;

      if (count === 0) {
        await this.addQuote({ text: 'El éxito consiste en obtener lo que se desea.', author: 'Ralph Waldo Emerson' });
        await this.addQuote({ text: 'Ningún viento es bueno para el barco que no sabe adónde va.', author: 'Séneca' });
      }

      this.loadAllQuotes();
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async loadAllQuotes() {
    if (!this.dbInstance) return;

    try {
      const result = await this.dbInstance.executeSql(`SELECT * FROM quotes`, []);
      this.quotes = [];

      for (let i = 0; i < result.rows.length; i++) {
        this.quotes.push(result.rows.item(i));
      }
    } catch (error) {
      console.error('Error loading quotes:', error);
    }
  }

  async getAllQuotes() {
    await this.loadAllQuotes();
    return this.quotes;
  }

  async addQuote(quote: { text: string; author: string }) {
    if (!this.dbInstance) return;

    try {
      await this.dbInstance.executeSql(
        `INSERT INTO quotes (text, author) VALUES (?, ?)`,
        [quote.text, quote.author]
      );
      await this.loadAllQuotes();
    } catch (error) {
      console.error('Error adding quote:', error);
    }
  }

  async deleteQuote(quote: { id: number }) {
    if (!this.dbInstance) return;

    try {
      await this.dbInstance.executeSql(`DELETE FROM quotes WHERE id = ?`, [quote.id]);
      await this.loadAllQuotes();
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  }
}
