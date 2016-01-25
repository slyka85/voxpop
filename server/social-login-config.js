// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1695347174011108',
    secret: '7493aa401ce8dd9877f059781c7fa35c'
});

// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
    service: 'google'
});
ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: '931691904220-04e1ejn8q25jupac3urf4d9891t3adu6.apps.googleusercontent.com',
    secret: 'GipFLXGEYtmwkvS9ku2mPNjO'
});

// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
  service: "twitter"
});
ServiceConfiguration.configurations.insert({
  service: "twitter",
  consumerKey: "trCVWci9hYh7zuKZPV5o7ABeu",
  secret: "11xlaz57BFACAqFNd2XSmCy6xBrFlodqEAffIoDGSkW7HUC3nz"
});