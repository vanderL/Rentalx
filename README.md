# Cadastro de Carros

**RF(Requisitos Funcionais)**

- O usuário deve poder cadastrar um novo carro;

**RN(Regra de Negócio)**

- Não deve ser possível cadastrar um carro com uma placa já existente;
- Não deve ser possível alterar a placa de um carro já cadastrada;
- O carro deve ser cadastrado por padrão com disponibilidade;
- Somente um usuário administrador poderá realizar o cadastro;

# Listagem de carros

**RF**

- O usuário deve poder listar todos os carros disponiveis;
- O usuário deve poder listar todos os carros disponiveis pelo nome da categoria;
- O usuário deve poder listar todos os carros disponiveis pelo nome da marca;
- O usuário deve poder listar todos os carros disponiveis pelo nome do carro;

**RN**

- O usuário não precisar estar logado no sistema;

# Cadastro de Especificação no carro

**RF**

- O usuário deve poder cadastrar uma especificação para um carro;

**RN**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro;
- Somente um usuário administrador poderá realizar o cadastro;

# Cadastro de imagens do carro

**RF**

- O usuário deve poder cadastrar a imagem do carro;
- O usuário deve poder listar todos os carros (Sem excessões)

**RNF**

- Utilizar o pacote multer para upload dos arquivos;

**RN**

- O Usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- Somente um usuário administrador poderá realizar o cadastro;

# Aluguel de carro

**RF**

- O Usuário deve poder cadastrar um aluguel;

**RN**

- O aluguel deve ter duração miníma de 12 hora;
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário;
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro;
- O Usuário deve estar logado na aplicação;
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível;

# Devolução de carro

**RF**

- Deve ser Possível realizar a devolução de um carro;

**RN**

- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa;
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel;
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel;
- Ao realizar a devolução, deverá ser calculado o total do aluguel;
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso;
- Caso haja multa, deverá ser somado ao total do alugue;
- O usuário deverá está logado na aplicação;
