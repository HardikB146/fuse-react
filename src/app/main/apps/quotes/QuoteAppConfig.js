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
        }
    ]
};
