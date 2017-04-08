export class Modal {
  header: string;
  body: string;
  id: string;

  constructor(header: string, body: string, id: string) {
    this.header = header;
    this.body = body;
    this.id = id;
  }
}
