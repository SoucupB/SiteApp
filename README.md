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
type: POST
params:
{
	"email": "smt@smt.com",
	"password": "12345"
}
http://localhost:3000/user/sign_up.json
type: POST
params:
{
	"email": "smt@smt.com",
	"password": "12345",
	"first_name": "whatever",
	"last_name": "DADAF",
	"user_type": "normal"
}
http://localhost:3000//random_products.json
type: GET
params:
{
	"number": 4,
	"categ": "electronice"
}
http://localhost:3000/ads_products.json
type: GET
params:
{
    "number": 2
}
http://localhost:3000/paginates/products.json?
type: GET
params:
{
    "page": 1,
    "per_page": 9
}
http://localhost:3000/get_money.json
type: GET
params:
{

}
http://localhost:3000/category/products.json
type: GET
params:
{

}
http://localhost:3000/product/:user_id/create.json
type: POST
params:
{
    "name": "AA",
    "amount": 12,
    "price": 324,
    "description": "DADADAFFF",
    "product_type": "acce",
    "discount": 10
}


dupa poti intra pe index din frontend sa te inregistrezi, sa creezi produse etc....


To implement.
1) Tabelele pentru produse in baza de date.
Product: Nume, Dimensiuni, Culoare, Stoc, Pret, Tip.
Categorii
Baie
Bucatarie
hol
Living

2)Checkbox-uri pentru filtre.

3)Adaugare Favorite

4)Pagina pricipala fara credentiale.



