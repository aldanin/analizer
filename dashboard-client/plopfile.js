module.exports = ( plop ) => {

  plop.setGenerator( "component", {

    description: "Create a new component",

    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name? (Example: foo bar)"
      },
      {
        type: "input",
        name: "parentName",
        message: "What component it belongs to? (Example: BarBaz or empty for new dir)"
      },
      {
        type: "confirm",
        name: "isClass",
        message: "Do you need class component?"
      },
      {
        type: "confirm",
        name: "isCommon",
        message: "Is it a common component?"
      },
      {
        type: "confirm",
        name: "mui",
        message: "Does it use Material UI? (for tests boilerplate)",
      }
    ],

    actions: ( data ) => {
      let actions = [];
      let basePath = "src/components";

      if (data.isCommon) {
        basePath += '/Common'
      }

      let filePath, testPath, themePath;
      let templateFile

      // calculate relevant file paths
      if (data.parentName === '') {
        filePath = basePath + "/{{properCase name}}/index.tsx"
        testPath = basePath + "/{{properCase name}}/index.test.tsx"
        themePath = basePath + "/{{properCase name}}/Theme.ts"
        templateFile = data.isClass ?
          "plop-templates/component_index.tsx.tpl" :
          "plop-templates/SFC_index.tsx.tpl"
      } else {
        filePath = basePath + "/{{parentName}}/{{properCase name}}.tsx"
        testPath = basePath + "/{{parentName}}/{{properCase name}}.test.tsx"
        themePath = ''
        templateFile = data.isClass ?
          "plop-templates/component.tsx.tpl" :
          "plop-templates/SFC.tsx.tpl"
      }

      // add component
      actions.push({
        type: "add",
        path: filePath,
        templateFile: templateFile
      })

      // add test
      actions.push({
        type: "add",
        path: testPath,
        templateFile: "plop-templates/component.test.tsx.tpl"
      })

      // add theme def file for index component
      if (data.parentName === '') {
        actions.push({
          type: "add",
          path: themePath,
          templateFile: "plop-templates/theme.ts.tpl"
        })
      }

      // Return the array of actions to take.
      return actions;
    }
  })

  plop.setGenerator( "container component", {

    description: "Create a new container component",

    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name? (Example: foo bar)"
      }
    ],

    actions: [
      {
        type: "add",
        path: "src/containers/{{properCase name}}.tsx",
        templateFile: "plop-templates/container.tsx.tpl"
      }
    ]
  })

  plop.setGenerator( "store", {

    description: "Create a new store",

    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your store name? (Example: foo bars)"
      },
      {
        type: "input",
        name: "typeName",
        message: "What is your data type name? (Example: FooBar)"
      }
    ],

    actions: [
      // add type file if not exists
      {
        type: "add",
        path: "src/types/{{typeName}}.ts",
        templateFile: "plop-templates/type.d.ts.tpl",
        abortOnFail: false
      },

      // actions
      {
        type: "add",
        path: "src/state/actions/{{properCase name}}.ts",
        templateFile: "plop-templates/action.ts.tpl"
      },
      // reducer + test
      {
        type: "add",
        path: "src/state/reducers/{{properCase name}}.ts",
        templateFile: "plop-templates/reducer.ts.tpl"
      },
      {
        type: "add",
        path: "src/state/reducers/{{properCase name}}.test.ts",
        templateFile: "plop-templates/reducer.test.ts.tpl"
      },

      // saga + test
      {
        type: "add",
        path: "src/state/sagas/{{properCase name}}.ts",
        templateFile: "plop-templates/saga.ts.tpl"
      },
      {
        type: "add",
        path: "src/state/sagas/{{properCase name}}.test.ts",
        templateFile: "plop-templates/saga.test.ts.tpl"
      },

      // print next actions for user
      function(answers) {
        const addReducer = plop.renderString('Add {{ camelCase name }} to combineReducers in state/reducers/index.ts', answers);
        const addSsaga = plop.renderString('Add fork(watch{{ properCase name }}) to state/sagas/rootSaga.ts', answers);
				return `
        NEXT STEPS
        ----------
        - ${addReducer}
        - ${addSsaga}
        `
			}
    ]
  })

};
