# 02 — Funcționalități și Module

## Arhitectura modulară

Aplicația este organizată în **7 module principale**, accesibile din bara de navigare superioară. Fiecare modul are operații complete CRUD (Creare, Citire, Actualizare, Ștergere).

---

## Modul 1 — Dashboard

**Scop**: vizualizare rapidă a stării întregului portofoliu.

### Funcționalități:
- **Statistici live** (6 carduri):
  - Total apartamente și câte sunt libere
  - Chiriași activi
  - Proprietăți de vânzare
  - Contracte active / expirate
  - Total încasări (RON)
  - Intervenții de mentenanță deschise
- **Apartamente recente** — ultimele 4 adăugate
- **Plăți recente** — ultimele 5 tranzacții, sortate descrescător
- **Alerte contracte** — contracte expirate sau care expiră în 60 de zile

---

## Modul 2 — Apartamente

**Scop**: gestionarea completă a portofoliului de proprietăți.

### Câmpuri proprietate:
| Câmp | Tip | Obligatoriu |
|------|-----|-------------|
| Adresă completă | Text | ✅ |
| Tip proprietate | Select (Apartament, Studio, Garsonieră, Vilă, Casă) | ✅ |
| Nr. camere | Număr | — |
| Suprafață (mp) | Număr | — |
| Etaj | Text | — |
| An construcție | Număr | — |
| Status | Select | ✅ |
| Chirie lunară (RON) | Număr | — |
| Preț vânzare (RON) | Număr | — |
| Dotări / Facilități | Text | — |
| Observații | Textarea | — |

### Statusuri posibile:
- `Liber` — disponibil pentru închiriere
- `Ocupat` — chiriaș activ
- `De vânzare` — listat pentru vânzare
- `Rezervat` — rezervat de un potențial chiriaș/cumpărător
- `În mentenanță` — temporar indisponibil
- `Vândut` — tranzacție finalizată
- `Închiriat` — contract de închiriere activ

### Filtre disponibile:
- Căutare text (adresă)
- Filtru după status
- Filtru după tip proprietate

---

## Modul 3 — Chiriași

**Scop**: evidența persoanelor care închiriază sau sunt prospecți de cumpărare.

### Câmpuri:
| Câmp | Tip | Obligatoriu |
|------|-----|-------------|
| Prenume | Text | ✅ |
| Nume | Text | ✅ |
| Email | Email | ✅ |
| Telefon | Tel | — |
| CNP | Text (13 cifre) | — |
| Apartament asociat | Select (din lista apartamentelor) | — |
| Status | Select | ✅ |
| Note | Textarea | — |

### Statusuri:
- `Activ` — chiriaș cu contract curent
- `Inactiv` — contract expirat/reziliat
- `Prospect` — interesat, fără contract

### Securitate:
- CNP-ul este afișat mascat în tabel (`●●●XXXX` — ultimele 4 cifre vizibile)

---

## Modul 4 — Contracte

**Scop**: gestionarea contractelor de închiriere și vânzare-cumpărare.

### Tipuri de contracte:
- `Închiriere` — contract standard de locațiune
- `Vânzare-Cumpărare` — act de vânzare imobiliară
- `Subînchiriere` — re-închiriere cu acordul proprietarului
- `Opțiune cumpărare` — precontract cu opțiune de cumpărare

### Câmpuri:
| Câmp | Tip | Obligatoriu |
|------|-----|-------------|
| Apartament | Select | ✅ |
| Chiriaș / Cumpărător | Select | — |
| Tip contract | Select | ✅ |
| Nr. contract | Text | — |
| Data început | Date | ✅ |
| Data expirare | Date | — |
| Valoare contract (RON) | Număr | — |
| Garanție (RON) | Număr | — |
| Status | Select | ✅ |
| Clauze / Note | Textarea | — |

### Sistem alerte:
- ⚠️ Alert roșu: contracte cu data expirării < azi și status `Activ`
- ⏰ Alert albastru: contracte care expiră în mai puțin de 30 de zile
- Dashboard afișează alerte pentru contracte în 60 de zile

---

## Modul 5 — Plăți

**Scop**: evidența financiară completă.

### Tipuri de plăți:
- `Chirie` — plată lunară de la chiriaș
- `Utilități` — apă, gaz, curent, întreținere
- `Tranzacție vânzare` — avans sau plată integrală vânzare
- `Garanție` — depozit de garanție la intrare
- `Comision` — comision agentie
- `Altele` — alte tipuri de plăți

### Metode de plată:
Transfer bancar, Numerar, Card, Cec, Altele

### Sumar financiar (4 carduri):
- Total încasări
- Total chirii
- Total tranzacții vânzare
- Altele (garanții, comisioane, utilități)

### Filtre:
- Căutare text
- Filtru după tip plată
- Filtru după lună/an (dinamic, din datele existente)

---

## Modul 6 — Anunțuri

**Scop**: publicarea și gestionarea anunțurilor imobiliare.

### Tipuri de anunțuri:
| Tip | Scop | Badge culoare |
|-----|------|---------------|
| `Închiriere` | Proprietar caută chiriaș | Mov |
| `Vânzare` | Proprietar vinde | Auriu |
| `Cumpărare` | Cerere de cumpărare de la client | Albastru |

### Câmpuri anunț:
| Câmp | Detalii |
|------|---------|
| Adresă / Titlu | Titlul anunțului |
| Tip anunț | Închiriere / Vânzare / Cumpărare |
| Nr. camere | Număr |
| Suprafață (mp) | Număr |
| Etaj | Text |
| Preț (RON) | Număr |
| Negociabil | Da / Nu |
| Status anunț | Activ / Rezervat / Vândut / Închiriat / Retras |
| Descriere | Textarea (afișat trunchiat în card) |
| Dotări | Text (separate prin virgulă, afișate ca badge-uri) |

### UI: grid de carduri vizuale
- Imagine placeholder cu emoji și badge tip
- Metadata (camere, mp, etaj)
- Badge-uri dotări
- Descriere trunchiată
- Preț mare, vizibil
- Indicator "Preț negociabil"
- Status chip colorat

---

## Modul 7 — Mentenanță

**Scop**: planificarea și urmărirea intervențiilor tehnice.

### Câmpuri:
| Câmp | Detalii |
|------|---------|
| Apartament | Select din lista apartamentelor |
| Data programare | Date |
| Descriere | Text obligatoriu |
| Prioritate | Scăzută / Medie / Ridicată / Urgentă |
| Status | Programat / În desfășurare / Finalizat / Anulat |
| Cost estimat (RON) | Număr |
| Furnizor / Executant | Text |
| Note | Textarea |

### Sortare automată:
Intervențiile sunt sortate după prioritate: `Urgentă → Ridicată → Medie → Scăzută`.

### Culori prioritate:
- 🔴 `Urgentă` — roșu
- 🟡 `Ridicată` — auriu
- 🔵 `Medie` — albastru
- 🟢 `Scăzută` — verde

---

## Funcționalități transversale

### Persistare date
- Toate datele sunt salvate în `localStorage` cu cheile prefixate `rh_*`
- La prima pornire se încarcă **date demo** (4 apartamente, 2 chiriași, 2 contracte, 3 plăți, 4 anunțuri, 2 intervenții)

### Notificări Toast
- Feedback vizual pentru fiecare operație (adăugare, editare, ștergere)
- 3 tipuri: neutru (negru), success (verde), error (roșu)
- Dispare automat după 3 secunde

### Confirmări ștergere
- Orice ștergere necesită confirmare prin `confirm()` browser

### Contoare navigare
- Fiecare tab din nav afișează numărul de înregistrări active
- Mentenanța afișează doar intervențiile ne-finalizate / ne-anulate