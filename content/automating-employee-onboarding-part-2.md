---
  title: Automating Employee Onboarding, Part 2 - Software Deployment
  date: 11/2/2024
  author: Matt
  tags: 
    - Intune
    - Enrollment Status Page
---

![cityscape](/images/automating-employee-onboarding-part-2/iyus-sugiharto-Eh1xd5xDE-s-unsplash.jpg)

### Win32 vs Line of Business

There's two ways to install 3rd party Windows apps through Intune, Win32 (exe/msi) and Line of business (msi). LOB apps can be uploaded directly in the Intune portal, which is great, if the app's developer provides an msi installer. Win32 apps can be either exe or msi, but you have to use Microsoft's Content Prep Tool to package it before uploading to Intune. Mixing the two can apparently lead to delays during deployment according to the research I've done (r/sysadmin, r/intune), so we'll focus on Win32 deployment in this article.

### Packaging with the Content Prep Tool

Grab the [Content Prep Tool](https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool) and choose an app from your tech stack that ships an installer in exe format. Create two folders alongside the tool called "apps" and "packages" respectively. Place the exe under the "apps" folder, open a terminal window, and navigate to the location of the tool. To create a package, run:

```
IntuneWinAppUtil.exe -c ./apps -s name_of_the_installer.exe -o ./packages
```

Now open the Intune portal and navigate to Apps > Windows and add a new app, choosing Win32 for the type. Upload your package and fill out the name, description, and publisher. On the next page, enter the executable's name + install flags in the "install command" field like so:

```
name_of_the_installer.exe /s /q
```

For the uninstall string, since we're testing, you could just put the same command as the install string. However, to do it right, you'll need to install the app on a test system and pull the uninstall string from the registry. To display all apps & their uninstall strings, run:

```
Get-ChildItem -Path HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall, HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall | Get-ItemProperty | Select-Object -Property DisplayName, UninstallString | Sort-Object -Property DisplayName | fl
```

Or if you want to search by app name:

```
Get-ChildItem -Path HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall, HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall | Get-ItemProperty | Select-Object -Property DisplayName, UninstallString | Where-Object {$_.DisplayName -Match "app_name_here" }
```

Copy the uninstall string and pop it into the "uninstall command" field in Intune.

Hit next and set an architecture and a minimum OS version. You can set further restrictions based on hardware specs or script output if needed.

Click next again and we're brought to the detection rules. I typically just use the "file" rule type, enter the path to the main application executable, and "exists" for the detection method. Again, you'll have to look at a system that already has the app installed to figure this out.

Hit next through both Dependencies and Supersedence, which should bring us to where the magic happens: Assignments. There's 3 options here, Required, Available, and Uninstall. These function how you'd expect: Required will install the app, Available will list the app in the Company Portal, and Uninstall will remove the app.

### Entra ID groups vs Virtual Groups

You may have noticed the 3 links that say "Add group," "Add all users," and "Add all devices." This seems straightforward, but there's ramifications for the Autopilot process.

When the device registers for MDM during Autopilot, the Intune Management Extension Agent is downloaded and installed. The IME Agent then checks in with Intune and downloads its group memberships and associated software assignments. Now, the thing about groups is they only exist in Entra ID; they sync back and forth with Intune. Because the device _just_ registered, dyanmic groups in Entra ID have no idea it exists yet because of the delay caused by the sync mechanism. So even though you have a dynamic group with an expression that captures all devices manufactured by Dell, for example, the device isn't there when the IME Agent reads the group's membership list. This means the software assigned to it won't install during Autopilot, and the 60-minute Win32App timer has to expire before checking again.

This is why Intune has the All Users and All Devices "virtual" groups. These groups only exist in Intune, and All Devices is updated immediately upon MDM registration. Consequently, when the IME Agent checks in, the device is a member of the group, the assignments are found, and the software will install during Autopilot. Microsoft's docs on virtual groups (and filtering) is [here](https://learn.microsoft.com/en-us/mem/intune/fundamentals/filters-performance-recommendations#virtual-groups).

The next question is how to target devices when the groups clearly say _all_. This is where filters come in. Open Intune agian in a new tab and navigate to Devices > Organize devices > Filters and choose Create > Managed devices. Type "Company-owned devices" for the name and "Windows 10 or later" for the Platform and hit next.

![screenshot of filter expression](/images/automating-employee-onboarding-part-2/autopilot_part2_filters.png)

This is where you can create rules to match devices based on manufacturer, model, and device name, among others. The screenshot above is how you can match company-owned devices. Systems joined via Autopilot are marked as Corporate automatically, so this is a great way to ensure that software doesn't install on personal devices. You could also match "SEA" in a device name, for example, to filter devices based in Seattle.

Now, should apps be assigned to Users or Devices? The answer is both. During Autopilot device prep, the system will install device-assigned applications first, so EDR and RMM are good apps to assign this way. Once those install, the system reboots and the user signs in again, triggering installation of user-assigned applications. This is where you want to assign things like Slack, Zoom, etc. This also benefits you if a user signs into a different device that's already joined to Intune; the apps will install under the user profile on the new device too.

Ok, so let's finish adding this app. Assign it as "Required" for the All Devices virtual group, hit next, and create.

### Configuring the Enrollment Status Page

At this point, a device could be handed off to a new employee, they could log in, and the apps would download and install. However, nothing during OOBE will tell them this, they'll hit the desktop while apps are still installing, and odds are the first app they check for is the last one to install. So, lets save the service desk a few calls and configure the Enrollment Status Page to keep users informed during the whole Autopilot process.

Navigate to Devices > Device onboarding > Enrollment and click Enrollment Status Page. Create a profile, name it, and hit next. Set "Show app and profile configuration progress" to yes, and customize the settings as necessary.

![screenshot of enrollment status page](/images/automating-employee-onboarding-part-2/autopilot_part2_esp.png)

Before proceeding, double check that last setting titled "Block device use until all apps and profiles are installed." This is one of the most poorly named settings I've ever seen from Microsoft (which is saying a lot). If you turn this on, your user-assigned apps **will not** install during Autopilot. It's meant for the white-glove Autopilot deployment scenario, where IT pre-installs apps on the device before a user receives it. In that scenario, turning the setting on allows all of the user-assigned applications to install during the white-glove process. However, in the User-driven scenario that we're using, turning it on causes user-assigned apps to be skipped entirely during OOBE. A new employee will sign in, reach the desktop, and there won't be a single app in sight. Once that 60-minute Win32App timer expires, they'll all install of course, but in the mean time that new employee's been stuck twiddling their thumbs. So, be sure to turn that setting off.

Hit next, assign the profile to all devices, skip the scope tags, and create the policy. Now run through Autopilot on a test system again. This time, you should see a status page while the device installs its assigned applications, and when it reaches the desktop, all the apps should be ready to go.

Alright, now that we've automated software installation, let's move on to accounts: [Part 3 - Automating Account Creation](/posts/automating-employee-onboarding-part-3)
