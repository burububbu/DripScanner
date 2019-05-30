export class Drip {
  codice: string;
  lotto: string;
  composizione: Map<string, number>;
  dosaggioEta: Map<string, number>;
  dosaggioPeso: Map<string, number>;
  quantita: number;
  scadenza: Date;
  temperaturaMax: number;

  constructor(values: object = {}) {
    Object.assign(this, values);
    this.composizione = new Map(Object.entries(this.composizione));
    this.dosaggioEta = new Map(Object.entries(this.dosaggioEta));
    this.dosaggioPeso = new Map(Object.entries(this.dosaggioPeso));
    this.scadenza = new Date(this.scadenza);
  }
}
