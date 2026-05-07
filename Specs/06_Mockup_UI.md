# 6. Mockup UI și Design

## Observație Mockup

- Mockup-ul include două tipuri de view-uri: **mobile** și **desktop**.
- Există un flux de selecție view înainte de autentificare.
- După autentificare se afișează interfața aplicației cu filtre active.

## Palet Culori

```
Culoare Primară: #2C3E50 (Albastru Inchis - Header/Sidebar)
Culoare Accent: #3498DB (Albastru Deschis - Butoane, Link-uri)
Culoare Success: #27AE60 (Verde - Status Plătit, Success)
Culoare Warning: #F39C12 (Portocaliu - Atenție, Restanță)
Culoare Error: #E74C3C (Roșu - Erori, Datorii)
Culoare Neutral: #ECF0F1 (Gri Deschis - Background)
Text Principal: #2C3E50
Text Secondary: #7F8C8D
```

---

## Layout Principal

```
┌─────────────────────────────────────────────────┐
│ HEADER - Logo | Sistem de Gestiune Apartamente │
├──────┬──────────────────────────────────────────┤
│      │                                          │
│ SIDE │         CONTENT AREA                     │
│ BAR  │  (Adaptiv la fiecare pagină)            │
│      │                                          │
└──────┴──────────────────────────────────────────┘
       FOOTER
```

---

## Componente UI

### **Card Component**
```
┌─ Titlu Card ─────────────────────┐
│                                  │
│ Conținut                         │
│ ┌────────────────────────────┐   │
│ │ Informații principale      │   │
│ └────────────────────────────┘   │
│                                  │
│ [Buton Acțiune] [Buton Alt]      │
└──────────────────────────────────┘
```

### **Table Component**
```
┌─────────────────────────────────────────┐
│ Col1    | Col2      | Col3    | Acțiuni │
├─────────────────────────────────────────┤
│ Val1    | Val2      | Val3    | [Edit] │
│ Val1    | Val2      | Val3    | [Del]  │
│ Val1    | Val2      | Val3    | [View] │
└─────────────────────────────────────────┘
```

### **Form Component**
```
┌─ Formular ─────────────────┐
│                            │
│ [Label] [Input Field]      │
│ [Label] [Input Field]      │
│ [Label] [Select Dropdown]  │
│ [Label] [Textarea]         │
│                            │
│ [Trimite] [Anulează]       │
└────────────────────────────┘
```

---

## Mockup Pagini

### **1. Dashboard**
```
┌─────────────────────────────────────────────────────────┐
│ DASHBOARD - Bine ați venit, Adrian                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│ │Apartamente│ │Chiriași  │ │Facturi   │ │Chirii    │   │
│ │  32      │ │  24      │ │Neplătite │ │Decembrie │   │
│ │          │ │(8 libere)│ │    5     │ │5,450 RON │   │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                         │
│ ┌────────────────────────────────────┐                 │
│ │ Sarcini Întreținere Deschise      │                 │
│ ├─────────────────────────────────────┤                 │
│ │ • Apt 101 - Reparare robinet (Azi) │                 │
│ │ • Apt 203 - Picturi (21 Februarie) │                 │
│ │ • Apt 305 - Schimbare ferestre     │                 │
│ └────────────────────────────────────┘                 │
│                                                         │
│ ┌────────────────────────────────────┐                 │
│ │ Plăți Restante Peste 30 Zile       │                 │
│ ├─────────────────────────────────────┤                 │
│ │ • Apt 105 - 450 RON (Fac. Gaz)    │                 │
│ │ • Apt 201 - 200 RON (Chirie)      │                 │
│ └────────────────────────────────────┘                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### **2. Lista Chiriași**
```
┌─────────────────────────────────────────────────────────┐
│ CHIRIAȘI                    [+ Adaugă Chiriaș Nou]      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Filtru: [Activi ▼] [Căutare... ⌕]                     │
│                                                         │
│ ┌───────────────────────────────────────────────────┐  │
│ │Nume        │Email            │Telefon  │Status │ │  │
│ ├───────────────────────────────────────────────────┤  │
│ │John Doe    │john@email.com   │123456  │Activ  │ │  │
│ │Jane Smith  │jane@email.com   │654321  │Activ  │ │  │
│ │Bob Johnson │bob@email.com    │555555  │Inactiv│ │  │
│ └───────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### **3. Adăugare/Editare Chiriaș**
```
┌─────────────────────────────────────────────────────────┐
│ ADAUGĂ CHIRIAȘ NOU                                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Informații Personale                                   │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Nume: [________________]  Email: [____________] │   │
│ │ Telefon: [________________] Adresă: [________] │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ Detalii Contract                                       │
│ ┌─────────────────────────────────────────────────┐   │
│ │ Data Inceput: [__/__/____]                     │   │
│ │ Data Sfarsit: [__/__/____]                     │   │
│ │ Status: [Activ ▼]                             │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ [Salvează] [Anulează]                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### **4. Modul Facturi**
```
┌─────────────────────────────────────────────────────────┐
│ FACTURI                     [+ Creează Factură Nouă]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Filtru: [Neplătite ▼] [Februarie ▼] [Căutare... ⌕]    │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │Apartament │Tip    │Sumă   │Scadență │Status │Acțiuni││
│ ├─────────────────────────────────────────────────────┤│
│ │Apt 101   │Gaz    │450RON │21.02.25 │Neplătit│[Plată]│
│ │Apt 102   │Apă    │200RON │21.02.25 │Plătit │[View] │
│ │Apt 103   │Curent │320RON │25.02.25 │Neplătit│[Plată]│
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ Total Neîncasat: 770 RON                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### **5. Modul Întreținere**
```
┌─────────────────────────────────────────────────────────┐
│ ÎNTREȚINERE                 [+ Programează Sarcină]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Filtru: [Toate ▼] [Februarie ▼]                        │
│                                                         │
│ ┌─ Planificate ──────────────────────────────────────┐ │
│ │ • [Apt 101] Reparare robinet       01.02.25 Urgent │ │
│ │ • [Apt 203] Curățare aer cond.    05.02.25 Normal │ │
│ └────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─ În Curs ──────────────────────────────────────────┐ │
│ │ • [Apt 305] Picturi interior       15.02.25 Normal │ │
│ └────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─ Finalizate ──────────────────────────────────────┐ │
│ │ • [Apt 402] Schimbare ferestre    28.01.25 Normal │ │
│ └────────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### **6. Modul Documente**
```
┌─────────────────────────────────────────────────────────┐
│ DOCUMENTE                   [+ Încarcă Document Nou]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Filtru: [Toate tipurile ▼] [Căutare... ⌕]             │
│                                                         │
│ ┌─ CONTRACTE ─────────────────────────────────────────┐│
│ │ 📄 Contract_Apt101_2023.pdf  [Descarcă] [Șterge] │  │
│ │ 📄 Contract_Apt102_2024.pdf  [Descarcă] [Șterge] │  │
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─ ACTE ────────────────────────────────────────────────┐│
│ │ 📄 Actul_Proprietate_2022.pdf [Descarcă] [Șterge]   │  │
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─ ALTELE ──────────────────────────────────────────────┐│
│ │ 📄 Vers_Coabitare_2024.pdf   [Descarcă] [Șterge]  │  │
│ └─────────────────────────────────────────────────────┘│
│                                                         │
└─────────────────────────────────────────────────────────┘
```

