# M3S04 - Desafio 1 - Virtualização Container

Escolha algum projeto realizado durante o curso para vrtualizar, em contêiner docker.

1 - Criar o docker file para o projeto
2 - Criar a imagem

```bash
docker build -t nome-do-projeto-vite .

```

3 - Rodar o container no docker

```bash
docker run -d -p 4173:4173 --name nome-do-container nome-do-projeto-vite

```
