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
