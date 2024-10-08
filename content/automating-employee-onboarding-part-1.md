---
  title: Automating Employee Onboarding - Part 1, Autopilot
  date: 10/8/2024
  author: Matt
  tags: 
    - Intune
    - Autopilot
---

### Introduction

Onboarding new employees can be a time consuming process for many SMB IT teams. Moreso if the company is growing at a steady clip and bringing on multiple employees per month (or even per week.) Hardware needs to be put in their hands prior to their start date, accounts created for them in a multitude of SaaS apps, software installed, credentials sent; and by the way, they're starting Monday. The strife caused between the business and IT due to inadequate lead time is a tale as old as time.

The goal of these articles is to provide solutions that remove IT as a blocker from the onboarding process. The series is split into 4 parts, each covering a different part of IT's process. By the end, shipping time will be the only constraint for a new hire's start date.

### Part 1 - Autopilot

Autopilot is the cornerstone of this approach. Once set up with your system manufacturer, either directly or through a VAR, endpoints will arrive already joined to Entra ID. This means you don't need to manually join the system or image it before handing it to a user. Just assign the system to an employee in the Intune portal and they'll be asked by name to sign in during the OOBE process. Once you assign software installers and configure the Enrollment Status Page, all of their apps will download during this process as well. They'll be assigned as the primary owner in Intune too, so they'll be able to use the Company Portal and install any software you've made available after the fact.

See Microsoft's [documentation](https://learn.microsoft.com/en-us/autopilot/registration-overview) for more info. If you buy directly from a manufacturer or through a VAR, look into OEM registration. If your MSP purchases systems on your behalf, see Partner registration.

In the Intune portal, go to Devices > Enrollment > Devices (under the "Windows Autopilot" header, scroll down) to assign systems. Tick the checkbox next to the device's serial number and hit "Assign User" in the toolbar. You can set the device's name from the same pane as well.
