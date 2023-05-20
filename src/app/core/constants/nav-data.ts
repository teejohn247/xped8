export const navbarData = [
    {
        routeLink: '/app',
        icon: 'bi bi-grid-fill',
        label: 'Dashboard'
    },
    {
        routeLink: 'human-resources/employees',
        icon: 'bi bi-person-vcard-fill',
        label: 'Human Resources',
        subMenu: [
            {
                routeLink: 'human-resources/employees',
                icon: 'bi bi-people-fill',
                label: 'Employees',
            },
            {
                routeLink: 'human-resources/recruitment',
                icon: 'bi bi-briefcase-fill',
                label: 'Recruitment',
            },
            {
                routeLink: 'human-resources/payroll',
                icon: 'bi bi-layers-fill',
                label: 'Payroll',
            },
            {
                routeLink: 'human-resources/self-service',
                icon: 'bi bi-person-workspace',
                label: 'Self-Service'
            },
            {
                routeLink: 'human-resources/document-management',
                icon: 'bi bi-file-earmark-text-fill',
                label: 'Attendance'
            },
            {
                routeLink: 'human-resources/appraisals',
                icon: 'bi bi-award-fill',
                label: 'Performance Appraisal'
            },
            {
                routeLink: 'human-resources/leave-management',
                icon: 'bi bi-calendar2-x-fill',
                label: 'Leave Management'
            },
            {
                routeLink: 'human-resources/visitors-log',
                icon: 'bi bi-stickies-fill',
                label: 'Visitors Log'
            }
        ]
    },
    {
        routeLink: 'accounting',
        icon: 'bi bi-calculator-fill',
        label: 'Accounting'
    },
    {
        routeLink: 'project-management',
        icon: 'bi bi-folder-fill',
        label: 'Projects'
    },
    {
        routeLink: 'customer-relationship-management',
        icon: 'bi bi-microsoft-teams',
        label: 'CRM'
    },
    {
        routeLink: 'supply-chain',
        icon: 'bi bi-ubuntu',
        label: 'Supply Chain'
    },
    {
        routeLink: 'settings',
        icon: 'bi bi-gear-fill',
        label: 'Settings'
    }

]


export interface INavbarData {
    routeLink: string;
    icon?: string;
    label: string;
}