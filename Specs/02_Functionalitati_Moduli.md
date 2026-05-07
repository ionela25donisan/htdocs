# 2. Funcționalități și Module

## Module Principale

### 1. **MODUL CHIRIAȘI**
**Scop:** Gestionare informații chiriași

**Funcționalități:**
- Adăugare / editare / ștergere chiriași
- Vizualizare informații personale (nume, email, telefon)
- Istoric contracte de închiriere
- Data inicio și finalizare contract
- Status actual (activ/inactiv)
- Contacte de urgență
- Referințe plăți anterioare

**Date Principale:**
- ID Chiriaș, Nume, Email, Telefon
- Adresa, Alte Informații Contact
- Data Inceput Lease, Data Sfarsit Lease
- Status Chiriaș

---

### 2. **MODUL APARTAMENTE**
**Scop:** Administrare informații apartamente

**Funcționalități:**
- Listă complete de apartamente
- Detalii apartament (adresă, număr cameră, suprafață)
- Chiriaș actual alocat
- Istoric locatari
- Status ocupare (liber/ocupat)
- Numar contact urgenta
- Note speciale despre proprietate

**Date Principale:**
- ID Apartament, Adresă, Numar Apartament
- Suprafață, Număr Camere, Etaj
- Chiriaș Actual, Data Ocupare
- Status

---

### 3. **MODUL FACTURI**
**Scop:** Gestionare facturi utilități și servicii

**Funcționalități:**
- Creeare facturi (apa, gaz, electricitate, intretinere)
- Setare data scadență
- Marcare plăți
- Urmărire status (plătit/neplătit/parțial)
- Vizualizare încasat vs neîncasat
- Rapoarte lunare/lunare

**Date Principale:**
- ID Factură, Apartament, Tip (utilități/servicii)
- Sumă Factură, Data Scadență
- Data Plății, Status Plată
- Note Aditionale

---

### 4. **MODUL CHIRII**
**Scop:** Urmărire plăți chirii

**Funcționalități:**
- Înregistrare plăți chirii lunare
- Setare sumă chiriei pentru fiecare apartament
- Metru de calcul (linear, pe metru pătrat)
- Urmărire plăți restante
- Rapoarte de venit
- Notificări pentru plăți viitoare

**Date Principale:**
- ID Chirie, Apartament, Lună
- Sumă Chiriei, Data Scadență
- Chiriaș, Data Plății
- Status (plătit/neplătit/parțial)

---

### 5. **MODUL ÎNTREȚINERE**
**Scop:** Programare și urmărire lucrări de întreținere

**Funcționalități:**
- Creeare sarcini de întreținere
- Descriere lucrări necesare
- Alocare responsabil (chiriaș/prestator)
- Status (planificat/în curs/finalizat)
- Date de programare
- Cost estimat vs real
- Fotografii înainte/după

**Date Principale:**
- ID Sarcina, Apartament, Descriere
- Data Programată, Status
- Responsabil, Cost Estimat
- Prioritate

---

### 6. **MODUL DOCUMENTE**
**Scop:** Stocarea și organizarea documentelor importante

**Funcționalități:**
- Încărcare documente (contracte, acte, versuri)
- Clasificare după tip și apartament
- Căutare și filtru
- Vizualizare și descărcare
- Histórico versiuni documentelor
- Expirare notificări (renovare contracte, etc.)

**Date Principale:**
- ID Document, Tip (contract/act/verso/altele)
- Apartament, Data Upload
- Nume Fișier, Path
- Data Expirare (dacă aplicabil)

