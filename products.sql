DROP TYPE IF EXISTS product_cat;
DROP TYPE IF EXISTS product_type;

CREATE TYPE product_cat AS ENUM( 'accesorii', 'echipament', 'sporturi');
CREATE TYPE product_type AS ENUM('agresive', 'skateboard', 'longboard', 'role', 'snowboard');

CREATE TABLE IF NOT EXISTS products (
   id serial PRIMARY KEY,
   nume TEXT UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   brand VARCHAR(50),
   in_stoc BOOLEAN NOT NULL DEFAULT FALSE,
   magazine_stoc VARCHAR [],
   tva BOOLEAN NOT NULL DEFAULT TRUE,
   tip_produs product_type DEFAULT 'skateboard',
   categorie product_cat DEFAULT 'sporturi',
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);

INSERT into products (nume, descriere, pret, brand, in_stoc, magazine_stoc, tva, tip_produs, categorie, imagine) VALUES 
('Set 4 Roti Agresive GC UR Constellation 64mm/90A black', 'GC a dezvoltat o nouă compoziție a uretanului (ultimate rebound), care are cu 7,1% mai mult rebound în comparație cu roțile CM și este cu 50% mai rezistent la frecare. Set 4 roți GC UR Constellation 64mm/90A pentru role agresive.', 199, 'GROUND CONTROL', True, '{"Bucuresti", "Cluj", "Constanta"}', True, 'agresive', 'accesorii', '1.jpg'),

('Set 4 Roti Agresive GC Henderson II 64mm/90A black', 'GC a dezvoltat o nouă compoziție a uretanului (ultimate rebound), care are cu 7,1% mai mult rebound în comparație cu roțile CM și este cu 50% mai rezistent la frecare. Set 4 roți GC UR Constellation 64mm/90A pentru role agresive.', 179, 'GROUND CONTROL', False, '{}', False, 'agresive', 'accesorii', '2.jpg'),

('Ceara Blunt', 'Ceara Blunt pentru skateboard/trotinete/agresive', 35, 'BLUNT', False, '{}', True, 'skateboard', 'accesorii', '3.jpg'),

('Rulmenti skateboard Birdhouse Abec5 Grey', 'Setul contine 8 rulmenti Abec5 Grey pentru skateboard produsi de catre Birdhouse. Setul include si 4 distantieri de 8mm', 79, 'BIRDHOUSE', True, '{"Bucuresti", "Cluj", "Constanta"}', True, 'skateboard', 'accesorii', '4.jpg'),

('Husa Level pentru protectie lentila ochelari', 'Husa Level pentru protectia ochelarilor de ski si snowboard.', 50, 'LEVEL', True, '{"Cluj"}', False, 'snowboard', 'accesorii', '5.jpg'),

('Set protectii 187 Killer Jr. Black', 'Setul de protectii 187 Killer JR au un profil slim si sunt recomandate pentru sporturile extreme.', 269, '187', False, '{}', True, 'skateboard', 'echipament', '6.jpg'),

('Genunchiere Pro-Tec Street Pad Open Checker', 'Pro-Tec a stabilit un nou standard cu modelele din seria Street. Acestea sunt confectionate din materiale extrem de rezistente, spuma EVA si capace generoase ce acopera complet zona fara a incomoda miscarile.', 169, '', False, '{}', False, 'skateboard', 'echipament', '7.jpg'),

('Protectii pentru incheietura Triple 8 Slide On', 'Protectii pentru incheietura Triple 8 Slide On', 89, 'TRIPLE EIGHT', True, '{"Bucuresti", "Cluj", "Constanta"}', True, 'role', 'echipament', '8.jpg'),

('Casca Bullet Deluxe T35 Matt White', '', 169, 'BULLET', True, '{"Bucuresti", "Cluj", "Constanta"}', False, 'role', 'echipament', '9.jpg'),

('Ulei Bronson High Speed Ceramic', 'Ulei aero-sintetic de precizie, amestecat cu compuși nano ceramici pentru o viteză și protecție împotriva uzurii de neegalat. Protecție superioară pentru suprafețele rulmenților împotriva umezelii, ruginei și coroziunii.', 39, 'BRONSON', True, '{"Bucuresti", "Cluj", "Constanta"}', True, 'longboard', 'echipament', '10.jpg'),

('Skateboard Birdhouse Stage 3 Hawk Birdman Blue 8 inch', 'Stage 3 reprezintă gama de skate-uri de top a Birdhouse, iar modelul Hawk Wings nu face excepție. Deck-ul este realizat din 7 straturi de arțar canadian, lipite între ele cu rășină epoxy pentru durabilitate, iar axele Birdhouse sunt dotate cu roți de 52mm și rulmenți Abec 7.', 449, 'BIRDHOUSE', True, '{"Bucuresti"}', False, 'skateboard', 'sporturi', '11.jpg'),

('Skateboard Enuff Cherry Blossom White/Teal 32x8inch', 'Modelul Cherry Blossom este un complete foarte apreciat din colecția Enuff Skateboards. Cu o grafică deosebit de frumoasă și dotări tehnice de încredere, acest skateboard te va ajuta să progresezi și să îți îmbunătățești stilul.', 469, '', True, '{"Bucuresti"}', True, 'skateboard', 'sporturi', '12.jpg'),

('Longboard Loaded Icarus Kegels And In Heats Flex 1 38.4inch/97.5cm', '', 1999, 'LOADED', True, '{"Constanta"}', False, 'longboard', 'sporturi', '13.jpg'),

('Longboard Santa Cruz Red Dot Pintail Multi', '', 879, 'SANTA CRUZ', True, '{"Constanta"}', True, 'longboard', 'sporturi', '14.jpg'),

('Role Razors SL Red', 'Gheata ușoară de tip hard-boot este prevăzută cu cataramă clasică Razors, liner Razors SL Heelpad, roți GC LITE de 57mm, rulmenți ABEC 5 și frame GC FLT3. Modelul SL Red reprezintă combinația perfectă între echilibru și grind-uri și s-a dovedit a fi durabil, oferind suportul de care ai nevoie la fiecare folosire.', 1289, 'RAZORS', True, '{"Bucuresti"}', False, 'role', 'sporturi', '15.jpg'),

('Role Anarchy Panik 3 Black', 'Modelul Anarchy Panik 3 este o rolă agresivă ajustabilă, ideală pentru copiii ce-și doresc să învețe acest sport. Această rolă semi-soft este confortabilă și ușoară, și este ajustabilă pe 4 mărimi.', 589, 'ANARCHY', True, '{"Bucuresti", "Cluj", "Constanta"}', True, 'role', 'sporturi', '16.jpg'),

('Placa Snowboard Nitro Beast x Volcom 2022', 'Snowboard-ul Beast x Volcom ofera progres, stabilitate, perfomanta la calibru pro si durabilitate pentru cei care isi doresc asta.', 2269, 'NITRO', True, '{}', False, 'snowboard', 'sporturi', '17.jpg'),

('Placa Snowboard Rome Blur 2020', 'Echipata cu cele mai usoare materiale, impreuna cu insertiile de carbon dispuse longitudinal catre marginile placii Rome Blur are un super pop, iar insertiile de fibra de sticla dispuse in zona legaturilor iti vor oferi maxim de siguranta chiar si la cele mai dificile aterizari.', 1539, 'ROME SDS', False, '{}', True, 'snowboard', 'sporturi', '18.jpg')
