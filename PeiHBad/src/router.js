import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'login',
        component: () =>
            import ('@/views/Login')
    }, {
        path: '/page',
        redirect: '/page/Welcome',
        name: 'page',
        component: () =>
            import ('@/views/Page'),
        children: [{
            path: '/page/welcome',
            name: 'welcome',
            component: () =>
                import ('@/views/Welcome')
        }, {
            path: '/page/pagehome',
            name: 'pagehome',
            component: () =>
                import ('@/views/PageHome')
        }, {
            path: '/page/userlist',
            name: 'userlist',
            component: () =>
                import ('@/views/UserList')
        }, {
            path: '/page/messagelist',
            name: 'messagelist',
            component: () =>
                import ('@/views/MessageList')
        }, {
            path: '/page/maintain',
            name: 'maintain',
            component: () =>
                import ('@/views/Maintain')
        }, {
            path: '/page/logistics',
            name: 'logistics',
            component: () =>
                import ('@/views/Logistics')
        }, {
            path: '/page/hospitallist',
            name: 'hospitallist',
            component: () =>
                import ('@/views/HospitalList')
        }, {
            path: '/page/department',
            name: 'department',
            component: () =>
                import ('@/views/Department')
        }, {
            path: '/page/devicelist',
            name: 'devicelist',
            component: () =>
                import ('@/views/DeviceList')
        }, {
            path: '/page/devicegood',
            name: 'devicegood',
            component: () =>
                import ('@/views/DeviceGood')
        }, {
            path: '/page/deviceswitch',
            name: 'deviceswitch',
            component: () =>
                import ('@/views/DeviceSwitch')
        }, {
            path: '/page/devicereplenish',
            name: 'devicereplenish',
            component: () =>
                import ('@/views/DeviceReplenish')
        }, {
            path: '/page/bedorder',
            name: 'bedorder',
            component: () =>
                import ('@/views/BedOrder')
        }, {
            path: '/page/ordercommodity',
            name: 'ordercommodity',
            component: () =>
                import ('@/views/OrderCommodity')
        }, {
            path: '/page/financeshare',
            name: 'financeshare',
            component: () =>
                import ('@/views/FinanceShare')
        }, {
            path: '/page/financeagentorder',
            name: 'financeagentorder',
            component: () =>
                import ('@/views/FinanceAgentorder')
        }, {
            path: '/page/feedbackfault',
            name: 'feedbackfault',
            component: () =>
                import ('@/views/FeedbackFault')
        }, {
            path: '/page/feedbacklist',
            name: 'feedbacklist',
            component: () =>
                import ('@/views/FeedbackList')
        }, {
            path: '/page/businesslist',
            name: 'businesslist',
            component: () =>
                import ('@/views/BusinessList')
        }, {
            path: '/page/manager',
            name: 'manager',
            component: () =>
                import ('@/views/Manager')
        }, {
            path: '/page/financelist',
            name: 'financelist',
            component: () =>
                import ('@/views/FinanceList')
        }, {
            path: '/page/role',
            name: 'role',
            component: () =>
                import ('@/views/Role')
        }, {
            path: '/page/course',
            name: 'course',
            component: () =>
                import ('@/views/Course')
        }, {
            path: '/page/about',
            name: 'about',
            component: () =>
                import ('@/views/About')
        }, {
            path: '/page/question',
            name: 'question',
            component: () =>
                import ('@/views/Question')
        }, {
            path: '/page/feedbackback',
            name: 'feedbackback',
            component: () =>
                import ('@/views/FeedbackBack')
        }, {
            path: '/page/demo',
            name: 'demo',
            component: () =>
                import ('@/views/Demo')
        }]
    }]
})