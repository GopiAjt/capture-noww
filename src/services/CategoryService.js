export const CategoryService = {
    getData() {
        return [
            { name: 'wedding', code: 'AF' },
            { name: 'pre wedding', code: 'AL' },
            { name: 'Portraits', code: 'DZ' },
            { name: 'Documentary', code: 'AS' },
            { name: 'Fashion', code: 'AD' },
            { name: 'Street', code: 'AO' },
            { name: 'Event', code: 'AI' },
            { name: 'Travel', code: 'AQ' },
            { name: 'Pet', code: 'AG' },
            { name: 'Product', code: 'AR' },
            { name: 'Real Estate', code: 'AM' },
            { name: 'Food', code: 'AW' },
            { name: 'Still Life', code: 'AU' },
            { name: 'Architecture', code: 'AT' },
            { name: 'Landscape', code: 'AZ' },
            { name: 'Wildlife', code: 'AZ' },
            { name: 'Macro', code: 'AZ' },
            { name: 'Astrophotography', code: 'AZ' },
            { name: 'Scientific', code: 'AZ' },
            { name: 'Underwater', code: 'AZ' }
        ];
    },

    getCategories() {
        return Promise.resolve(this.getData());
    }
};