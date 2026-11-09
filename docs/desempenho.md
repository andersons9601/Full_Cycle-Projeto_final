# Relatório de Desempenho e SLO - Projeto B

## 1. Métrica e SLO Definidos
- **Métrica**: Latência de resposta da rota de listagem de usuários (`GET /usuarios`).
- **SLO (Service Level Objective)**: 95% das requisições para `GET /usuarios` devem ser respondidas em menos de **200ms** (p95 < 200ms).

## 2. Teste de Carga / Smoke Test (k6)
Foi executado um teste de fumaça e carga leve utilizando a ferramenta **k6** simulando tráfego concorrente.

### Script k6 de Exemplo (`smoke-test.js`):
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // 10 usuários virtuais simultâneos
  duration: '30s',
};

export default function () {
  const res = http.get('http://localhost:3000/usuarios');
  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}

## 3. Cobertura de Testes (Coverage Mínimo)
- **Cobertura Mínima Declarada:** 50% (configurada no Jest via `coverageThreshold`).
- O pipeline de CI executa `npm test` garantindo que o código atenda aos critérios de qualidade da rubrica M2.