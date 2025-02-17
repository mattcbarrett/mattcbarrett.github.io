---
  title: Automated Onboarding, Part 4 - Provisioning
  date: 2/7/2025
  author: Matt
  tags: 
    - Entra ID
    - SCIM
  header_image: /images/automated-onboarding-part-4/mike-kononov-lFv0V3_2H6s-unsplash_cropped.jpg
---

To recap, we've [streamlined joining systems to Entra ID](/posts/automated-onboarding-part-1), [automated software deployment](/posts/automated-onboarding-part-2), and [set up a one-click account creation process](/posts/automated-onboarding-part-3). Depending on the size of your tech stack that may be sufficient, however, those last three articles don't help with non-Microsoft platforms like Zoom or Slack. SCIM is the solution.

### What is SCIM?

SCIM is a [protocol](https://scim.cloud/) that allows for identity management between different platforms. It allows for automatic provisioning of accounts in other platforms based on an central identity store, in this case, Entra ID. Most platforms will sync your Groups via SCIM as well, turning this into a powerful way to apply permissions across SaaS platforms.

Now, before we get too far, there's a catch - SCIM is commonly bundled with SSO and gatekept behind higher-tier SKUs by many platforms. See [ssotax.org](https://ssotax.org/) for a list. Sometimes this is a moderate increase, but all too often it can double your subscription cost. It's unfortunate that companies leverage this as an additional revenue stream, but that's the state of the market today.

### Setting up dynamic groups

SCIM really shines when combined with dynamic groups, allowing accounts to be provisioned based on department, team, or focus area. Once you assign a group to an Enterprise App with Provisioning enabled, accounts will be created in that app for all group members. Most platforms sync the groups too, so you can assign permissions within those other platforms based on your groups from Entra ID. This is a really powerful way to automatically apply permissions in your SaaS platforms.

So, head off to Entra ID and open up the Groups pane. Create a new group, give it a name, and choose the "Dynamic" membership type. Now you can create rules that will determine the group's membership. If you need a step-by-step, Microsoft's got one for you [here](https://learn.microsoft.com/en-us/entra/identity/users/groups-create-rule). I would recommend creating dynamic groups for each department in your company as a starting point. I might suggest also creating an "All Employees" group, maybe based on the Company attribute, that you can use for automatic Microsoft 365 license assignments.

### Setting up provisioning

To set up provisioning, you need to add an Enterprise App in Entra ID for the SaaS platform you want to integrate. Microsoft has documentation for a *ton* of different platforms - here's the one for [Zoom](https://learn.microsoft.com/en-us/entra/identity/saas-apps/zoom-provisioning-tutorial) as an example. Pro tip - set this up from [portal.azure.com](https://portal.azure.com) NOT through [entra.microsoft.com](https://entra.microsoft.com). For some reason Microsoft only makes certain settings editable in the Azure portal. Save yourself some grief.

When you're setting up provisioning for the app, take note of the scope option:

![provisioning scope](/images/automated-onboarding-part-4/onboarding_part4_provisioning01.png)

If you're setting up something like a training platform for cybersecurity or compliance, having it sync everything is probably the play, just for simplicity's sake. However, if you set it to only sync the assigned users and groups, that's when you can start to control platform access on a granular basis.

Ok, so now provisioning is set up and enabled. Two things to note: 1. the provisioning cycle is on a 40-minute timer, and 2. disabled accounts aren't provisioned in the destination platform. You may recall from [part 3](/posts/automated-onboarding-part-3) that our powershell script creates accounts in a disabled state. You'll need to add a step to your onboarding process to manually go and enable the account prior to the employee's first day so the provisioning cycle has a chance to run. Should you forget to do so and the employee is at their keyboard, ready to log in, go enable the account and then use the Provision on demand function to run a one-off cycle just for that account.