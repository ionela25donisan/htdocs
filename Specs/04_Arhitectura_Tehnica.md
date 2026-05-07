# 4. Arhitectură Tehnică și Structura Proiectului

## Stack Tehnologic

### **Frontend**
- **HTML5** - Structura și conținut semantic
- **CSS3** - Styling responsiv (Flexbox, Grid)
- **JavaScript** (Vanilla) - Interactivitate, AJAX, manipulare DOM
- **Lucru local** - Fără dependență de framework-uri externe

### **Backend**
- **PHP 7+** - Server-side logic și procesare
- **Sessions PHP** - Gestionare utilizatori

### **Bază de Date**
- **MySQL 5.7+** - Stocarea datelor relaționale

### **Server**
- **Apache (XAMPP)** - HTTP Server
- **Protocol HTTP** - Comunicare client-server

---

## Structura Foldere Proiect

```
c:\xampp1\htdocs\
│
├── index.php                    # Pagina de intrare / Dashboard
├── index.html                   # Interfață vizuală planificare
│
├── css/
│   ├── style.css               # Styling principal
│   ├── dashboard.css           # Styling dashboard
│   └── responsive.css          # Media queries
│
├── js/
│   ├── script.js               # JavaScript principal
│   ├── dashboard.js            # Logica dashboard
│   ├── tenants.js              # Logica modul chiriași
│   ├── invoices.js             # Logica modul facturi
│   ├── rents.js                # Logica modul chirii
│   ├── maintenance.js          # Logica modul întreținere
│   └── documents.js            # Logica modul documente
│
├── php/
│   ├── db.php                  # Configurare și conexiune bază de date
│   ├── functions.php           # Funcții globale
│   ├── tenants.php             # CRUD operații chiriași
│   ├── apartments.php          # CRUD operații apartamente
│   ├── invoices.php            # CRUD operații facturi
│   ├── rents.php               # CRUD operații chirii
│   ├── maintenance.php         # CRUD operații întreținere
│   └── documents.php           # CRUD operații documente
│
├── templates/
│   ├── header.php              # Antet comun
│   ├── footer.php              # Subsol comun
│   ├── navbar.php              # Bară navigare
│   └── sidebar.php             # Bară laterală
│
├── uploads/                    # Folder pentru documente încărcate
│   └── documents/              # Documente utilizator
│
├── api/
│   ├── tenants_api.php         # API endpoints chiriași
│   ├── apartments_api.php      # API endpoints apartamente
│   ├── invoices_api.php        # API endpoints facturi
│   ├── rents_api.php           # API endpoints chirii
│   ├── maintenance_api.php     # API endpoints întreținere
│   └── documents_api.php       # API endpoints documente
│
├── config/
│   ├── config.php              # Configurări globale
│   └── constants.php           # Constante proiect
│
├── Specs/                      # Specificații proiect
│   ├── 01_Prezentare_Generala.md
│   ├── 02_Functionalitati_Moduli.md
│   ├── 03_Schema_Baza_Date.md
│   ├── 04_Arhitectura_Tehnica.md
│   ├── 05_Flux_Utilizator.md
│   └── 06_Mockup_UI.md
│
└── database/
    └── init.sql                # Script inițializare bază de date
```

---

## Principii de Arhitectură

### **Separarea Responsabilităților**
- Logică afacere în PHP backend
- Prezentare în HTML/CSS frontend
- Interactivitate în JavaScript

### **Modularitate**
- Fiecare modul independent și reutilizabil
- API endpoints pentru fiecare funcționalitate

### **Securitate**
- Input validation pe ambele niveluri
- Prepared statements pentru SQL queries
- Protecție CSRF
- Sanitizare outputuri

### **Performance**
- Lazy loading pentru imagini
- Caching CSS/JS
- Optimizare queries bază de date
- Compresie fișiere

