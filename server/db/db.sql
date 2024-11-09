create database pet;
use pet;

create table client(
	id int primary key auto_increment,
    name varchar(255) not null,
    cellphone varchar(15) not null,
    cep varchar(8) not null
);

create table pet(
	id int primary key auto_increment,
    name varchar(255) not null,
    age int,
    specie varchar(255) not null,
    client_id int not null,
    foreign key (client_id) references client(id)
);