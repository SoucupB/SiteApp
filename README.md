# SiteApp
install ruby on rails from site http://railsinstaller.org/en
postrgres: https://www.postgresql.org/download/windows

Dependencies:
ruby version 2.3.3
rails version 5.2.4.3
postgres (PostgreSQL) 11.8

adaugale la environment variables.
(
pentru postgres daca iti cere sa setezi username si parola:
username: postgres
password: admin
)

dupa instalare intra in folder-ul backend/APIS
si ruleaza comenzile:

gem install bundler
bundle install
rails db:create
rails db:migrate

apoi dupa ce sunt instalate se poate porni serverul cu comanda

rails s

dupa poti intra pe index din frontend sa te inregistrezi, sa creezi produse etc....
