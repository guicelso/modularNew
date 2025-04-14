// main.tsx - Inicializador do módulo1 com suporte a Module Federation
// Este arquivo se encarrega de inicializar o ambiente de módulos federados
// antes de iniciar o módulo principal

// Dinamicamente importa o bootstrap do módulo após os módulos federados
// estarem prontos
async function initApp() {
  try {
    // Dynamic import bootstrap com tratamento de erros melhorado
    const bootstrap = await import('./bootstrap.tsx');
    console.log('Módulo 1 iniciado com sucesso!');
    return bootstrap;
  } catch (err) {
    console.error('Erro ao iniciar módulo 1:', err);
    // Exibir mensagem de erro no DOM para facilitar debug
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `<div style="color: red; padding: 20px;">
        <h2>Erro ao carregar o Módulo 1</h2>
        <pre>${err instanceof Error ? err.message : String(err)}</pre>
      </div>`;
    }
  }
}

// Aguardar DOM estar pronto antes de iniciar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initApp());
} else {
  initApp();
}
