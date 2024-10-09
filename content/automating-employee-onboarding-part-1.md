---
  title: Automating Employee Onboarding, Part 1 - Autopilot
  date: 10/8/2024
  author: Matt
  tags: 
    - Intune
    - Autopilot
---

![abstract](/images/automating-employee-onboarding-part-1/kent-pilcher-jW8hkB_Qmj8-unsplash.jpg)

### Introduction

Onboarding new employees can be a time consuming process for many SMB IT teams. Moreso if the company is growing at a steady clip and bringing on multiple employees per month (or even per week.) Hardware needs to be put in their hands prior to their start date, accounts created for them in a multitude of SaaS apps, software installed, credentials sent; and by the way, they're starting Monday. The strife that inadequate lead time causes between the business and IT is a tale as old as time.

The goal of these articles is to provide solutions that remove IT as a blocker from the onboarding process. The series is split into 4 parts, each covering a different part of IT's process. By the end, shipping time will be the only constraint for a new hire's start date.

### Part 1 - Autopilot

Autopilot is the cornerstone of this approach. Once set up with your system manufacturer, either directly or through a VAR, endpoints will arrive already joined to Entra ID. This means you don't need to manually join the system or image it before handing it to a user. Just assign the system to an employee in the Intune portal and they'll be asked by name to sign in during the OOBE process. Once you assign software installers and configure the Enrollment Status Page, all of their apps will download during this process as well. They'll be assigned as the primary owner in Intune too, so they'll be able to use the Company Portal and install any software you've made available after the fact.

See Microsoft's [documentation](https://learn.microsoft.com/en-us/autopilot/registration-overview) for more info on setting this up with your manufacturer or reseller.

For now, lets set up a system to test with. Grab Microsoft's [Get-WindowsAutopilotInfo](https://www.powershellgallery.com/packages/Get-WindowsAutopilotInfo) script from Powershell Gallery and run it on your test endpoint.

Next, in the Intune portal, go to Devices > Enrollment > Devices (under the "Windows Autopilot" header, scroll down.) Click the Import button in the toolbar and upload "hardware_hash.csv." Now, tick the checkbox next to the device's serial number and hit "Assign User" in the toolbar. Assign it to yourself, or another test account, and set the device's name too while you're at it.

Now the system's hash is associated with your Entra ID tenant, functionally locking it to your organization. Go ahead and test this out by reinstalling Windows, then run through the OOBE process. You should be able to sign right in with your Entra ID account, no IT-driven, manual join required. This alone removes IT from the early stages of the hardware lifecycle. Now, at minimum, you can ship a system directly to a new employee from the manufacturer and they'll be able to log in with their company account.

If we stop here, though, we're still manually installing software. I think we can do better: [Part 2](/posts/automating-employee-onboarding-part-2)
