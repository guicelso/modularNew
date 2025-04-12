const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

class ModuleDiscoveryService {
  constructor() {
    this.modulesDir = process.env.MODULES_DIR || '../../modulos';
    this.modules = [];
    this.scanModules();
  }

  /**
   * Escaneia os módulos disponíveis
   */
  scanModules() {
    try {
      const modulesPath = path.resolve(__dirname, this.modulesDir);
      
      if (!fs.existsSync(modulesPath)) {
        console.error(`Diretório de módulos não encontrado: ${modulesPath}`);
        return;
      }

      const moduleDirs = fs.readdirSync(modulesPath)
        .filter(file => fs.statSync(path.join(modulesPath, file)).isDirectory());

      this.modules = moduleDirs.map(moduleDir => {
        const modulePath = path.join(modulesPath, moduleDir);
        const envPath = path.join(modulePath, 'backend', '.env');
        
        let moduleInfo = {
          id: moduleDir,
          name: moduleDir,
          basePath: `/modulos/${moduleDir}`,
          apiPath: `/api/modulos/${moduleDir}`,
          entryPoint: `/modulos/${moduleDir}/remoteEntry.js`,
        };

        // Tenta ler informações adicionais do arquivo .env
        if (fs.existsSync(envPath)) {
          const envConfig = dotenv.parse(fs.readFileSync(envPath));
          if (envConfig.MODULE_NAME) {
            moduleInfo.name = envConfig.MODULE_NAME;
          }
        }

        return moduleInfo;
      });

      console.log(`Descobertos ${this.modules.length} módulos:`, this.modules.map(m => m.id).join(', '));
    } catch (error) {
      console.error('Erro ao escanear módulos:', error);
    }
  }

  /**
   * Retorna a lista de módulos disponíveis
   */
  getModules() {
    return this.modules;
  }

  /**
   * Obtém as informações de um módulo específico
   * @param {string} moduleId 
   */
  getModuleInfo(moduleId) {
    return this.modules.find(m => m.id === moduleId);
  }

  /**
   * Atualiza a lista de módulos disponíveis
   */
  refreshModules() {
    this.scanModules();
    return this.modules;
  }
}

module.exports = new ModuleDiscoveryService(); 