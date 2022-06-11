/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  awsmobile: {
    // eslint-disable-next-line @typescript-eslint/quotes
    "aws_project_region": "us-east-2",
    "aws_cognito_identity_pool_id": "us-east-2:604263f3-79af-4d72-b151-bd8faa08eb56",
    "aws_cognito_region": "us-east-2",
    "aws_user_pools_id": "us-east-2_bcqvtkwkv",
    "aws_user_pools_web_client_id": "25i9kiinu875mno4l6ocooo2mo",
    "oauth": {},
    "aws_cognito_login_mechanism": [
      "EMAIL"
    ],
    "aws_cognito_signup_attributes": [
      "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
      "SMS"
    ],
    "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
