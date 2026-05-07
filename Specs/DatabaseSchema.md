# Database Schema

## Tables

- tenants (id, name, email, phone, lease_start, lease_end)
- apartments (id, address, tenant_id)
- invoices (id, apartment_id, amount, due_date, paid)
- rents (id, apartment_id, amount, paid_date)
- maintenance (id, apartment_id, description, status, date)
- documents (id, name, type, file_path, apartment_id)