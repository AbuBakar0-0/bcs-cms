create table practice_profile (
    uuid uuid primary key default gen_random_uuid(),
    type varchar(100),
    type_of_service_provided varchar(255),
    credentialing_type varchar(100),
    npi_2 varchar(10),
    tax_id varchar(20),
    legal_business_name varchar(255),
    doing_business_name varchar(255),
    taxonomy_code_1 varchar(20),
    taxonomy_code_2 varchar(20),
    
    service_address_id uuid references addresses(uuid),
    service_contact_id uuid references contacts(uuid),
    mailing_address_id uuid references addresses(uuid),
    mailing_contact_id uuid references contacts(uuid),
    correspondence_address_id uuid references addresses(uuid),
    correspondence_contact_id uuid references contacts(uuid),
    
    ptan_medicare_number varchar(50),
    medicaid_number varchar(50),
    
    start_date date,

    
    practice_contact_id uuid references contacts(uuid)
);

create table practice_location (
    uuid uuid primary key default gen_random_uuid(),
    legal_business_name varchar(255),
    doing_business_name varchar(255),
    npi_2 varchar(10),
    tax_id varchar(20),
    taxonomy_code_1 varchar(20),
    taxonomy_code_2 varchar(20),
    
    
    service_address_id uuid references addresses(uuid),
    service_contact_id uuid references contacts(uuid),
    mailing_address_id uuid references addresses(uuid),
    mailing_contact_id uuid references contacts(uuid),
    correspondence_address_id uuid references addresses(uuid),
    correspondence_contact_id uuid references contacts(uuid),
    
    
    ptan_medicare_number varchar(50),
    medicaid_number varchar(50),
    
    start_date date,
   
    
    practice_contact_id uuid references contacts(uuid)
);
create table payer_setup (
    uuid uuid primary key default gen_random_uuid(),
    state VARCHAR NOT NULL CHECK (state ~ '^[A-Z]{2}$'), 
    plan_type varchar NOT NULL,
    business varchar NOT NULL,
    provider varchar NOT NULL,
    payer_name varchar NOT NULL,
    status varchar NOT NULL,
    date DATE NOT NULL,
    notes text NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);