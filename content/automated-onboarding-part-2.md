---
  title: Automated Onboarding, Part 2 - Software Deployment
  date: 11/2/2024
  author: Matt
  tags: 
    - Intune
    - Enrollment Status Page
  header_image: /images/automated-onboarding-part-2/iyus-sugiharto-Eh1xd5xDE-s-unsplash.jpg
---

# Win32 vs Line of Business

There's primarily two ways to install 3rd party Windows apps through Intune, Win32 (exe/msi) and Line of business (msi). LOB apps can be uploaded directly in the Intune portal, which is great, if the app's developer provides an msi installer. Win32 apps can be either exe or msi, but you have to use Microsoft's Content Prep Tool to package it before uploading to Intune. I've read that mixing LOB and Win32 apps can lead to installation delays during deployment, but I've mixed the two without issue in my current environment. In any case, we'll focus on Win32 deployment in this post.

# Packaging with the Content Prep Tool

The downside to Win32 apps is they have to be packaged first, you can't upload an exe directly to the portal. So, grab the [Content Prep Tool](https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool) and choose an app from your tech stack that ships an installer in exe format. Create two folders alongside the tool called "apps" and "packages" respectively. Place the exe under the "apps" folder, open a terminal window, and navigate to the location of the tool. To create a package, run:

```
IntuneWinAppUtil.exe -c ./apps -s name_of_the_installer.exe -o ./packages
```

Now open the Intune portal and navigate to Apps > Windows and add a new app, choosing Win32 for the type. Upload your package and fill out the name, description, and publisher. On the next page, enter the executable's name + install flags in the "install command" field:

![screenshot of EXE install/uninstall strings](/images/automated-onboarding-part-2/autopilot_part2_win32_exe1.png)

For the uninstall string, since we're testing, you could just put the same command as the install string. However, to do it right, you'll need to install the app on a test system and pull the uninstall string from the registry. To display all apps & their uninstall strings, run:

```
Get-ChildItem -Path HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall, HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall | Get-ItemProperty | Select-Object -Property DisplayName, UninstallString | Sort-Object -Property DisplayName | fl
```

Or if you want to search by app name:

```
Get-ChildItem -Path HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall, HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall | Get-ItemProperty | Select-Object -Property DisplayName, UninstallString | Where-Object {$_.DisplayName -Match "app_name_here" }
```

Copy the uninstall string and pop it into the "uninstall command" field in Intune.

Hit next, set an architecture, and set a minimum OS version. You can set further restrictions based on hardware specs or script output if needed.

Click next again and we're brought to the detection rules. I typically just use the "file" rule type, enter the path to the main application executable, and "exists" for the detection method. Again, you'll have to look at a system that already has the app installed to figure this out.

![screenshot of EXE detection rule](/images/automated-onboarding-part-2/autopilot_part2_win32_exe2.png)

Hit next through both Dependencies and Supersedence, which should bring us to where the magic happens: Assignments. There's 3 options here: Required, Available, and Uninstall. These function how you'd expect: Required will install the app, Available will list the app in the Company Portal, and Uninstall will remove the app.

# Entra ID groups vs Virtual Groups

You may have noticed the 3 links that say "Add group," "Add all users," and "Add all devices." This seems straightforward, but there's ramifications for the Autopilot process.

When the device registers for MDM during Autopilot, the Intune Management Extension agent is downloaded and installed. The IME agent then checks in with Intune and downloads it's group memberships and associated software assignments. Now, the thing about groups is they only exist in Entra ID; they sync back and forth with Intune. Because the device *just* registered, dyanmic groups in Entra ID have no idea it exists yet because the sync from Intune to Entra hasn't taken place. So even though you have a dynamic group with an expression that captures all devices manufactured by Dell, for example, the device isn't there when the IME agent retrieves the group membership from Intune. This means the software assigned to it won't install during Autopilot, and the 60-minute Win32App timer has to expire before checking again.

This is why Intune has the All Users and All Devices "virtual" groups. These groups only exist in Intune, and All Devices is updated immediately upon MDM registration. Consequently, when the IME agent checks in, the device is a member of the group, the assignments are found, and the software will install during Autopilot. Microsoft's docs on virtual groups (and filtering) is [here](https://learn.microsoft.com/en-us/mem/intune/fundamentals/filters-performance-recommendations#virtual-groups).

The next question is how to target a subset of devices when the groups clearly say *all*. This is where filters come in. Open Intune again in a new tab and navigate to Devices > Organize devices > Filters and choose Create > Managed devices. Type "Company-owned devices" for the name and "Windows 10 or later" for the Platform and hit next.

![screenshot of filter expression](/images/automated-onboarding-part-2/autopilot_part2_filters.png)

This is where you can create rules to match devices based on manufacturer, model, and device name, among others. The screenshot above is how you can match company-owned devices. Systems joined via Autopilot are marked as Corporate automatically, so this is a great way to ensure that software doesn't install on personal devices. You could also match "SEA" in a device name, for example, to filter devices based in Seattle.

Now, should apps be assigned to Users,  or to Devices? The answer is both. During Autopilot device prep, the system will install device-assigned applications first, so EDR and RMM are good apps to assign this way. Once those install, the system reboots and the user signs in again, triggering installation of user-assigned applications. This is where you want to assign things like Slack, Zoom, etc. This also benefits you if a user signs into a different device that's already joined to Intune; the apps will install under the user profile on the new device too.

Ok, enough explanation. Finish adding the app by assigning it as "Required" for either All Devices or All Users, apply a filter if you created one, then hit next and create. Now when you run through autopilot you'll see the app installing on the Enrollment Status Page.

# ...MSI installers are easier

Earlier I mentioned that Win32 app deployment also supports MSI format installers. The process is the same for the Content Prep Tool, but when you upload it to Intune, the install string, the uninstall string, and the detection rule are automatically pulled from the MSI and populated for you.

![screenshot of MSI install/uninstall strings](/images/automated-onboarding-part-2/autopilot_part2_win32_msi1.png)

![screenshot of MSI detection rule](/images/automated-onboarding-part-2/autopilot_part2_win32_msi2.png)

Figuring out the install/uninstall strings and building a detection rule every time you add an app sucks, so I use an MSI when available.

Alright, now that we've automated software installation, let's move on to accounts: [Part 3 - Automating Account Creation](/posts/automated-onboarding-part-3)
