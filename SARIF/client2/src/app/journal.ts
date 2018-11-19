import { JournalAccount } from './journalAccount';

export class Journal {
  JId: number;
  Date: Date;
  Description: string;
  Reference: string;
  CreatedBy: string;
  FileID: number;
  JournalAccounts: JournalAccount[];
  acceptance: string;
}
