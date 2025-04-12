/**
 * Serviço para carregar módulos remotos dinamicamente
 */
class ModuleLoader {
  constructor() {
    this.modules = [];
    this.loadedModules = {};
    this.moduleApiUrl = import.meta.env.VITE_MODULE_DISCOVERY_ENDPOINT || '/api/modules/discover';
  }

  /**
   * Busca a lista de módulos disponíveis da API
   */
  async fetchModules() {
    try {
      const response = await fetch(this.moduleApiUrl);
      const data = await response.json();
      this.modules = data.modules || [];
      return this.modules;
    } catch (error) {
      console.error('Erro ao carregar módulos:', error);
      return [];
    }
  }

  /**
   * Carrega um módulo remoto dinamicamente
   * @param {string} moduleId - ID do módulo a ser carregado
   * @param {string} scope - Escopo do módulo no webpack
   * @param {string} module - Nome do módulo exposto
   */
  async loadModule(moduleId, scope, module) {
    if (this.loadedModules[moduleId]) {
      return this.loadedModules[moduleId];
    }

    // Encontra as informações do módulo
    const moduleInfo = this.modules.find(m => m.id === moduleId);
    if (!moduleInfo) {
      throw new Error(`Módulo não encontrado: ${moduleId}`);
    }

    try {
      // Carrega o módulo remoto
      const moduleFactory = await this.loadRemoteModule({
        url: moduleInfo.entryPoint,
        scope: moduleId,
        module,
      });

      // Armazena o módulo carregado
      this.loadedModules[moduleId] = moduleFactory();
      return this.loadedModules[moduleId];
    } catch (error) {
      console.error(`Erro ao carregar o módulo ${moduleId}:`, error);
      throw error;
    }
  }

  /**
   * Carrega um módulo remoto usando Module Federation
   */
  async loadRemoteModule({ url, scope, module }) {
    // Cria o container para o módulo remoto
    const container = window[scope] || {
      init: (shareScope) => {
        try {
          window[scope].initPromise = window[scope].initPromise || Promise.resolve(shareScope).then(shareScope => {
            if (!window[scope].__initialized) {
              window[scope].__initialized = true;
              return window[scope].init(shareScope);
            }
          });
          return window[scope].initPromise;
        } catch (e) {
          console.error(`Erro ao inicializar o módulo ${scope}:`, e);
          throw e;
        }
      }
    };

    // Carrega o script remoto se necessário
    if (!window[scope]) {
      try {
        // Adiciona o script do módulo remoto
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = url;
          script.type = 'text/javascript';
          script.async = true;
          
          script.onload = () => {
            console.log(`Módulo ${scope} carregado com sucesso`);
            resolve();
          };
          
          script.onerror = (e) => {
            console.error(`Erro ao carregar script do módulo ${scope}:`, e);
            reject(new Error(`Erro ao carregar script do módulo ${scope}`));
          };
          
          document.head.appendChild(script);
        });
      } catch (error) {
        console.error(`Erro ao carregar o script do módulo ${scope}:`, error);
        throw error;
      }
    }

    // Inicializa o módulo remoto
    await container.init(__webpack_share_scopes__.default);
    
    // Obtém o módulo exposto
    const factory = await window[scope].get(`./${module}`);
    return factory;
  }

  /**
   * Obtém as rotas de todos os módulos carregados
   */
  async getAllModuleRoutes() {
    const routes = [];
    
    // Carrega todos os módulos
    await this.fetchModules();
    
    // Carrega as rotas de cada módulo
    for (const moduleInfo of this.modules) {
      try {
        const moduleRoutes = await this.loadModule(moduleInfo.id, moduleInfo.id, 'routes');
        routes.push(...moduleRoutes);
      } catch (error) {
        console.error(`Erro ao carregar rotas do módulo ${moduleInfo.id}:`, error);
      }
    }
    
    return routes;
  }
}

export default new ModuleLoader(); 