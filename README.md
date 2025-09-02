# ESG-lomake

React-sovellus maitotilan ESG-vastuullisuusraportin kokoamiseen ja tulostamiseen.
Sovellus ohjaa käyttäjää vaiheittain ympäristö-, sosiaalisen vastuun sekä talouden ja hallinnon aiheisiin.
Sovellusta voit tarkastella julkisesta osoitteesta: https://www.esgmaito.fi/

## Ominaisuudet
- Vaiheittainen lomake neljällä pääosalla
- Luonnoksen tallennus ja lataus JSON-tiedostona
- Valmiin raportin tulostus PDF-muotoon
- Lomakkeen tiedot säilyvät selaimen paikallisessa tallennuksessa

## Asennus ja kehitys
1. Asenna riippuvuudet:
   ```bash
   npm install
   ```
2. Käynnistä kehityspalvelin:
   ```bash
   npm start
   ```
   Sovellus aukeaa osoitteeseen [http://localhost:3000](http://localhost:3000).

## Testit
Aja jest-testit kerran seuraavalla komennolla:
```bash
npm test -- --watchAll=false
```

## Tuotantoversio
Luo optimoitu tuotantoversio hakemistoon `build`:
```bash
npm run build
```

## Lisätietoja
Lähdekoodi löytyy hakemistosta `src/`. Keskeiset lomakesivut sijaitsevat kansiossa `src/components`.
