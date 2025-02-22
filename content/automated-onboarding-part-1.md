---
  title: Automated Onboarding, Part 1 - Autopilot
  date: 10/8/2024
  author: Matt
  tags: 
    - Intune
    - Autopilot
  header_image: /images/automated-onboarding-part-1/kent-pilcher-jW8hkB_Qmj8-unsplash.jpg
---

# Introduction

Onboarding employees can be time consuming, especially if IT is creating accounts and installing software manually. Adequate lead time from the business is necessary to account for IT's workload, hardware and software procurement, and setup. Often that lead time conflicts with when the employee needs to start work, leading to frustration for all involved. The goal of these posts is to provide solutions that remove IT as a blocker from the onboarding process. 

The series consists of four parts, each covering a different stage of IT's process, and in the end shipping time will be the only constraint for new hire's start dates. Let's start with device setup.

# Autopilot

Autopilot is the cornerstone of an automated approach to setup. It automatically configures the system and installs applications when the user first logs in, using the existing image installed by the manufacturer. From the user's perspective, they sign in, wait a few minutes for apps to install, and then they're at the desktop. From IT's perspective, all it took was shipping a laptop.

There's [two ways](https://learn.microsoft.com/en-us/autopilot/device-preparation/compare) to set this up. The newer method is called "Windows Autopilot device preparation," and while it's less work to set up initially, it's not as streamlined for the end-user. They're still prompted to either "Set up for personal use" or "Set up for work or school," and choosing the wrong option means you're walking them through manually joining Entra ID, or doing it for them. Not the automated approach we're aiming for. So, in this article, we'll focus on the classic "Windows Autopilot" method.

With Windows Autopilot, devices are pre-registered with Microsoft either by the manufacturer, by a reseller/partner, or manually by you. A combination of a "hardware hash," the Windows product key, or the manufacturer name, model, and serial number can all be used for registering the device with your Azure tenant. Microsoft's documentation on the topic is [here](https://learn.microsoft.com/en-us/autopilot/registration-overview), or if you really want to dive in, see this [blog post](https://oofhours.com/2020/01/29/windows-autopilot-device-registration-options-for-partners-using-the-tuple/). *TLDR: Email your reseller, tell them you want to set this up, and moving forward all the systems you order from them will be registered in Autopilot for you.*

In the mean time, let's manually register a test system to get a feel for what the user will experience.

# Automatic enrollment, deployment profiles, and the enrollment status page

First, we need to set up automatic device registration with Intune MDM when a system joins Entra ID. To do this, navigate to Intune > Devices > Windows > Enrollment > Automatic Enrollment and set both the MDM user scope and WIP user scope to All.

Second, we need to configure a deployment profile, which is what triggers the streamlined OOBE process. Navigate to Intune > Devices > Windows > Enrollment > Windows Autopilot deployment profiles and create one.

Third, we'll configure an Enrollment Status Page. Without it, the system will still join Entra ID, the user can still log in, and the apps will still install. However, nothing during OOBE will tell them their apps are installing. They'll just hit the desktop and the only indication something's happening is a desktop icon popping up every few minutes. Lets configure the Enrollment Status Page to keep users informed during the process. It'll save you some calls.

Navigate to Devices > Device onboarding > Enrollment and click Enrollment Status Page. Create a profile, name it, and hit next. Set "Show app and profile configuration progress" to yes, and customize the settings as necessary.

![screenshot of enrollment status page](/images/automated-onboarding-part-1/autopilot_part1_esp.png)

Before proceeding, double check that last setting titled "Block device use until all apps and profiles are installed." This is one of the most poorly named settings I've ever seen from Microsoft (which is saying a lot.) If you turn this on, your user-assigned apps **will not** install during Autopilot. It's meant for the white-glove Autopilot deployment scenario, where IT pre-installs apps on the device before a user receives it. In that scenario, turning the setting on allows all of the user-assigned applications to install during the white-glove process. However, in the User-driven scenario that we're using, turning it on causes user-assigned apps to be skipped entirely during OOBE. A new employee will sign in, reach the desktop, and there won't be a single app in sight. Once the Intune Management Extension agent's 60-minute Win32App timer expires, they'll all install, but in the mean time that new employee's been stuck twiddling their thumbs. So, turn that setting off.

Hit next, assign the profile to all devices, skip the scope tags, and create the policy.

Alright, now we can manually register a device with Autopilot and run through the process end-to-end to see what the user experience looks like. Install a fresh copy of windows on your test system, and run through the OOBE far enough to connect to wifi. Once connected, hit Shift + F10 to bring up the terminal and run powershell.exe. Follow the steps [here](https://learn.microsoft.com/en-us/autopilot/add-devices#directly-upload-the-hardware-hash-to-an-mdm-service) to capture & upload the system's hash directly to Intune.

Now that it's registered, leave it there a moment and switch to the Intune portal. Navigate to Intune > Devices > Windows > Enrollment > Devices and see if your test system is there, hitting refresh a few times if not. Once it appears, tick the box next to it and assign it to yourself. You can name it here too. With that done, reboot your test system. When the OOBE launches this time, it should ask you to sign in by name, after which it will install any assigned applications and apply any assigned configuration profiles.

That's it. The next time you order a system, the manufacturer handled that registration step for you, so all you've got to do is assign it to them (or not - they'll just be asked to enter their username too.)

Right, now that we've automated joining the device to Entra ID, let's get set up automatic app installation: [Part 2 - Software Deployment](/posts/automated-onboarding-part-2).