# app-project

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/ollebergkvist/jsframework-project-frontend/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/ollebergkvist/jsframework-project-frontend/?branch=main)
[![Build Status](https://scrutinizer-ci.com/g/ollebergkvist/jsframework-project-frontend/badges/build.png?b=main)](https://scrutinizer-ci.com/g/ollebergkvist/jsframework-project-frontend/build-status/main)
[![Build Status](https://travis-ci.com/ollebergkvist/jsframework-project-frontend.svg?branch=main)](https://travis-ci.com/ollebergkvist/jsframework-project-frontend)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Krav 2: Frontend

Angående testmiljön för min backend valde jag att gå samma väg som vi hade gått i tidigare kursmoment, dvs. en test svit bestående av chai, chai-http, mocha och nyc. Jag baserade delvis mitt val på att jag ville befästa mina kunskaper gällande denna metod som lärts ut under kursens gång samt att det var relativt felfritt att få testsviten att fungera, jag kunde fokusera på att skriva testfall till fullu. Jag tycker även att kombinationen utav Mocha och Chai fungerar väldigt bra samt att den visuella representationen utav kodtäckningen utav Istanbul ger en bra översikt. Innan testerna körs så implementerade jag ett script i ett pretest scrip i programmets package.json, "node db/reset.js", en version på bash scriptet från tidigare kmom men nu som node. Då jag bestämt mig för att använda endast Mongoose för projektet, så fick jag även sätta mig in i synthaxen för att tömma en databas med den nämda tekniken. Mongoose har fungerat suveränt i alla aspekter, förutom i just denna. Det var inte lätt att få Mongoose att ta bort en databas, efter många timmars felsökning kom jag framtill en kombination mellan att ta bort en databas och därefter dess kollektioner, vilket gav önskat resultat. Men envis som jag är så ville jag försöka hitta en lösning för att endast behöva ta bort databasen (vilket logiskt sätt borde ta bort innehållet utav kollektioner också). Jag fick rätt på det till slut, det känns som en väldigt enkel sak att uträtta, men officiell dokumentation och diverse forumtrådar verkar vara oense om hur en ska gå till väga med Mongoose. Med andra ord råder det en hel motstridighet om tillvägagångssättet och det verkar skilja sig från fall till fall vad som faktiskt fungerar.

Backendens CI-kedja består utav två tekniker, först ut är Travis som är ett byggsystem för att checka ut kod och för att köra tester automatiskt varje gång en pushar kod till tillhörande github repo, då Travis är kopplat till varje version en checkar ut av sin kod blir det även tydligt att se vilka commits som passerade och vilka som fallerade, med andra ord väldigt fördelaktigt. För att få uppgifter om kodtäckning och kodkvalitet implementerade jag Scrutinizer, som även det är kopplat till Github.
I båda fallen aktiverade jag notifikationer via email, på så sätt behöver en inte logga in på hemsidan för att se om testerna gick igenom, utan en får ett mail om det fungerade eller inte. Scrutinizer ger även hintar om variabler som inte används eller kod som saknar syfte, på så sätt är det även ett bra verktyg för att refaktorera.

Gällande kodkvalitet och uppnåd kodtäckning, så fick min backend applikation högsta betyg samt en kodtäckning om 75 %, hade gärna spenderat mer tid på att skriva fler testfall men jag fick göra en prioritera pga. sjukdom.

Koden för de invididuella testfallen är visserligen snarlik, givetvis beroende på hur komplext en vill göra testfallen, men jag upplever det åtminstone i detta fall att det är relativt enkelt att uppnå 100 % kodtäckning om en har det som mål. På det stora hela rör det sig om integrationstester, det hade dock varit intressant att prova E2E (end to end testing), vad jag känner till så kan Supertest användas för detta syfte men en kan även använda newman tillsammans med Postman (där en kan använda sina sparade kollektioner för att sakapa end-to-end flow tests), den sistnämnda metoden vore intressant att utforska då åtminstone jag brukar först och främst testa API:r med Postman och då en kan återanvända sparade requests så behöver en inte skriva ny kod. Anser att jag är nöjd med uppnått resultat, skulle dock som sagt vilja prova på andra tekniker också.

Min frontend valde jag att bygga med Vue, då detta är ramverket jag har arbetat med unders kursens gång. Jag uppskattar verkligen att jobba med Vue, det känns väldigt logiskt, synthaxen är relativt "human" och ramverk är väl dokumenterat med praktiska exempel och ett officiellt forum där en enkelt kan få hjälp. Jag baserade även mitt val på att jag under kursens gång har bestämt mig för att jag vill jobba som en MEVN (MongoDB, Express, Vue och Node.js) developer när jag kommer ut i yrkeslivet,
det är en kombination som verkligen faller mig i smaken. Till skillnad från tidigare kursmoment valde jag att försöka bryta ut min kod i ännu mindre moduler denna gång, dels har jag arbetat med views men även med komponenter, där vyer importerar komponenter. Det blir en del uppdelning men det blir på så sätt tydligt vad varje "komponent" har för roll, och det blir inte så stora dokument samt att det finns utrymme att återanvända en hel del kod. Det gäller bara att namnge "komponenterna" på ett bra sätt.
Precis som i tidigare KMOM valde jag att fortsätta att arbeta med axios, som är en promise baserad HTTP klient för node, så som jag förstår det så är det i stort sett industristandard att använda denna modul för att hämta data från ett api. I övrigt använde jag bootstrap och bootstrap-vue för att styla min app, då det är mitt to-go sätt för att styla hemsidor och appar.

Gällande applikations funktionalitet, valde jag att gömma hela appen bakom en login del som är baserad på JSON web tokens. Med andra ord går det inte att få tillgång till appen utan att registrera ett konto först. Utan detta är endast två routes tillgänliga, dvs. "login" samt "register". När användaren är inloggad och validerad med en giltig token, går det att använda applikations funktioner så som att se en översikt över registrerade användaruppgifter under "dashboard", sätta in pengar under "deposit", se aktier och dess prisförändringar över tid i form utav en realtidsuppdaterad graf med hjälp utav socket.io under "stocks" samt slutligen se en översikt av sitt aktieportfolio under "portfolio". Funktionalitet för att sälja och köpa aktier ligger under "stocks". Jag begränsade som routesen genom att använda mig utav Vue:s router modul som kontrollerar att giltig token finns innan en route kan nås. När användaren loggat in renderas en ny navigationsmeny, vilket jag löste genom att lägga till meta taggar i Vue:s router, "hideNavigation". Först när en användare loggat in blir denna navigationsmeny tillgänglig.

För att rita upp grafen valde jag att prova på en ny teknik, Vue-Chart som är en wrapper för Chart.js.
Jag lekte runt lite med Rickshaw tidigare under kursen, men jag kände att det vore trevligt att lära sig en ny teknik samt en teknik som är anpassad just för Vue. Det fanns även väldigt bra dokumentation gällande wrappern samt har jag läst flertalet tekniker på Medium som rekommenderar ramverkt Chart.js. Det visade sig vara ett ytterst lämpligt val. Realtidsinformationen som generas från en fristående socket-server, visas upp i graf form där y axeln visar pris och x axeln tidpunkt. Jag lyckades få till en liveuppdatering även utav tidsstämplarna så dessa genereras automatiskt i samband med varje emit från servern. Något jag är väldigt nöjd med, det blev trevlig UX med andra ord. Jag la även till funktionalitet för att aktivera och deaktivera grafer för en särskild aktie, på så sätt kan en se aktierna indivduellt samt hur de jämför sig med varandra över tid.

Slutligen har appen stylats för att även fungera på mobila enheter (responsivt), något som är väldigt enkelt att få till med hjälp utav Bootstrap, en anledning till varför jag valde att arbeta med detta css bibliotek för projektet. Bootstrap har även väldigt bra default formulär som är framtagna från diverse studier gällande användarvänlighet, jag skulle vilja påstå att jag har fått till en trevlig app som är enkel att använda. Samt använde jag mig utav ett typografiskt grid för att öka läsbarheten.

### Krav 5: Tester Frontend

Anträffande testsviten för min frontend applikation valde jag att integrera Mocha och Selenium, valet baserades framför allt på att Selenium verkar ha varit någon slags industri standard en gång i tiden, om jag skulle göra om detta krav skulle jag dock välja att använda en annan teknik så som Cypress, där en kan fokusera på att skriva avancerade testfall utan att behöva oroa sig för att asynkrona problem, något som enligt egen erfarenhet Selenium verkar ha svårigheter med. En annan nackdel med Selenium och tillhörande drivers var att jag trots en hel del undersökning inte kunde få testerna att fungera lokalt, vilket ledde till att varje gång jag ville göra ett test så fick jag göra det headless via Travis och Scrutinizer, där åtminstone Travis tar 3-5 minuter att köra klart programmet. Med andra ord anser jag det väldigt ineffektivt om en inte först kan köra testerna lokalt innan en pushar sitt repo. Cypress om jag förstått rätt väntar automatiskt för commands och assertions, medan i Selenium måste addera explicita och implicita "wait" kommandon för att fungera. Där det senare visade sig inte att gå att fungera i de fall det behövdes i mitt case. Jag ville skriva mer komplicerade test fall för att fylla i formulär, registrera användare och logga in användare tex, men efter 1.5 dags försök och 70 github commits senare bekände jag mig besegrad utav Seleniums begränsningar. Med hänsyn till detta fick jag i slutändan förenkla min testfall och avgränsa dessa till endast testa funktionalitet som inte kräver någon form utav inloggning eller registrering.

Testerna körs genom kommandot "npm test" och det går även att validera koden med hjälp utav eslint vilket går att exekvera med hjälp utav kommandot "npm run eslint".

Use cases:

#1 Testa index routen

#2 Testa registrerings routen

#3 Testa navigeringsmenyn

#4 Testa att logotypen har renderats

#5 Testa att klicka på logotypen och nå min personliga webbplats
