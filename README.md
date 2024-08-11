step 1 : Install node_modules
for install node_modules use command " npm run appInstall"
step 2 : for creating server use "npm install json-server"
create db.json file add required data
use this command for start server "json-server --watch db.json --host 0.0.0.0 --port 3000"
step 3 : first build and generate apk for using below command
npm run buildandOpen
step 4 : for creating cache service use capacitor preferences
npm install @capacitor/preferences
for this create service file
step 5 : for changing splash screen and icon in capacitor 6
for use "npm install @capacitor/assets --save-dev"
Icon files should be at least 1024px x 1024px.
Splash screen files should be at least 2732px x 2732px.
for generate splash and icons use this https://apetools.webprofusion.com/#/tools/imagegorilla
after that opne android studio expand the path in android/app/src/main/res
right click on res folder then new, then imageAsset click
select the path by downloaded icon click on next then finish it will update the icon
for splash screen copy generated fils from apetools and paste in the res folder

step 6 : while build apk getting below mentioned error
Duplicate class android.support.v4.app.INotificationSideChannel found in modules classes?
sol :for this mentioned error added below properties in "gradle.properties" file

android.useAndroidX=true

android.enableJetifier=true
