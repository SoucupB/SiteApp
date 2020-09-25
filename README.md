# SiteApp
install ruby on rails from site http://railsinstaller.org/en<br/>
postrgres: https://www.postgresql.org/download/windows<br/>

<br/>
Dependencies:<br/>
ruby version 2.3.3<br/>
rails version 5.2.4.3<br/>
postgres (PostgreSQL) 11.8<br/>
<br/>
adaugale la environment variables.<br/>
(<br/>
pentru postgres daca iti cere sa setezi username si parola:<br/>
username: postgres<br/>
password: admin<br/>
)<br/>

dupa instalare intra in folder-ul backend/APIS<br/>
si ruleaza comenzile:<br/>

<br/>
gem install bundler <br/>
bundle install <br/>
rails db:create <br/>
rails db:migrate <br/>

apoi dupa ce sunt instalate se poate porni serverul cu comanda
<br/>
rails s<br/>

http://localhost:3000/authenticate.json
type: POST<br/>
params:<br/>
{<br/>
	"email": "smt@smt.com",<br/>
	"password": "12345"<br/>
}<br/>
http://localhost:3000/user/sign_up.json<br/>
type: POST<br/>
params:<br/>
{<br/>
	"email": "smt@smt.com",<br/>
	"password": "12345",<br/>
	"first_name": "whatever",<br/>
	"last_name": "DADAF",<br/>
	"user_type": "normal"<br/>
}
http://localhost:3000//random_products.json<br/>
type: GET<br/>
params:<br/>
{<br/>
	"number": 4,<br/>
	"categ": "electronice"<br/>
}<br/>
http://localhost:3000/ads_products.json<br/>
type: GET<br/>
params:<br/>
{<br/>
    "number": 2<br/>
}<br/>
http://localhost:3000/paginates/products.json?<br/>
type: GET<br/>
params:<br/>
{<br/>
    "page": 1,<br/>
    "per_page": 9<br/>
}<br/>
http://localhost:3000/get_money.json<br/>
type: GET<br/>
params:<br/>
{<br/>

}<br/>
http://localhost:3000/category/products.json<br/>
type: GET<br/>
params:<br/>
{<br/>
<br/>
}<br/>
http://localhost:3000/product/:user_id/create.json<br/>
type: POST<br/>
params:<br/>
{<br/>
    "name": "AA",<br/>
    "amount": 12,<br/>
    "price": 324,<br/>
    "description": "DADADAFFF",<br/>
    "product_type": "acce",<br/>
    "discount": 10<br/>
}<br/>


dupa poti intra pe index din frontend sa te inregistrezi, sa creezi produse etc....<br/>
<br/>
<br/>
To implement.<br/>
1) Tabelele pentru produse in baza de date.<br/>
Product: Nume, Dimensiuni, Culoare, Stoc, Pret, Tip.<br/>
Categorii<br/>
Baie<br/>
Bucatarie<br/>
hol<br/>
Living<br/>
<br/>
2)Checkbox-uri pentru filtre.<br/>
<br/>
3)Adaugare Favorite<br/>
<br/>
4)Pagina pricipala fara credentiale.<br/>



