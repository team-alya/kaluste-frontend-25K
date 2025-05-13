# Testaus
 
## Front-end
 
Jotta löydät testit, vaihda oikeaan branchiin käyttämällä komentoa:
 
```bash

git checkout testing

Kun olet oikeassa branchissa, asenna Playwright komennolla:
 
bash

npm install playwright

Kun Playwright on asennettu, voit ajaa kaikki front-endin testit komennolla:
 
bash

npm test

Mikäli haluat ajaa vain yhden testin, voit lisätä .only testin määrittelyyn, jolloin Playwright ajaa vain kyseisen testin.
 
Testit voi ajaa myös käyttöliittymän kautta esimerkiksi Playwrightin omalla VS Code -lisäosalla.
 