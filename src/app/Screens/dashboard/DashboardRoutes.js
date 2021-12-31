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
        path: '/dashboard/about-section',
        component: React.lazy(() => import('../WebContent/AboutSection')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/contact-info',
        component: React.lazy(() => import('../WebContent/ContactInfo')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/contact-section',
        component: React.lazy(() => import('../WebContent/ContactSection')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/template',
        component: React.lazy(() => import('../Email/Template')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/footer-section',
        component: React.lazy(() => import('../WebContent/FooterSections')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/hero-section',
        component: React.lazy(() => import('../WebContent/HeroSection')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/package-section',
        component: React.lazy(() => import('../WebContent/PackageSection')),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/import/:type',
        component: React.lazy(() =>
            import('../PendingQuestion/PendingQuestion')
        ),
        auth: authRoles.sa,
    },
    {
        path: '/dashboard/language-section',
        component: React.lazy(() => import('../WebContent/LanguageSection')),
        auth: authRoles.sa,
    },
    {
        path: '/',
        component: React.lazy(() => import('./Analytics')),
        auth: authRoles.sa,
    },
]

export default dashboardRoutes
