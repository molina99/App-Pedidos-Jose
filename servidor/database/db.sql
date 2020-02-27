create table personas(
  id serial primary key,
  nombre varchar(150),
  correo varchar(150)
);

create table menus(
  id serial primary key,
  nombre varchar(50),
  foto text,
  descripcion varchar(255),
  precio integer,
  fecha varchar(100)
);

create table pedidos(
  id serial primary key,
  idpersona integer,
  idmenu integer,
  cantidad integer,
  foreign key (idpersona) references personas(id),
  foreign key (idmenu) references menus(id)
);

insert into personas(nombre, correo) values('Jose', 'jose@gmail.com');