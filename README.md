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

dupa poti intra pe index din frontend sa te inregistrezi, sa creezi produse etc....
