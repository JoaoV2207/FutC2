Sistema web de fantasy de futebol do campeonato Brasileiro 2024

1 - Grupo:<br>
João Vitor Mateus Silva - 2020425801 <br>
Lucas Jacone da Silva - 2019006922 <br>
Kleber Junior Alves Pereira 2020054625

2 - Explicação do Sistema:
Atualmente com o crescimento de casas de aposta e jogos que levam os esportes para outro tipo de mercado, fantasy games se tornaram algo bem
utilizado para o público geral. Existem diversos tipos de fantasy games, sendo que a maioria utiliza os acontecimentos dos jogos reais para definir
a pontuação de seus jogadores.

Pensando nisso, surgiu a ideia de criar uma nova versão de um dos mais famosos fantasy games presentes no mercado, o Cartola FC. Nele cada usuário cria um time em que nele são utilizados jogadores dos clubes do brasileirão para criação de um equipe com 11 jogadores e 1 técnico, e a atuação desses jogadores define os pontos finais daquele time.

No nosso sistema, além de funções de cadastro de time(Usuário) e Login, temos um banco de dados com os jogadores de todos os clubes do brasileirão 2024, com suas fotos e características. Com esses jogadores, conseguimos adicionar e retirar jogadores a nosso time, seguindo uma escalação pré definida (433). Com isso podemos salvar nossa escalação e editá-la a qualquer momento além de checar as informações de todos os jogadores que estão ou não em nosso time.

3 - Explicação das tecnologias utilizadas:
Para a concepção do nosso trabalho, utilizamos a linguagem typescript, e o framework Node.js para construção do código back-end e suas rotas, além 
de termos um banco de dados em sqlite para guardar os dados de usuários e os dados dos times do brasileirão e seus jogadores.
Atualmente o sistema funciona com retorno no terminal, no entanto futuramente adicionaremos as telas do sistema utilizando React e typescript para
que todas as funções sejam feitas dentro do sistema.

Utilizamos essas tecnologias por elas serem bem comuns para a criação de sistemas web que pretendem ser acessadas por vários usuários. Além disso são linguagens de fácil compreensão por parte dos integrantes do grupo.

4 - Execução do Sistema
Para que o sistema seja executado da forma correta devemos seguir os seguintes passos:<br/>

A- Baixar o arquivo com as pastas do sistema, ou clonar o repositório a partir do github para dentro da sua IDE<br/>

B- Abrir um terminal e rodar os seguintes códigos dentro da pasta do sistema
- "cd server"
- "npm i" Para Dowload das depdendências do sistema<br/>

C- Utilizar o comando:
  - npm run dev dentro da pasta server para rodar o sistema

D- Utilizar o programa Postman ou similares para rodar as rotas presentes no sistema, utilizando os parâmetros necessários no campo Body.

5 - Especificidades de Sistema:
Usuario
    Atributos
        Nome
        Email
        Senha
        Saldo
        Nome do Time

    Métodos
        Cadastro
        Login
        Logout
        Escala time

TimeUsuarioRodada
    Atributos
        Usuario
        Rodada
        Jogadores
        Preco
        Pontuacao

    Métodos
        Listar Times
        Listar Times por Status

Time
    Atributos
        Nome
        Escudo
    Metodo
        Listar Times

Jogador
    Atributos
        Nome
        Posição
        Time
        Preço
        Status
        Pontuação Média
    Metodos
        Listar Jogadores
        Listar Jogadores por Posição
        Listar Jogadores por Time
        Listar Jogaodres por Status
        Listar Jogaores com Filtragem

Confronto
    Atributos
        Time Casa
        Time Fora
        Data
        Rodada
        Placar

    Métodos
        Listar Confrontos
        Listar Confrontos por Rodada

Rodada
    Atributos
        Numero
        Data Inicio Mercado
        Hora Inicio Mercado
        Data Fim Mercado
        Hora Fim Mercado

Jogador Rodada
    Atributos
        Jogador
        Rodada
        Pontuação
