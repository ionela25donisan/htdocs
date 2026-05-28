# 01 — Prezentare Generală

## Titlu proiect
**RentalHub** — Sistem de Gestiune Integrată a Proprietăților Imobiliare

## Descriere
RentalHub este o aplicație web single-page (SPA) pentru administratori și agenți imobiliari, care permite gestionarea completă a unui portofoliu de proprietăți: apartamente, vile, studiouri, garsoniere și case. Aplicația acoperă trei fluxuri principale — **închiriere**, **vânzare** și **cumpărare** — și integrează module de contracte, plăți, chiriași și mentenanță.

## Obiective principale
- Centralizarea tuturor proprietăților dintr-un portofoliu într-o singură interfață
- Gestionarea chiriașilor și cumpărătorilor (prospecți și activi)
- Urmărirea contractelor de închiriere și vânzare-cumpărare, cu alerte de expirare
- Evidența financiară: chirii, garanții, tranzacții de vânzare, utilități
- Publicarea și gestionarea anunțurilor imobiliare (de închiriat / de vânzare / cereri cumpărare)
- Planificarea și urmărirea intervențiilor de mentenanță

## Tehnologii folosite
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Stocare date**: `localStorage` (browser) — fără backend obligatoriu
- **Backend opțional**: PHP 8+, MySQL 8+ (prin `api/data.php` și `api/db.php`)
- **Fonturi**: Google Fonts (Playfair Display + DM Sans)
- **Deployment**: orice server web static sau LAMP/LEMP stack

## Structura fișierelor principale
```
/
├── index.html              # Landing page / entry point
├── RentalHub.html          # Aplicația completă (SPA)
├── desktop.php             # Versiune desktop (legacy)
├── mobile.html             # Versiune mobilă (legacy)
├── api/
│   ├── config.php          # Configurare conexiune DB
│   ├── db.php              # Inițializare PDO
│   └── data.php            # API REST: CRUD entități
├── create_database.sql     # Script creare bază de date MySQL
├── Specs/                  # Documentație planificare
└── memory-bank/            # Context și decizii arhitecturale
```

## Public țintă
- Administratori de blocuri și asociații de proprietari
- Agenți și agenții imobiliare mici și medii
- Proprietari privați cu mai multe unități locative
- Investitori imobiliari care gestionează un portofoliu

## Versiune curentă
`v1.0.0` — Aplicație funcțională completă, date persistate în localStorage, API PHP opțional.