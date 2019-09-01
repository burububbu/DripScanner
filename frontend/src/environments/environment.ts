// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AUTH0_CLIENTID: "n5r24dUu4igtYNpbHT7nl9RiWuNDzLHq",
  AUTH0_DOMAIN: "dripscanner.eu.auth0.com",
  AUTH0_AUDIENCE: "http://localhost:3000",
  BACKEND_DRIPS: "https://dripscannerita.herokuapp.com/drips/",
  BACKEND_OWNERS: "https://dripscannerita.herokuapp.com/owners/",
  AUTH0_REDIRECTURL: "https://localhost:8000/callback"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
