# 03 — Schema Bază de Date

## Prezentare generală

Aplicația suportă două moduri de stocare:
1. **localStorage** (implicit) — fără instalare, rulează direct în browser
2. **MySQL** (opțional) — prin API-ul PHP din `/api/`

Ambele moduri folosesc aceeași structură de date.

---

## Baza de date MySQL

**Nume BD**: `apartment_management`  
**Charset**: `utf8mb4` / `utf8mb4_unicode_ci`  
**Engine**: InnoDB

---

## Tabel: `apartments`

Stochează toate proprietățile din portofoliu.

```sql
CREATE TABLE `apartments` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `address`    VARCHAR(255) NOT NULL,        -- adresa completa
  `type`       VARCHAR(100) NOT NULL,        -- Apartament, Studio, Garsoniera, Vila, Casa
  `rooms`      INT NOT NULL DEFAULT 0,       -- nr camere
  `area`       INT NOT NULL DEFAULT 0,       -- suprafata mp
  `floor`      VARCHAR(50) DEFAULT NULL,     -- etaj (text: "3", "P+4")
  `year`       INT DEFAULT NULL,             -- an constructie
  `status`     VARCHAR(50) NOT NULL,         -- Liber, Ocupat, De vanzare, etc.
  `rent`       DECIMAL(10,2) DEFAULT 0,      -- chirie lunara RON
  `price`      DECIMAL(10,2) DEFAULT 0,      -- pret vanzare RON
  `amenities`  VARCHAR(500) DEFAULT NULL,    -- dotari, separate prin virgula
  `notes`      TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Statusuri valide**: `Liber`, `Ocupat`, `De vânzare`, `Rezervat`, `În mentenanță`, `Vândut`, `Închiriat`

---

## Tabel: `tenants`

Chiriași, cumpărători și prospecți.

```sql
CREATE TABLE `tenants` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `first`      VARCHAR(100) NOT NULL,        -- prenume
  `last`       VARCHAR(100) NOT NULL,        -- nume
  `email`      VARCHAR(150) NOT NULL,
  `phone`      VARCHAR(50) DEFAULT NULL,
  `cnp`        VARCHAR(13) DEFAULT NULL,     -- cod numeric personal (stocat, nu indexat)
  `apartment`  VARCHAR(255) DEFAULT NULL,    -- adresa apartamentului asociat (FK logic)
  `status`     VARCHAR(50) NOT NULL,         -- Activ, Inactiv, Prospect
  `notes`      TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> ⚠️ **Notă securitate**: CNP-ul se afișează mascat în UI (doar ultimele 4 cifre). Nu se indexează și nu se expune prin API de listare publică.

---

## Tabel: `contracts`

Contracte de închiriere, vânzare-cumpărare și alte tipuri.

```sql
CREATE TABLE `contracts` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `apartment`  VARCHAR(255) NOT NULL,        -- adresa proprietatii
  `tenant`     VARCHAR(255) DEFAULT NULL,    -- numele chiriasului/cumparatorului
  `type`       VARCHAR(100) NOT NULL,        -- Inchiriere, Vanzare-Cumparare, etc.
  `number`     VARCHAR(100) DEFAULT NULL,    -- nr contract (ex: CTR-2024-001)
  `start`      DATE NOT NULL,               -- data incepere
  `end`        DATE DEFAULT NULL,            -- data expirare (NULL = nedeterminat)
  `value`      DECIMAL(10,2) DEFAULT 0,      -- valoare contract (chirie lunara sau pret vanzare)
  `deposit`    DECIMAL(10,2) DEFAULT 0,      -- garantie
  `status`     VARCHAR(50) NOT NULL,         -- Activ, Expirat, Reziliat
  `notes`      TEXT DEFAULT NULL,            -- clauze speciale
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Logică status automat**: dacă `end < CURDATE()` și status = `Activ` → se afișează ca `Expirat` (nu se modifică automat în DB, doar în UI).

---

## Tabel: `payments`

Evidența tuturor tranzacțiilor financiare.

```sql
CREATE TABLE `payments` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `apartment`  VARCHAR(255) NOT NULL,        -- adresa proprietatii
  `type`       VARCHAR(100) NOT NULL,        -- Chirie, Utilitati, Tranzactie vanzare, etc.
  `amount`     DECIMAL(10,2) NOT NULL,       -- suma in RON
  `date`       DATE NOT NULL,               -- data platii
  `method`     VARCHAR(100) DEFAULT NULL,    -- Transfer bancar, Numerar, Card, Cec, Altele
  `notes`      VARCHAR(500) DEFAULT NULL,    -- referinta, chitanta nr., etc.
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Tabel: `listings`

Anunțuri imobiliare publicate.

```sql
CREATE TABLE `listings` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `address`     VARCHAR(255) NOT NULL,       -- titlul / adresa anuntului
  `type`        VARCHAR(50) NOT NULL,        -- Inchiriere, Vanzare, Cumparare
  `rooms`       INT DEFAULT 0,
  `area`        INT DEFAULT 0,               -- mp
  `floor`       VARCHAR(50) DEFAULT NULL,
  `price`       DECIMAL(10,2) DEFAULT 0,     -- RON
  `negotiable`  VARCHAR(10) DEFAULT 'Da',    -- Da / Nu
  `status`      VARCHAR(50) DEFAULT 'Activ', -- Activ, Rezervat, Vandut, Inchiriat, Retras
  `description` TEXT DEFAULT NULL,
  `amenities`   VARCHAR(500) DEFAULT NULL,   -- dotari, separate prin virgula
  `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Tabel: `maintenance`

Intervenții tehnice și de reparații.

```sql
CREATE TABLE `maintenance` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `apartment`   VARCHAR(255) NOT NULL,
  `date`        DATE NOT NULL,               -- data programata
  `description` TEXT NOT NULL,              -- descrierea problemei
  `priority`    VARCHAR(50) NOT NULL,        -- Scazuta, Medie, Ridicata, Urgenta
  `status`      VARCHAR(50) NOT NULL,        -- Programat, In desfasurare, Finalizat, Anulat
  `cost`        DECIMAL(10,2) DEFAULT 0,     -- cost estimat/real RON
  `vendor`      VARCHAR(255) DEFAULT NULL,   -- firma sau persoana executanta
  `notes`       TEXT DEFAULT NULL,
  `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Relații logice (fără FK explicit)

```
apartments.address  ←──  tenants.apartment
apartments.address  ←──  contracts.apartment
apartments.address  ←──  payments.apartment
apartments.address  ←──  listings.address
apartments.address  ←──  maintenance.apartment
tenants.(first+last) ←── contracts.tenant
```

> Relațiile sunt menținute prin adresa ca string comun, nu prin ID numeric. Aceasta permite flexibilitate maximă în interfața de tip SPA fără JOIN-uri complexe.

---

## Date demo (seed)

La prima inițializare se inserează automat:

| Tabel | Nr. înregistrări | Descriere |
|-------|-----------------|-----------|
| apartments | 4 | Cluj, București, Timișoara, Brașov |
| tenants | 2 | 1 activ, 1 prospect |
| contracts | 2 | 1 închiriere, 1 vânzare |
| payments | 3 | chirie + garanție + avans vânzare |
| listings | 4 | mix de închiriere și vânzare |
| maintenance | 2 | 1 programat, 1 în desfășurare |

---

## localStorage keys (mod SPA)

| Cheie | Conținut |
|-------|----------|
| `rh_apartments` | Array JSON apartamente |
| `rh_tenants` | Array JSON chiriași |
| `rh_contracts` | Array JSON contracte |
| `rh_payments` | Array JSON plăți |
| `rh_listings` | Array JSON anunțuri |
| `rh_maintenance` | Array JSON intervenții |