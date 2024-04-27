CREATE TABLE movie(
    ID SERIAL PRIMARY KEY,
    original_title varchar(255),
    title varchar(50),
    release_date varchar(100),
    poster_path varchar(50),
    overview varchar(100),
    commints varchar(250)
);
