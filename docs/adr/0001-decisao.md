# 0001. Escolha da Arquitetura Monolítica com Node.js, PostgreSQL e Docker

## Status
Aceito

## Contexto
Precisávamos desenvolver uma API de domínio único funcional para o Projeto B, com restrição de tempo de entrega, garantindo simplicidade, facilidade de manutenção e conformidade com os critérios de conteinerização e testes.

## Decisão
Adotamos um monólito modular em Node.js com Express, banco de dados relacional PostgreSQL e orquestração via Docker Compose.
- **Pattern Justificado (Repository/Service Pattern)**: Isolamento das consultas SQL do banco de dados em camadas lógicas para manter o código limpo, testável e aderente ao SOLID (Princípio da Responsabilidade Única).

## Consequências
- Subida do ambiente com 1 comando (`docker-compose up`).
- Facilidade na criação de testes de integração e unitários.
- Atendimento rigoroso ao escopo sem complexidade desnecessária de microsserviços.