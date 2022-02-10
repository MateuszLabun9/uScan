import React, {useMemo} from 'react';



/**
 *Klasa Zdjecie
 *
 * @export Zdjecie
 * @class Zdjecie(nazwa, result, sciezka) {strings} 
 */
export class Zdjecie {
  self = {nazwa: '', result: 'result', sciezka: 'sciezka'};
  constructor(nazwa, result, sciezka) {
    this.self = {nazwa, result, sciezka};
  }
  get = () => {
    return {...this.self};
  };
}

/**
 *Klasa ListaZdjec
 *
 * @export ListaZdjec
 * @class ListaZdjec(zdjecia) {array} 
 */
export class ListaZdjec {
  zdjecia = [];

  dodajzdjecie(nazwa, result, sciezka) {
    this.zdjecia.push(new Zdjecie(nazwa, result, sciezka));
  }
  getItems() {
    return [...this.zdjecia];
  }
}

export const zdjInitialContext = [ListaZdjec, () => {}];

export const ZdjContext = React.createContext(zdjInitialContext);

/**
 *Dodawanie zdjec do tablicy
 *
 * @export ZdjController
 * @param {*} props
 * @returns zdjecie
 */
export default function ZdjController(props) {
  const listaZdjec = useMemo(() => new ListaZdjec(), []);
  const value = [listaZdjec.getItems(), listaZdjec.dodajzdjecie];

  return (
    <ZdjContext.Provider value={value}>{props.children}</ZdjContext.Provider>
  );
}
