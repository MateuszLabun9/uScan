import React, {useMemo} from 'react';

/**
 *Notatka
 *
 * @export Notatka
 * @class Notatka(nazwa, tresc, sciezka) {strings} 
 */
export class Notatka {
  self = {nazwa: '', tresc: 'tresc', sciezka: 'sciezka'};
  constructor(nazwa, tresc, sciezka) {
    this.self = {nazwa, tresc, sciezka};
  }
  get = () => {
    return {...this.self};
  };
}

/**
 *Klasa ListaNotatek
 *
 * @export ListaNotatek
 * @class ListaNotatek(notatki) {array} 
 */

export class ListaNotatek {
  notatki = [];

  dodajnotatka(nazwa, tresc, sciezka) {
    this.notatki.push(new Notatka(nazwa, tresc, sciezka));
  }
  getItems() {
    return [...this.notatki];
  }
}

export const NotatInitialContext = [ListaNotatek, () => {}];

export const NotatContext = React.createContext(NotatInitialContext);



/**
 *Dodawanie notatek do tablicy
 *
 * @export NotatController
 * @param {*} props
 * @returns notatka
 */
export default function NotatController(props) {
  const listaNotatek = useMemo(() => new ListaNotatek(), []);
  const value = [listaNotatek.getItems(), listaNotatek.dodajnotatka];

  return (
    <NotatContext.Provider value={value}>
      {props.children}
    </NotatContext.Provider>
  );
}
