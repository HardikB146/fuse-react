import React from 'react';

export const QuoteAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/quotes',
            component: React.lazy(() => import('./QuoteApp'))
        },
        {
            path     : '/apps/quote/add',
            component: React.lazy(() => import('./QuoteAdd'))
        },
    ]
};
