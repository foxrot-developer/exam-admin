import React from 'react'
import { authRoles } from '../../auth/authRoles'

const dashboardRoutes = [
    {
        path: '/dashboard/users',
        component: React.lazy(() => import('../users/Users')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/free-exams',
        component: React.lazy(() => import('../FreeExam/FreeExam')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/paid-exams/questions/:id/:lang',
        component: React.lazy(() =>
            import('../PaidExam/PaidQuestion/PaidExamQuestion')
        ),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/details',
        component: React.lazy(() => import('../Detail/Detail')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/results',
        component: React.lazy(() => import('../ExamResult/ExamResult')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/paid-exams',
        component: React.lazy(() => import('../PaidExam/PaidExam')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/paid-questions',
        component: React.lazy(() => import('../PaidQuestions/PaidQuestions')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/payment-methods',
        component: React.lazy(() => import('../PaymentMethod/PaymentMethod')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/subscription',
        component: React.lazy(() => import('../subscription/Subscription')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard',
        component: React.lazy(() => import('./Analytics')),
        auth: authRoles.sa,
    },
]

export default dashboardRoutes
