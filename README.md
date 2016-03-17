

Vacation Form
=============


Using the repo on bitbucket
--------------

The code is on bitbucket for now, as that gives us a private repo.

```
GIT_SSH_COMMAND='ssh -i  ~/.ssh/deploymentkey' git clone git@bitbucket.org:dirkjot/vacation-form.git
```

Read access to the repo via this private key, put it in `~/.ssh/deploymentkey`
with permissions 600  /  u+rw,oa-


```
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAts6zLZwRyiCDrt7aszSC4stf5f51mFTxlwsQOJgBi37P/ACQ
BMPTH4uJnmPx3GCS/vwV0q5UOxmGoQqQarND+agoRWwNjYHkqlvwYBD9R06kAtfx
9HaiRJP+pCc8+Zh9Cyx1jqePsMfF/jKujlFQOUIIuRYmy68TQ/5blveHxOPw2Fo2
1vDRgDLf3lh1DhYJkbbTIorJpyfNMQTXLY3XqH3py9wQc/kmwIYOsL5NGitBzksc
9Ksm5eBheAnfUMeJ6rhYhS9xbqHf3Tg9kcxBozFBDnxQ39hNwjWKxjApfnpT+abY
8NUxR1YvdtonDxHUZ8WF2zeRio2kaZMijBWccQIDAQABAoIBADCS/91QqRFyTks7
ABW6EEU/EP5F/O07NO6Ti/3dthtg2Nb3N01s0z6Aj1K879lE+Ao05X+TvuHtSG6m
JfWUKK2/1uOLcJZ3O1FhGKAOI5688KuowavZkghy4qivnG4d7Kv5Zks/jtjEXIHM
6cD7LjvopfS4RBq/LHlWrvOQVk0kaOoijwmSxNwohY37ye54FuJspwv+NEXy8WEu
pr4isAipCRoC/ZWx1PyqthHCH+XiI8LvpK8IuTXyibQ972K4nRCV3nnRF0FYGk/f
rO8oYbByJnh8BmbTuv+LJEOYDa4QUvk639A2upKDyC2dybgJnlFzk6TL+TG3CyUj
8o0+jdkCgYEA6GUDbHphf+p80PvjQFyPfePU3kCJft5KMLitVUHkMuKtd/BSc7hu
q1YnVQKd0hW78fL7eDSgQuwxZBN0UqVCvhRRqNFdXQf+AMjALvbtL3Q68biU7sMJ
IJd2tglBQlmXk2YrW6anUZIWNBu6IX18CPygiDo92bQlBryabCIKDvcCgYEAyWBD
3jSqJ/A/dMiBfzkJkZxdtz9dwZ+vfWuNObLWcwFdwKN3n9bOCXoTLoPuxHZlHWM+
XGmFspIa9S2qz/XvLKs5zcjv9yPR1Mor1g2qV2mAzrk3G4G2t4MnceEBHPoMKfVG
QdLcAhbyQ16QyWpfg5MaVMyVbeWinNmHQZWDjdcCgYAJHs2/mB3zczRqzzff8sH+
4s4b2tSKkha/SsAitG9MP/Em39uchwRw3PS2NWAUOp4hpLORyB7yAWr+znSmOa4g
35NE2NKdMA8b4MUKEs7EKf+WNPRDWowlJ0yVYE+bVwDH3B6ffi7a2KzeZqgrYE1Z
3PA/6Gk8/gDl/sjgrYVPiQKBgBFcXT2A6NJ8odvdlVx0fGCzTFkJ+3k/3Q9BAHHi
+x37FiwPa7a5/BVREupFsYX6dwkrjyrEZiRY+D3+6+T13OLK+DbHhfiWe/aOX20a
zH6wt8wap6eVbT0w72uf7EqlO/s6DA6MsS7073njYzQaGZXsTq7U3GUXEQfYsRJ0
Y10NAoGBAJ1dR7qwF1hmLEf27SvenYQ5f1soVb4OZsV0vu+PGAlhiA7K28wqTmQm
Y/hzZe7oYuzjeAmCTGsnOpyx1HRrVWgC28l9+q4FX5rke8uAx6FDzeQdr+PG9DZl
63vjZwzjoN3uvUS0ssK9Yjdmf86Eth7NbsRxitcwpowAFX4pH1e0
-----END RSA PRIVATE KEY-----
```


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

The app is currently running on the PEZ CF belonging to djanssen@pivotal.io.

There is a sample manifest under `manifest.yml.template`.  You will have to add the name
of the app and the URL of your GAS script.  Then
```
cf login -a https://api.run.pez.pivotal.io --sso
cf push
```

The `--sso` option will show you a URL to open.  Use a browser in which you have previously
authenticated with Okta.






