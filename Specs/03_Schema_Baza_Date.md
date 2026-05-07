# 3. Schema Bazei deDate

## Tabele Principale și Relații

### **Tabelul: TENANTS (Chiriași)**
```
tenants
├── id (INT, Primary Key)
├── nume (VARCHAR 255)
├── email (VARCHAR 255)
├── telefon (VARCHAR 20)
├── adresa_personala (VARCHAR 500)
├── data_inceput_contract (DATE)
├── data_sfarsit_contract (DATE)
├── status (ENUM: 'activ', 'inactiv')
├── referinte_plati (TEXT)
└── data_inregistrare (TIMESTAMP)
```

---

### **Tabelul: APARTMENTS (Apartamente)**
```
apartments
├── id (INT, Primary Key)
├── adresa (VARCHAR 500)
├── numar_apartament (VARCHAR 20)
├── suprafata (DECIMAL 10,2)
├── numar_camere (INT)
├── etaj (INT)
├── tenant_id (INT, Foreign Key → tenants.id)
├── status (ENUM: 'liber', 'ocupat')
├── numar_urgenta (VARCHAR 20)
├── note_speciale (TEXT)
└── data_inregistrare (TIMESTAMP)
```

---

### **Tabelul: INVOICES (Facturi)**
```
invoices
├── id (INT, Primary Key)
├── apartment_id (INT, Foreign Key → apartments.id)
├── tip_factură (VARCHAR 50: utilități/servicii)
├── suma (DECIMAL 10,2)
├── data_scadentă (DATE)
├── data_plații (DATE, nullable)
├── status (ENUM: 'neplătit', 'parțial', 'plătit')
├── descriere (TEXT)
└── data_creare (TIMESTAMP)
```

---

### **Tabelul: RENTS (Chirii)**
```
rents
├── id (INT, Primary Key)
├── apartment_id (INT, Foreign Key → apartments.id)
├── tenant_id (INT, Foreign Key → tenants.id)
├── luna (DATE)
├── suma_chirie (DECIMAL 10,2)
├── data_scadentă (DATE)
├── data_plații (DATE, nullable)
├── status (ENUM: 'neplătit', 'parțial', 'plătit')
└── date_plății (TIMESTAMP)
```

---

### **Tabelul: MAINTENANCE (Întreținere)**
```
maintenance
├── id (INT, Primary Key)
├── apartment_id (INT, Foreign Key → apartments.id)
├── descriere (TEXT)
├── data_programata (DATE)
├── status (ENUM: 'planificat', 'în curs', 'finalizat')
├── responsabil (VARCHAR 255)
├── cost_estimat (DECIMAL 10,2)
├── cost_real (DECIMAL 10,2, nullable)
├── prioritate (ENUM: 'joasă', 'medie', 'înaltă')
└── data_creare (TIMESTAMP)
```

---

### **Tabelul: DOCUMENTS (Documente)**
```
documents
├── id (INT, Primary Key)
├── apartment_id (INT, Foreign Key → apartments.id)
├── tip_document (VARCHAR 100: contract/act/verso/altele)
├── nume_fisier (VARCHAR 255)
├── path_fisier (VARCHAR 500)
├── data_upload (TIMESTAMP)
├── data_expirare (DATE, nullable)
├── descriere (TEXT)
└── versiune (INT)
```

---

## Relații între Tabele

```
TENANTS (1) ──→ (Many) APARTMENTS
TENANTS (1) ──→ (Many) RENTS
APARTMENTS (1) ──→ (Many) INVOICES
APARTMENTS (1) ──→ (Many) RENTS
APARTMENTS (1) ──→ (Many) MAINTENANCE
APARTMENTS (1) ──→ (Many) DOCUMENTS
```

