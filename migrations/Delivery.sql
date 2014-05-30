create table dev_Delivery (
	id char(36) default lower(newid()) not null, 
	status int not null,
	createdAt datetime,
	updatedAt datetime
);

alter table dev_Delivery add primary key(id);