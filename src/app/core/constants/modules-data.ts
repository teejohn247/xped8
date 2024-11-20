export const siloModules = [
    {
      moduleId: 1,
      key: 'hr',
      moduleName: 'Human Resources Management Module',
      value: 'HRM Module',
      moduleFeatures: [
        {
          featureId: 1,
          featureKey: 'employeeManagement',
          featureName: 'Employee Management',
          featurePermissions: [
            {
              key: 'canCreateEmployees',
              name: 'Create Employees',
              value: true
            },
            {
              key: 'canViewEmployees',
              name: 'View Employees',
              value: true
            },
            {
              key: 'canUpdateEmployees',
              name: 'Update Employees',
              value: true
            },
            {
              key: 'canDeleteEmployees',
              name: 'Delete Employees',
              value: true
            }
          ]
        },
        {
            featureId: 2,
            featureKey: 'payrollManagement',
            featureName: 'Payroll Management',
            featurePermissions: []
        },
        {
            featureId: 3,
            featureKey: 'leaveManagement',
            featureName: 'Leave Management',
            featurePermissions: []
        },
        {
            featureId: 4,
            featureKey: 'appraisalManagement',
            featureName: 'Appraisal Management',
            featurePermissions: []
        },
        {
          featureId: 5,
          featureKey: 'expenseManagement',
          featureName: 'Expense Management',
          featurePermissions: []
        },
        {
            featureId: 6,
            featureKey: 'recruitment',
            featureName: 'Recruitment',
            featurePermissions: []
        },
        {
            featureId: 7,
            featureKey: 'calendar',
            featureName: 'Calendar',
            featurePermissions: []
        },
        {
            featureId: 8,
            featureKey: 'attendanceManagement',
            featureName: 'Attendance Management',
            featurePermissions: []
        },
        {
            featureId: 9,
            featureKey: 'visitorsLog',
            featureName: 'Visitors Log',
            featurePermissions: []
        }
      ]
    },
    {
      moduleId: 2,
      key: 'crm',
      value: 'CRM Module',
      moduleName: 'Customer Relationship Management Module',
      moduleFeatures: [
        {
            featureId: 1,
            featureKey: 'contactsManagement',
            featureName: 'Contacts Management',
            featurePermissions: []
        },
        {
            featureId: 2,
            featureKey: 'leadsManagement',
            featureName: 'Leads Management',
            featurePermissions: []
        },
        {
            featureId: 3,
            featureKey: 'communication',
            featureName: 'Communication',
            featurePermissions: []
        },
        {
            featureId: 4,
            featureKey: 'support',
            featureName: 'Support',
            featurePermissions: []
        },
        {
            featureId: 5,
            featureKey: 'salesManagement',
            featureName: 'Sales Management',
            featurePermissions: []
        },
        {
            featureId: 6,
            featureKey: 'agentsManagement',
            featureName: 'Agents Management',
            featurePermissions: []
        },
        {
            featureId: 7,
            featureKey: 'reports',
            featureName: 'Reports',
            featurePermissions: []
        }
      ]
    },
    {
        moduleId: 3,
        key: 'settings',
        value: 'Settings Module',
        moduleName: 'Settings Management Module',
        moduleFeatures: [
            {
                featureId: 1,
                featureKey: 'generalSettings',
                featureName: 'General Settings',
                featurePermissions: []
            },
            {
                featureId: 2,
                featureKey: 'hrmSettings',
                featureName: 'HRM Settings',
                featurePermissions: []
            },
            {
                featureId: 3,
                featureKey: 'crmSettings',
                featureName: 'CRM Settings',
                featurePermissions: []
            }
        ]
      }
]