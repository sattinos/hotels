Delete
FROM public.user_entity;

ALTER SEQUENCE user_entity_id_seq RESTART WITH 1;

INSERT INTO public.user_entity(
	"fullName", "userName", password, phone, filename)
	VALUES ('Patrick John', 'pat', '123', '0512345678', '/users/user-01.png');

Delete
FROM public.menu_item_entity;

ALTER SEQUENCE menu_item_entity_id_seq RESTART WITH 1;

INSERT INTO public.menu_item_entity(
	"uID", name, "className", "to", "parentuID", entity, "createPath", "updatePath", "deletePath"
)
	VALUES 
		('co', 'Core', 'menu', null, null, null, null, null, null),
		('se', 'System Entities', 'menu', null, null, null, null, null, null),
		('tr', 'Tracking', 'menu', null, null, null, null, null, null),
		
		('9ac56bda-838b-4dcc-bad1-69568aae9994', 'Bed', 'menuItem', '/admin/va-bed', 'se', 0, '/beds', null, null),
		('19dc5102-6a86-4ca2-8e03-c0505956f6ec', 'Room', 'menuItem', '/admin/va-room', 'se', 1, '/rooms', null, null),
        ('0106b37d-ec7b-4097-a272-08ae9b497014', 'Flat Type', 'menuItem', '/admin/va-flatType', 'se', 2, '/flat-type', null, null),
		
        ('235c67a3-c4c2-420b-9b8a-f28b32cd696a', 'Reservation', 'menuItem', '/admin/va-reservation', 'se', 3, '/reservations', null, null),
        ('702fb3a6-8e1b-446b-b915-d4a679d157ee', 'Reserved Flat', 'menuItem', '/admin/va-reservedFlat', 'se', 4, '/reserved-flat', null, null),
        ('377fca35-c935-493f-942e-c90c904035d7', 'Flat Availability', 'menuItem', '/admin/flat-availability', 'se', 4, null, null, null),
		
        ('13a9556f-8202-4bc5-9faa-301085ec42b6', 'Localization', 'menuItem', '/admin/va-localization', 'co', 4, null, null, null),
        ('e08f2a9c-98b2-4ca3-bccd-2660e0ab37a5', 'Reservation Log', 'menuItem', '/admin/va-reservationLog', 'tr', 4, null, null, null)
		;
		
INSERT INTO public.user_entity_menus_menu_item_entity(
	"userEntityId", "menuItemEntityId")
	VALUES (1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 5),
	(1, 6),
	(1, 7),
	(1, 8),
	(1, 9),
	(1, 10),
	(1, 11);
	
-- Seeding Images	
Delete
From public.file_meta_info;

ALTER SEQUENCE file_meta_info_id_seq RESTART WITH 1;

INSERT INTO public.file_meta_info(id, encoding, mimetype, size, path)
	VALUES (1, '7bit', 'image/png', 35178, '/users/user-01.png'),
		   (2, '7bit', 'image/png', 24862, '/users/user-02.png'),
	       (3, '7bit', 'image/png', 46295, '/users/user-03.png'),
	       (4, '7bit', 'image/png', 76391, '/users/user-04.png'),
		   
		   (5, '7bit', 'image/jpg', 90721, '/beds/single.jpg'),
		   (6, '7bit', 'image/jpg', 17374, '/beds/double.jpg'),
		   (7, '7bit', 'image/jpg', 48676, '/beds/king-size.jpg'),
		   
		   (8, '7bit', 'image/jpg', 63590, '/beds/king-size-leather.jpg'),
		   (9, '7bit', 'image/jpg', 37829, '/beds/king-size-modern.jpg'),
		   (10, '7bit', 'image/jpg', 26637, '/beds/king-size-wooden.jpg'),
		   
		   (11, '7bit', 'image/jpg', 42863, '/beds/single-dark.jpg'),		   
		   (12, '7bit', 'image/jpg', 20227, '/beds/single-double-floor.jpg');


-- Seeding Beds
Delete
From public.bed_entity;

ALTER SEQUENCE bed_entity_id_seq RESTART WITH 1;

INSERT INTO public.bed_entity(name, filenames, type, description)
	VALUES ('Single Bed', '/beds/single.jpg', 0, 'Single Bed description here'),
		   ('Single Dark Bed', '/beds/single-dark.jpg', 0, 'Single dark bed description here'),
		   ('Single Double Floor Bed', '/beds/single-double-floor.jpg', 0, 'Single double floor bed description here'),
		   
		   ('Double Bed', '/beds/double.jpg', 1, 'Double bed description here'),		   
		   
		   ('King Size Bed', '/beds/king-size.jpg', 2, 'King size bed description here'),
		   ('King Size Leather Bed', '/beds/king-size-leather.jpg', 2, 'King size leather bed description here'),
		   ('King Size Modern Bed', '/beds/king-size-modern.jpg', 2, 'King size modern bed description here'),
		   ('King Size Wooden Bed', '/beds/king-size-wooden.jpg', 2, 'King size wooden bed description here');


-- Seeding Rooms
Delete
From public.room_entity;

ALTER SEQUENCE room_entity_id_seq RESTART WITH 1;

INSERT INTO public.room_entity(
	name, type, "bedsIDs", description)
	VALUES ('Bedroom', 0, '1, 2', 'Bedroom description here'),
	       ('Living Room', 1, '1, 2', 'Living room description here'),	
	       ('Bathroom', 2, '1, 2', 'Bathroom description here'),
	       ('Kitchen', 3, '', 'Kitchen description here');
Delete
from public.reserved_flat_entity;

Delete
from public.flat_entity;

Delete
From public.flat_type_entity;

ALTER SEQUENCE flat_type_entity_id_seq RESTART WITH 1;

INSERT INTO public.flat_type_entity(
	name, description, count, price, type, images, area)
	VALUES ('Small Studio', 'Small Studio description here', 10, 150, 's', '/flat-type/01.jpg,/flat-type/02.jpg', 40),
	       ('Medium Studio', 'Medium Studio description here', 40, 200, 'm', '/flat-type/03.jpg,/flat-type/04.jpg', 80),	
	       ('Spacious Studio', 'Spacious Studio description here', 10, 300, 'l', '/flat-type/05.jpg,/flat-type/06.jpg', 160);

ALTER SEQUENCE flat_entity_id_seq RESTART WITH 1;

do $$
declare
   counter integer := 0;
begin
	loop 
		INSERT INTO public.flat_entity("typeId")
		VALUES (1);
		exit when counter = 10;
		counter := counter + 1;
	end loop;
end; $$
