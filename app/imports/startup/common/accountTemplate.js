export const configureAccountsTemplate = (externalConfig) => {

    const defaultConfig = {
        privacyUrl: 'privacy',
        termsUrl: 'terms-of-use',
    };

    const config = Object.assign({}, defaultConfig, externalConfig);

};

