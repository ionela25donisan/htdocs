# 5. Flux Utilizator și User Stories

## User Personas

### **Persona 1: Adrian - Administrator de Proprietăți**
- Vârstă: 45 ani
- Rolul: Gestionează 30+ apartamente
- Nevoie Principală: Să facă o depășit timp și resurse, o soluție centralizată pentru gestionare
- Obiective: Reducere timp administrativ, monitorizare financiară

### **Persona 2: Maria - Proprietar Individual**
- Vârstă: 52 ani
- Rolul: Deține 3 apartamente
- Nevoie Principală: Gestionare ușoară a chirii și documente
- Obiective: Urmărire simplă a veniturilor

---

## User Stories

### **Story 1: Adăugare Chiriaș Nou**
```
CA Adrian (administrator),
VREAU să adaug un chiriaș nou,
PENTRU A urmări informații și contracte.

Criterii de Acceptare:
- Formular cu câmpuri: Nume, Email, Telefon, Adresă, Data Inceput/Sfarsit
- Validare câmpuri obligatorii
- Confirmare adăugare cu mesaj de succes
- Redirectare la lista chiriași
```

### **Story 2: Vizualizare Facturi Neplătite**
```
CA Maria (proprietar),
VREAU să vizualizez facturi neplătite,
PENTRU A urmări plăți restante.

Criterii de Acceptare:
- Filtru automat pentru neplătit
- Afișare: Apartament, Sumă, Data Scadență
- Opțiune marcare ca plătit
- Raport total neîncasat
```

### **Story 3: Programare Întreținere**
```
CA Adrian (administrator),
VREAU să programez o sarcină de întreținere,
PENTRU A urmări reparații apartamente.

Criterii de Acceptare:
- Selectare apartament
- Descriere lucrări
- Data programării
- Alocare responsabil
- Status inițial: Planificat
```

### **Story 4: Upload Document**
```
CA Maria (proprietar),
VREAU să uplodez un document,
PENTRU A pastra contracte în sistem.

Criterii de Acceptare:
- Selectare tip document
- Upload fișier PDF/Word
- Asociere cu apartament
- Confirmare încărcare
```

### **Story 5: Raport Venit Lunar**
```
CA Adrian (administrator),
VREAU să văd raport venit lunar,
PENTRU A urmări profitabilitate.

Criterii de Acceptare:
- Selectare lună
- Afișare: Chirii plătite vs totale
- Facturi plătite vs totale
- Grafic venit vs cheltuieli
```

---

## Flux Principal - Dashboard

```
Login
  ↓
Dashboard (Overview)
  ├─ Stare ocupare (n apartamente libere/ocupate)
  ├─ Venit acestei luni (plătit/total)
  ├─ Facturi neplătite
  ├─ Sarcini întreținere deschise
  ├─ Documente expirate
  │
  └─ Meniu Principal
      ├─ Modul Chiriași
      │  ├─ Adăugare
      │  ├─ Editare
      │  ├─ Ștergere
      │  └─ Vizualizare Detalii
      │
      ├─ Modul Apartamente
      │  ├─ Adăugare
      │  ├─ Editare
      │  └─ Aloca Chiriaș
      │
      ├─ Modul Facturi
      │  ├─ Creeare Factură
      │  ├─ Marcare Plătit
      │  └─ Rapoarte
      │
      ├─ Modul Chirii
      │  ├─ Înregistrare Plată
      │  ├─ Vizualizare Datorii
      │  └─ Rapoarte Venit
      │
      ├─ Modul Întreținere
      │  ├─ Creeare Sarcină
      │  ├─ Actualizare Status
      │  └─ Vizualizare Istoric
      │
      └─ Modul Documente
         ├─ Upload
         ├─ Organizare
         └─ Căutare
```

---

## Tranziții Pagini

- Dashboard → Detaliiu Apartament → Chirii/Facturi Apartament
- Dashboard → Lista Chiriași → Detaliiu Chiriaș → Apartamente Chiriaș
- Dashboard → Rapoarte → Filtru/Export Rezultate

