# AutoDock Apartments – Plan de Proiect

## Cuprins

1. Scopul aplicatiei
2. Obiective
3. Tipuri de utilizatori
4. Functionalitati principale
5. User stories
6. Cerinte functionale
7. Flow-uri
8. Model de date
9. Cerinte pentru designer
10. Cerinte non-functionale
11. Criterii de testare

---

## Scopul aplicatiei

AutoDock Apartments este o aplicatie web destinata gestionarii unui portofoliu de apartamente. Scopul principal este centralizarea informatiilor despre apartamente, chiriasi, contracte, plati, mentenanta si notificari, intr-un singur sistem intuitiv si usor de utilizat.

Aplicatia permite monitorizarea statusului fiecarui apartament, gestionarea chiriasilor, evidenta platilor si prevenirea situatiilor critice precum expirarea contractelor sau neplata la timp.

## Obiective

### Obiectiv general

Dezvoltarea unei aplicatii web care sa permita administrarea eficienta si centralizata a unui portofoliu de apartamente.

### Obiective specifice

- Centralizarea datelor – toate informatiile despre apartamente, chiriasi si contracte intr-un singur loc.
- Monitorizarea statusului – vizualizarea rapida a apartamentelor ocupate, libere sau in mentenanta.
- Gestionarea platilor – evidenta chiriei, utilitatilor si istoricul platilor.
- Prevenirea expirarii contractelor – notificari automate.
- Usurinta in utilizare – interfata intuitiva, accesibila pentru utilizatori fara experienta tehnica.

## Tipuri de utilizatori

### Manager

Drepturi:

- adauga / editeaza / sterge:
  - apartamente
  - chiriasi
  - contracte
  - plati
  - interventii mentenanta
- creeaza programari in calendar (mentenanta)
- vede dashboard complet
- foloseste search & filtre

### Utilizator

Drepturi:

- vizualizeaza:
  - apartamente
  - chiriasi
  - contracte
  - plati
  - mentenanta
- vede dashboard
- foloseste search & filtre

Restrictii:

- NU poate adauga / edita / sterge

## Functionalitati principale

### Gestiune apartamente

- adaugare apartament
- editare informatii
- stergere
- vizualizare lista
- vizualizare detalii (adresa, suprafata, camere, status)
- setare status (liber / ocupat / in mentenanta)

### Gestiune chiriasi

- adaugare chirias
- editare / stergere chirias
- vizualizare lista chiriasi
- asociere chirias–apartament
- vizualizare istoric chiriasi

### Contracte

- adaugare contract
- editare contract
- stergere contract
- afisare data expirare
- notificari expirare

### Plati

- inregistrare plata chirie
- inregistrare utilitati
- vizualizare istoric plati
- totaluri si restante

### Mentenanta

- adaugare interventie
- editare / stergere
- vizualizare lista interventii
- setare status (programat / in desfasurare / finalizat)
- costuri mentenanta

### Calendar mentenanta

- afisare programari in format calendar
- adaugare programare direct din calendar
- codare vizuala pe culori

### Search si filtre

- cautare dupa: adresa, chirias, status
- filtrare dupa: apartamente libere, contracte expirate, restante

### Dashboard

- numar total apartamente
- apartamente libere / ocupate
- numar chiriasi
- restante si plati efectuate
- costuri mentenanta

## User stories

### Dashboard & overview

- Ca manager, vreau sa vad rapid statusul apartamentelor.
- Ca utilizator, vreau sa vad alerte pentru contracte expirate.

### Gestiune chiriasi

- Ca manager, vreau sa asociez un chirias unui apartament.
- Ca utilizator, vreau sa vad cine locuieste intr-un apartament.

### Contracte

- Ca manager, vreau sa adaug contracte si sa primesc notificari la expirare.
- Ca utilizator, vreau sa vad perioada contractului.

### Plati

- Ca manager, vreau sa inregistrez plati si restante.
- Ca utilizator, vreau sa vad istoricul platilor.

### Mentenanta

- Ca manager, vreau sa programez interventii.
- Ca utilizator, vreau sa vad istoricul mentenantei.

### Search & filtre

- Ca utilizator, vreau sa caut rapid un apartament dupa adresa.
- Ca utilizator, vreau sa filtrez apartamentele libere.

## Cerinte functionale

### Autentificare

- CF1. Autentificare utilizator
- CF2. Control acces pe roluri

### Gestiune apartamente

- CF3. Adaugare apartament
- CF4. Editare apartament
- CF5. Stergere apartament
- CF6. Vizualizare apartamente

### Gestiune chiriasi

- CF7. Gestionare chiriasi
- CF8. Asociere chirias–apartament

### Contracte

- CF9. Adaugare contract
- CF10. Istoric contracte
- CF11. Notificari expirare

### Plati

- CF12. Inregistrare plati
- CF13. Vizualizare restante

### Mentenanta

- CF14. Programare mentenanta
- CF15. Istoric mentenanta
- CF16. Costuri mentenanta

### Calendar

- CF17. Vizualizare calendar mentenanta

### Search & filtre

- CF18. Cautare si filtrare

### Dashboard

- CF19. Vizualizare dashboard

## Flow-uri principale

### Flow – Adaugare apartament

- Utilizatorul acceseaza modulul „Apartamente”
- Apasa „Adauga apartament”
- Completeaza formularul
- Sistemul valideaza
- Apartamentul este salvat si apare in lista

### Flow – Asociere chirias–apartament

- Acceseaza modulul „Chiriasi”
- Selecteaza chirias
- Alege apartament
- Confirma
- Asocierea devine vizibila

### Flow – Programare mentenanta

- Acceseaza „Calendar Mentenanta”
- Selecteaza data
- Completeaza detalii
- Sistemul salveaza
- Evenimentul apare in calendar

### Flow – Gestionare contracte

- Acceseaza modulul „Contracte”
- Selecteaza apartament
- Adauga contract
- Introduce perioada
- Sistemul salveaza si genereaza notificari

### Flow – Cautare si filtrare

- Acceseaza un modul
- Introduce termen sau filtre
- Sistemul proceseaza
- Afiseaza rezultate relevante

### Flow – Dashboard

- Utilizatorul se autentifica
- Este redirectionat la dashboard
- Sistemul afiseaza statistici si alerte

## Model de date

### Apartament

- id
- adresa
- suprafata
- numar camere
- status (liber / ocupat / mentenanta)

### Chirias

- id
- nume
- prenume
- telefon
- email
- status (activ / inactiv)

### Relatie apartament–chirias

- id_apartament
- id_chirias
- data_inceput
- data_sfarsit

### Contract

- id
- id_apartament
- tip contract
- data inceput
- data expirare

### Plata

- id
- id_apartament
- tip (chirie / utilitati)
- suma
- data plata

### Mentenanta

- id
- id_apartament
- tip interventie
- data programare
- status
- cost

## Cerinte pentru designer

### Principii generale

- interfata simpla si intuitiva
- navigare usoara
- consistenta vizuala
- accent pe claritate

### Dashboard

- grafice simple
- alerte vizibile
- structura aerisita

### Liste

- layout card/table
- butoane actiuni
- status colorat

### Search si filtre

- bara vizibila sus
- filtre clare

### Calendar

- vizualizare lunara/saptamanala
- evenimente colorate
- click pentru detalii

## Cerinte non-functionale

- performanta rapida la incarcare
- interfata responsive
- securitate date utilizator
- compatibilitate browser moderne
- scalabilitate pentru portofolii mai mari

## Criterii de testare

### Autentificare

- acces doar cu login
- rolurile functioneaza corect

### Gestiune apartamente

- adaugare doar cu campuri complete
- stergere corecta
- modificari salvate

### Gestiune chiriasi

- adaugare/editare/stergere corecta
- asociere functionala

### Contracte

- salvare corecta
- notificari la timp

### Plati

- platile sunt salvate corect
- restantele sunt calculate corect

### Mentenanta

- programarile apar in calendar
- status actualizat corect

### Search & filtre

- rezultate corecte
- filtrare functionala

### Dashboard

- statistici calculate corect
- informatii actualizate
