CREATE TYPE role_type AS ENUM ('passenger', 'admin');

CREATE TYPE status_type AS ENUM ('failed', 'in-progress', 'success');

CREATE TYPE class_type AS ENUM (
    'first-class',
    'business-class',
    'economy-class'
);

CREATE TABLE
    IF NOT EXISTS passenger(
        id SERIAL PRIMARY KEY,
        google_id VARCHAR(50) UNIQUE,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT,
        roles role_type NOT NULL DEFAULT 'passenger',
        created_at DATE NOT NULL DEFAULT NOW()
    );

CREATE TABLE
    IF NOT EXISTS departure_terminal(
        id SERIAL PRIMARY KEY,
        airport_code INTEGER UNIQUE NOT NULL,
        airport_name VARCHAR(100) NOT NULL,
        city VARCHAR(50) NOT NULL,
        country VARCHAR(50) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS arrival_terminal(
        id SERIAL PRIMARY KEY,
        airport_code INTEGER UNIQUE NOT NULL,
        airport_name VARCHAR(100) NOT NULL,
        city VARCHAR(50) NOT NULL,
        country VARCHAR(50) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS flight(
        id SERIAL PRIMARY KEY,
        departure_terminal_id INTEGER NOT NULL,
        arrival_terminal_id INTEGER NOT NULL,
        flight_type VARCHAR(20) NOT NULL,
        departure_date_time TIMESTAMP NOT NULL,
        arrival_date_time TIMESTAMP NOT NULL,
        available_seats_first_class INTEGER NOT NULL,
        price_first_class INTEGER NOT NULL,
        available_seats_business_class INTEGER NOT NULL,
        price_business_class INTEGER NOT NULL,
        available_seats_economy_class INTEGER NOT NULL,
        price_economy_class INTEGER NOT NULL,
        FOREIGN KEY (departure_terminal_id) REFERENCES departure_terminal(id),
        FOREIGN KEY (arrival_terminal_id) REFERENCES arrival_terminal(id)
    );

CREATE TABLE
    IF NOT EXISTS booking(
        id SERIAL PRIMARY KEY,
        flight_id INTEGER NOT NULL,
        passenger_id INTEGER NOT NULL,
        flight_class class_type NOT NULL,
        number_of_seats INTEGER NOT NULL,
        seat_number VARCHAR(20) UNIQUE NOT NULL,
        date_time TIMESTAMP NOT NULL DEFAULT NOW(),
        is_cancelled BOOLEAN NOT NULL DEFAULT false,
        FOREIGN KEY (flight_id) REFERENCES flight(id),
        FOREIGN KEY (passenger_id) REFERENCES passenger(id)
    );

CREATE TABLE
    IF NOT EXISTS payment(
        id SERIAL PRIMARY KEY,
        booking_id INTEGER NOT NULL,
        passenger_id INTEGER NOT NULL,
        payment_ref VARCHAR(50) NOT NULL,
        amount INTEGER NOT NULL,
        payment_status status_type NOT NULL DEFAULT 'in-progress',
        payment_date_time TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (booking_id) REFERENCES booking(id),
        FOREIGN KEY (passenger_id) REFERENCES passenger(id)
    )