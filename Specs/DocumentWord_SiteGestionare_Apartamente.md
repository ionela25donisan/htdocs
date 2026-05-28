# Document Word – Site de gestionare a apartamentelor

## Temă de culori
- Fundal principal: alb `#FFFFFF`
- Accent principal: mov închis `#3A05E`
- Text principal: `#222222`
- Buton primar: fundal mov închis `#3A05E`, text alb
- Carduri: fundal alb, bordură subtilă mov deschis, titluri mov închis

---

## 1. Funcționalități moderne pentru un site de gestionare a apartamentelor (Varianta B)

### 1.1. Funcționalități esențiale
- Portal chiriași
- Plăți online
- Contracte digitale
- Notificări automate
- Mentenanță și cereri de reparații
- Dashboard financiar
- Management documente
- Istoric plăți și restanțe

### 1.2. Funcționalități moderne (2026)
- AI pentru comunicare și analiză
- Chatbot pentru chiriași
- Analiză predictivă pentru mentenanță
- Automatizare leasing
- Rapoarte financiare în timp real
- Mobile-first design

### 1.3. Funcționalități avansate
- Auto-renewal contracte
- Generare automată facturi
- Calcul automat întreținere
- Integrare cu bănci
- Notificări push
- Modul proprietari

### 1.4. Funcționalități pentru administrarea apartamentelor
- Status apartamente (liber / ocupat / renovare)
- Evidență utilități
- Fotografii și detalii tehnice
- Asociere chiriași–apartamente
- Istoric chiriași

### 1.5. Concluzie
Un site modern de gestionare a apartamentelor trebuie să includă funcții de bază, automatizări, AI, raportare avansată și o experiență mobile-first pentru a fi competitiv și eficient.

---

## 2. Plan site enterprise – structură, pagini și layout (Varianta A)

### 2.1. Arhitectura paginilor (Sitemap)

#### Manager:
- `/dashboard`
- `/apartamente`
- `/apartamente/:id`
- `/chiriasi`
- `/chiriasi/:id`
- `/contracte`
- `/contracte/:id`
- `/plati`
- `/mentenanta`
- `/mentenanta/:id`
- `/setari`

#### Chiriaș (Portal):
- `/portal`
- `/portal/plati`
- `/portal/mentenanta`
- `/portal/documente`
- `/portal/profil`

### 2.2. Layout general (manager)

#### Structură:
- Sidebar stânga – mov închis `#3A0A5E`, text alb
  - Dashboard
  - Apartamente
  - Chiriași
  - Contracte
  - Plăți
  - Mentenanță
  - Setări
- Topbar – alb, text mov închis
  - search global
  - icon notificări
  - profil utilizator
- Content area – fundal alb, carduri cu accente mov închis

### 2.3. Dashboard manager

#### Conținut:
- Card: Apartamente libere / ocupate / în renovare
- Card: Chirie încasată luna curentă
- Card: Restanțe
- Card: Contracte care expiră în curând
- Grafic: venituri pe ultimele 12 luni
- Listă: cereri recente de mentenanță

#### Structură HTML (schelet, pentru Word doar ca exemplu):
```html
<div class="dashboard">
  <div class="cards">
    <div class="card">Apartamente libere: 4</div>
    <div class="card">Chirie încasată: 12.500 RON</div>
    <div class="card">Restanțe: 1.200 RON</div>
    <div class="card">Contracte care expiră: 2</div>
  </div>

  <div class="chart-container">
    <canvas id="incomeChart"></canvas>
  </div>

  <div class="recent-maintenance">
    <h3>Cereri recente</h3>
    <ul>
      <li>Scurgere baie – în lucru</li>
      <li>Probleme încălzire – nou</li>
    </ul>
  </div>
</div>
```

### 2.4. Pagina „Apartamente”

#### Listă apartamente:
- adresă
- chiriaș curent
- chirie
- status (liber / ocupat / renovare)
- buton „Detalii”

#### Detalii apartament:
- date tehnice (suprafață, camere, etaj)
- poze
- chiriaș curent + link profil
- contract activ
- istoric plăți
- istoric mentenanță

### 2.5. Pagina „Chiriaș”

- date personale (nume, telefon, email)
- contract(e) active
- istoric plăți (chirie + utilități)
- cereri de mentenanță
- status (activ / inactiv)

### 2.6. Contracte

- listă contracte (apartament, chiriaș, perioadă, status)
- filtre: active / expirate / aproape de expirare
- generare contract din șablon (date auto-completate)
- notificări pentru expirare

### 2.7. Plăți

- tabel plăți: chiriaș, apartament, sumă, dată, tip (chirie/utilități), status
- secțiune „Restanțe” cu total + listă detaliată
- export CSV / Excel

### 2.8. Mentenanță

- listă cereri: nouă / în lucru / rezolvată
- fiecare cerere: descriere, poze, apartament, chiriaș, cost, responsabil
- vizualizare listă + eventual kanban pe status

### 2.9. Portal chiriaș

#### Home chiriaș:
- card „Chirie curentă” – sumă + buton „Plătește acum”
- card „Cereri mentenanță” – listă + „Raportează problemă”
- card „Contract” – perioadă + „Descarcă PDF”

#### Secțiuni:
- Plăți – istoric + setare plată recurentă
- Mentenanță – cereri + status
- Documente – contract, anexe
- Profil – date personale

### 2.10. Culori și stil (pentru designer)

- Fundal principal: alb `#FFFFFF`
- Accent principal: mov închis `#3A0A5E`
- Text principal: `#222222`
- Buton primar: fundal mov închis, text alb
- Carduri: fundal alb, border subtil mov deschis, titluri mov închis
