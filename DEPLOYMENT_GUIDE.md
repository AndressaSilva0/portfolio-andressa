# Guia de Deploy na Vercel

Seu portfólio está configurado para funcionar perfeitamente na Vercel. Como usamos funcionalidades que dependem de chaves de API (EmailJS), você precisa configurar as **Variáveis de Ambiente** no painel da Vercel.

## 1. Environment Variables (Variáveis de Ambiente)

No seu dashboard da Vercel, vá em:
`Settings` > `Environment Variables`

Adicione as seguintes chaves (os valores estão no seu arquivo `.env.local`):

| Key | Value (Exemplo) | Descrição |
|-----|-----------------|-----------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_xxxx` | ID do seu serviço no EmailJS |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `template_xxxx` | ID do seu template no EmailJS |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `xxxx-xxxx` | Sua chave pública do EmailJS |

> **Importante:** Sem essas variáveis configuradas na Vercel, o **formulário de contato não funcionará** em produção (embora funcione no seu computador local).

## 2. Downloads (CV)
Os downloads do CV (CSV e Texto) são gerados "on-the-fly" pelo navegador do visitante usando JavaScript.
*   **Não requer backend:** Isso roda 100% no cliente.
*   **Funciona na Vercel?** Sim, perfeitamente.

Para o **PDF**, lembre-se de fazer o upload dos arquivos reais para a pasta `public` antes do deploy, ou o link dará 404 (ou baixará o placeholder se você o manteve).
