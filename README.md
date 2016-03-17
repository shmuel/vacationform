

Vacation Form
=============

For a short assignment, we wanted to replicate the basics of Google
Forms without using the actual product.  The assignment was to set up
a form on our own server but feed the results into a Google Sheets (the name for their
spreadsheet product).  

I wrote a blog post which discusses this code in too much detail: http://dotted-pair.blogspot.com/2016/03/making-your-own-google-forms.html


Deploying to Google Sheets / GAS
------

The app requires a so-called GAS script connected to the receiving spreadsheet.

1. Create a new spreadsheet in google docs.  The permissions of this spreadsheet do not matter.
1. On the first row of the sheet, set up the column headers.  These should be entered
exactly as shown here, case and spaces do matter.
```name	weeks	ptoDays	fromDate	toDate	note```

1. Click `Tools:Script Editor`, which will open a new tab.
1. A default `code.js` script will show up.  If not:  In the Script Editor,  go to `File:New:New Script file`
1. In this file, paste the contents of the `gas/addtosheet.gs` file in the repo.
1. Save, which will ask you for a project name and a file name.  Neither matter.
1. Now go to `Run:Setup` to run the setup function of the script.  This only has
   to be done once.
1. Try `Run:testPost` to see whether your GAS script is talking to your database, a
   row with some values and some undefined-s should be inserted.
1. Go to `Publish:Deploy as Web App..` .  In the dialog, always set the version number to New.
The access settings should be 'me (your google id)' and 'anyone (even anonymous)'.
1. Hit DEPLOY and copy the URL shown in the modal.
1. The first time only, Google will ask you for authorization.
1. Build the app `mvn package`
1. You can try the app locally with `env VACTIONFORM_URL=<URL-HERE> mvn spring-boot:run` but you will have to insert
the url of your GAS script.  In IntelliJ, you can modify the configuration for your VacationFormApplication.


Deploying to CF
-----

The app was built to run on Pivotal Web Services, a CloudFoundry instance.

There is a sample manifest under `manifest.yml.template`.  You will have to add the name
of the app and the URL of your GAS script.  Then
```
cf login -a https://api.run.pez.pivotal.io --sso
cf push
```

When using PEZ (a Pivotal internal product), you will need the `--sso` option for single sign on.  It will show you a URL to open.  Use a browser in which you have previously
authenticated with Okta.

Others, use `-a api.run.pivotal.io` instead, use your username and passwords with PWS.








