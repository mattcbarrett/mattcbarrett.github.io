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

Onboarding new employees can be a time consuming process. Moreso if the company is growing at a steady clip and bringing on multiple employees per month (or even per week.) Hardware needs to be put in their hands prior to their start date, accounts created for them in a multitude of SaaS apps, software installed, credentials sent; and by the way, they're starting Monday. The strife that inadequate lead time causes between the business and IT is a tale as old as time.

The goal of these articles is to provide solutions that remove IT as a blocker from the onboarding process. The series is split into 4 parts, each covering a different part of IT's process. By the end, shipping time will be the only constraint for a new hire's start date.

### Part 1 - Autopilot

Autopilot is the cornerstone of this approach. It streamlines device setup by automatically installing applications and configuring the the system when the user first logs in, using the existing image installed by the manufacturer. From the user's perspective, they sign in, wait a few minutes for apps to install, and then they're at the desktop. From your perspective, all it took was shipping a laptop.

There's [two ways](https://learn.microsoft.com/en-us/autopilot/device-preparation/compare) to set this up. The newer method is called "Windows Autopilot device preparation," and while it's less work to set up initially, it's not as streamlined for the end-user. They're still prompted to either "Set up for personal use" or "Set up for work or school." Choosing the wrong option means you're walking them through joining Entra ID from settings or doing it for them remotely, which isn't the automated approach we're aiming for. So, in this article, we'll focus on the classic "Windows Autopilot" method.

With Windows Autopilot, devices are pre-registered with Microsoft either by the manufacturer, by a reseller/partner, or manually by you. A combination of a "hardware hash," the Windows product key, or the manufacturer name, model, and serial number can all be used for registering the device with your Azure tenant. Microsoft's documentation on the topic is [here](https://learn.microsoft.com/en-us/autopilot/registration-overview), or if you really want to dive in, see this [blog post](https://oofhours.com/2020/01/29/windows-autopilot-device-registration-options-for-partners-using-the-tuple/). _TLDR: Email your reseller, tell them you want to set this up, and then all the systems you order from them will be registered in Autopilot for you._

In the mean time, let's register a test system manually so you can see what the user experience is.

First, we need to automatically register Windows devices with Intune MDM when they join Entra ID. Navigate to Intune > Devices > Windows > Enrollment > Automatic Enrollment and set both the MDM user scope and WIP user scope to All.

Second, we need to configure a Deployment profile, which is what triggers the streamlined OOBE process. Navigate to Intune > Devices > Windows > Enrollment > Windows Autopilot deployment profiles and create one.

Third, we'll configure the Enrollment Status Page. This is what communicates to the user where they're at in the app installation and device configuration process. Navigate to Intune > Devices > Windows > Enrollment > Enrollment Status Page and create one. Do NOT select "Block device use until all apps and profiles are installed." That will install apps with a device assignment, however, apps that are assigned to users will be delayed by an hour. Your users will hit the desktop app-less, which, again, not the automated approach we want.

Speaking of apps, let's add one quick so we can see what it looks like from the user's perspective. Go grab the MSI installer for Zoom and use the intune app prep tool to package it for deployment.

Alright, now we can manually register a device with Autopilot and run through the process end-to-end to see what the user experience looks like. Install a fresh copy of windows on your test system, and run through the OOBE far enough to connect to wifi. Once connected, hit Shift + F10 to bring up the terminal and run powershell.exe. Follow the steps [here](https://learn.microsoft.com/en-us/autopilot/add-devices#directly-upload-the-hardware-hash-to-an-mdm-service) to capture & upload the system's hash directly to Intune.

Now that it's registered, leave it there a moment and switch to the Intune portal. Navigate to Intune > Devices > Windows > Enrollment > Devices and see if your test system is there, hitting refresh a few times if not. Once it appears, tick the box next to it and assign it to yourself. You can name it here too. With that done, reboot your test system. When the OOBE launches this time, it should ask you to sign in by name, after which it will install any assigned applications and apply any assigned configuration profiles.

That's it, slick huh. The next time you order a system, the manufacturer handled that registration step for you, so all you've got to do is assign it to them (or not - they'll just be asked to enter their username too.)

Right, now that we've automated device setup, let's get your baseline apps added so they install automatically: [Part 2 - Deploying Software with Intune](/posts/automating-employee-onboarding-part-2)
