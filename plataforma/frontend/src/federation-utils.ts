// Adiciona a declaração para o método de federação
declare const __federation_method_ensure: (remoteId: string) => Promise<any>;

// Inicializador de módulos federados
export const initFederation = async () => {
  // Esta função irá inicializar os módulos federados antes de carregar o restante da aplicação
  try {
    await __federation_method_ensure('modulo1');
    console.log('Módulo remoto inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar módulo remoto:', error);
  }
}; 