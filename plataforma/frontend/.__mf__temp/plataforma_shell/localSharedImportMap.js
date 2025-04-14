
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    const importMap = {
      
        "react": async () => {
          let pkg = await import("__mf__virtual/plataforma_shell__prebuild__react__prebuild__.js")
          return pkg
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/plataforma_shell__prebuild__react_mf_2_dom__prebuild__.js")
          return pkg
        }
      ,
        "@mui/material": async () => {
          let pkg = await import("__mf__virtual/plataforma_shell__prebuild___mf_0_mui_mf_1_material__prebuild__.js")
          return pkg
        }
      ,
        "react-router-dom": async () => {
          let pkg = await import("__mf__virtual/plataforma_shell__prebuild__react_mf_2_router_mf_2_dom__prebuild__.js")
          return pkg
        }
      ,
        "@emotion/styled": async () => {
          let pkg = await import("__mf__virtual/plataforma_shell__prebuild___mf_0_emotion_mf_1_styled__prebuild__.js")
          return pkg
        }
      ,
        "@emotion/react": async () => {
          let pkg = await import("__mf__virtual/plataforma_shell__prebuild___mf_0_emotion_mf_1_react__prebuild__.js")
          return pkg
        }
      
    }
      const usedShared = {
      
          "react": {
            name: "react",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "plataforma_shell",
            async get () {
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^18.2.0"
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "plataforma_shell",
            async get () {
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^18.2.0"
            }
          }
        ,
          "@mui/material": {
            name: "@mui/material",
            version: "7.0.2",
            scope: ["default"],
            loaded: false,
            from: "plataforma_shell",
            async get () {
              usedShared["@mui/material"].loaded = true
              const {"@mui/material": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^7.0.2"
            }
          }
        ,
          "react-router-dom": {
            name: "react-router-dom",
            version: "7.5.0",
            scope: ["default"],
            loaded: false,
            from: "plataforma_shell",
            async get () {
              usedShared["react-router-dom"].loaded = true
              const {"react-router-dom": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^7.5.0"
            }
          }
        ,
          "@emotion/styled": {
            name: "@emotion/styled",
            version: "11.14.0",
            scope: ["default"],
            loaded: false,
            from: "plataforma_shell",
            async get () {
              usedShared["@emotion/styled"].loaded = true
              const {"@emotion/styled": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^11.14.0"
            }
          }
        ,
          "@emotion/react": {
            name: "@emotion/react",
            version: "11.14.0",
            scope: ["default"],
            loaded: false,
            from: "plataforma_shell",
            async get () {
              usedShared["@emotion/react"].loaded = true
              const {"@emotion/react": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^11.14.0"
            }
          }
        
    }
      const usedRemotes = [
                {
                  entryGlobalName: "modulo1",
                  name: "modulo1",
                  type: "var",
                  entry: "http://localhost:5001/remoteEntry.js",
                  shareScope: "default",
                }
          
      ]
      export {
        usedShared,
        usedRemotes
      }
      