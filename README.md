# 🏠 RentalHub - Sistem de Gestiune Inchirieri Proprietăți

Bun venit la **RentalHub** - o aplicație web completă de gestiune a inchirierilor de proprietăți cu sistem de rezervări și comunicare entre admin și chiriași.

---

## 📋 Cuprins

1. [Caracteristici Principale](#caracteristici-principale)
2. [Cerințe Sistem](#cerințe-sistem)
3. [Instalare și Configurare](#instalare-și-configurare)
4. [Conturi Demo](#conturi-demo)
5. [Ghid Utilizare](#ghid-utilizare)
6. [Structura Aplicației](#structura-aplicației)

---

## ✨ Caracteristici Principale

### 🔐 Sistem de Autentificare Securizat
- Login cu email și parolă
- Parolele criptate cu BCRYPT
- Sesiuni PHP securizate
- Rol-based access control (Admin vs Vizitator)

### 👑 Panou Administrator
- **Portfolio de Proprietăți**: Adăugare, editare, ștergere proprietăți
- **Gestionare Rezervări**: Accept/respinge cereri de rezervare
- **Vizualizare Date Chiriaș**: Telefon, email, mesaje
- **Sistem de Sugestii**: Propune alternative disponibile chiriașilor
- **Rapoarte și Statistici**: Venituri, ocupare, performanță
- **Prevenire Overbooking**: Sistem automat de verificare disponibilitate

### 👤 Interfață Vizitator
- **Exploreaza Portfolio**: Browse proprietăți cu imagini
- **Detalii Complete**: Specificații, utilități, dotări, tarife
- **Sistem de Rezervare**: Cere rezervare cu date și preferințe
- **Gestionare Cereri**: Vezi status, anulează, modifică
- **Pet-Friendly Info**: Afișare tarife suplimentare pentru animale

### 💡 Funcții Avansate
- ✅ Calcul automatic preț
- ✅ Sistem de notificări
- ✅ Galerie de imagini
- ✅ Validare date intelligent
- ✅ Răspuns instant la overbooking
- ✅ UI responsive și intuitiv

---

## 💻 Cerințe Sistem

- **Web Server**: Apache (XAMPP/WAMP/LAMP)
- **PHP**: 7.4+
- **MySQL**: 5.7+
- **Browser**: Chrome, Firefox, Safari, Edge (moderna)
- **Spațiu Disk**: 50 MB minimum

---

## 🚀 Instalare și Configurare

### Pasul 1: Descarcă XAMPP (dacă nu ai deja)
Descarcă de la: https://www.apachefriends.org/

### Pasul 2: Copiază Fișierele
1. Stivează toate fișierele în folder-ul: `C:\xampp\htdocs\rental_app`
2. Asigură-te că folderul `upload_imagini` este gol și cu permisiuni de scriere

### Pasul 3: Pornește XAMPP
1. Deschide XAMPP Control Panel
2. Apasă "Start" la Apache și MySQL
3. Asigură-te că ambele sunt verzi

### Pasul 4: Inițializează Baza de Date
1. Deschide browser: `http://localhost/rental_app/init_db.php`
2. Apasă pe link-ul "Inițializează baza de date"
3. Așteptă mesajul de succes ✅

### Pasul 5: Login
1. Navighează la: `http://localhost/rental_app/login.php`
2. Folosește credențialele din secția [Conturi Demo](#conturi-demo)

---

## 🎭 Conturi Demo

### Cont Administrator
```
Email:    donisan@gmail.com
Parola:   donisan
Rol:      Administrator (acces complet)
```

### Cont Vizitator (Optional)
Poți crea cont nou din pagina de login sau folosi:
```
Email:    vizitator@example.com
Parola:   parola123
Rol:      Vizitator (doar citire + rezervări)
```

---

## 📖 Ghid Utilizare

### Pentru Administrator

#### 1️⃣ Adăugare Proprietate
1. Merge la Dashboard → Portfolio Proprietăți
2. Apasă "➕ Adaugă Proprietate Nouă"
3. Completează:
   - Titlu, tip, locație
   - Preț per noapte
   - Număr paturi, băi, camere, suprafață
   - Utilități și dotări
   - Imagini (opțional)
   - Pet-friendly și tarif animal (dacă e cazul)
4. Apasă "✅ Adaugă Proprietate"

#### 2️⃣ Gestionare Rezervări
1. Merge la Dashboard → Rezervări
2. Vezi cereri în așteptare pe tab-ul "⏳ În Așteptare"
3. Vizualizează detalii chiriaș (telefon, email, mesaj)
4. Acțiuni disponibile:
   - ✅ Acceptă - confiră rezervarea
   - ❌ Respinge - refuză cererea
   - 💡 Sugerează Alternativă - propune altă proprietate

#### 3️⃣ Sistem de Sugestii
1. La o cerere respinsă, apasă "💡 Sugerează Alternativă"
2. Sistemul arată automat proprietăți disponibile în perioada cerută
3. Se calculează automat diferența de preț
4. Selectează proprietate și apasă "✅ Sugerează Aceasta"
5. Chiriașul primește notificare cu alternativa

#### 4️⃣ Vezi Rapoarte
1. Merge la Dashboard → Rapoarte
2. Statistici disponibile:
   - Total proprietăți active
   - Rezervări acceptate
   - Venituri totale
   - Status proprietăți
   - Ultimele 5 rezervări

### Pentru Vizitator

#### 1️⃣ Exploreaza Proprietăți
1. Merge la Dashboard → Exploreaza Proprietăți
2. Vizionează lista cu galerii de imagini
3. Apasă "👀 Vezi Detalii" pentru informații complete

#### 2️⃣ Cere Rezervare
1. Pe pagina detalii proprietate:
   - Selectează data check-in
   - Selectează data check-out
   - Introduceți nr de oaspeți
   - Mesaj opțional (note speciale)
2. Sistemul calculează automat prețul total
3. Apasă "✅ Cere Rezervare"
4. Cererea merge în așteptare cu admin-ul

#### 3️⃣ Gestionare Cereri
1. Merge la Dashboard → Rezervările Mele
2. Vizionează status-ul cererilor:
   - ⏳ În Așteptare
   - ✅ Acceptate
   - ❌ Respinse
   - 🚫 Anulate
3. Puteți anula cereri în așteptare
4. Dacă e respinsă, puteți explora alte proprietăți

#### 4️⃣ Sugestii Alternative
- Dacă cererea e respinsă, admin-ul poate sugera alternativă
- Veți primi notificare cu proprietate alternativă
- Se afișează cu preț și comparație

---

## 📁 Structura Aplicației

```
rental_app/
├── index.html                    # Pagina principală
├── login.php                     # Login/Autentificare
├── init_db.php                   # Setup bază de date
├── config.php                    # Configurări globale
├── logout.php                    # Logout
├── dashboard.php                 # Dashboard principal
│
├── admin/                        # Pagini admin
│   ├── portfolio.php            # Gestiune proprietăți
│   ├── rezervari.php            # Gestiune rezervări
│   ├── sugestii.php             # Sistem sugestii
│   └── rapoarte.php             # Rapoarte & statistici
│
├── vizitator/                    # Pagini vizitator
│   ├── portfolio.php            # Browse proprietăți
│   ├── rezervarile_mele.php     # Meniu rezervări
│   └── profil.php               # Profil utilizator
│
├── upload_imagini/              # Folder pentru imagini (crea gol!)
│   └── [imagini proprietăți]
│
└── Specs/                        # Documentație proiect
    ├── 01_Prezentare_Generala.md
    ├── 02_Functionalitati_Moduli.md
    └── ...
```

---

## 🗄️ Schema Bază de Date

### Tabela: `utilizatori`
```
- id: INT (PRIMARY KEY)
- nume: VARCHAR(100)
- email: VARCHAR(100) UNIQUE
- parola_hash: VARCHAR(255)
- telefon: VARCHAR(20)
- rol: ENUM('admin', 'vizitator')
- data_crearii: TIMESTAMP
```

### Tabela: `proprietati`
```
- id: INT (PRIMARY KEY)
- admin_id: INT (FOREIGN KEY)
- titlu: VARCHAR(200)
- descriere: TEXT
- tip: ENUM('apartament', 'casa', 'penthouse', 'etc')
- locatie: VARCHAR(255)
- pret_noapte: DECIMAL(10, 2)
- camere: INT
- paturi: INT
- bai: INT
- suprafata_mp: INT
- pet_friendly: BOOLEAN
- taxa_pet: DECIMAL(10, 2)
- utilități: TEXT
- dotari: TEXT
- status: ENUM('disponibila', 'ocupata', 'inchisa')
- data_adaugarii: TIMESTAMP
```

### Tabela: `rezervari`
```
- id: INT (PRIMARY KEY)
- proprietate_id: INT (FOREIGN KEY)
- utilizator_id: INT (FOREIGN KEY)
- data_inceput: DATE
- data_sfarsit: DATE
- numar_oaspeti: INT
- status: ENUM('in_asteptare', 'acceptata', 'respinsa', 'anulata')
- pret_total: DECIMAL(10, 2)
- note_clienti: TEXT
- data_crearii: TIMESTAMP
```

---

## 🔧 Troubleshooting

### ❌ "Eroare bază de date"
- Asigură-te că MySQL este pornit
- Verific să fii rulat `init_db.php`
- Resetează credențialele în config.php

### ❌ "Login incorect"
- Email: `donisan@gmail.com` (exact)
- Parola: `donisan` (case-sensitive)
- Șterge cookies și încearcă din nou

### ❌ "Imagini nu se încarcă"
- Verific permisiuni folder `upload_imagini`
- Asigură-te că folderul există
- Încearcă să creezi manual folderul

### ❌ "Proprietatea se ocupă în timp ce o adaug"
- Sistemul nu permite overbooking
- Alege alte date pentru care e disponibilă
- Contactează admin-ul pentru detalii

---

## 🔒 Securitate

- ✅ Parolele criptate cu BCRYPT
- ✅ Sesiuni PHP protejate
- ✅ SQL Injection prevention (prepared statements)
- ✅ XSS Protection (htmlspecialchars)
- ✅ CSRF tokens (implementare recomandată)
- ✅ Validare date pe server

---

## 📞 Suport

Pentru probleme sau sugestii:
1. Contactează admin: `donisan@gmail.com`
2. Verific folder `Specs` pentru documentație detaliată
3. Consultă logurile Apache/MySQL

---

## 📜 Licență

Acest proiect este creat pentru uz personal și educativ.

---

**Versiune:** 1.0  
**Ultima actualizare:** Mai 2024  
**Status:** Operațional ✅

Mult succes cu aplicația! 🚀
