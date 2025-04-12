const express = require('express');
const moduleDiscoveryService = require('../services/moduleDiscovery');

const router = express.Router();

/**
 * Rota para obter todos os módulos disponíveis
 */
router.get('/discover', (req, res) => {
  const modules = moduleDiscoveryService.getModules();
  res.json({ modules });
});

/**
 * Rota para obter informações de um módulo específico
 */
router.get('/:moduleId', (req, res) => {
  const { moduleId } = req.params;
  const moduleInfo = moduleDiscoveryService.getModuleInfo(moduleId);
  
  if (!moduleInfo) {
    return res.status(404).json({ error: 'Módulo não encontrado' });
  }
  
  res.json(moduleInfo);
});

/**
 * Rota para atualizar a lista de módulos disponíveis
 */
router.post('/refresh', (req, res) => {
  const modules = moduleDiscoveryService.refreshModules();
  res.json({ modules });
});

module.exports = router; 