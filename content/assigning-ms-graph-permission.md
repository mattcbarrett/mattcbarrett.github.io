---
  title: Assigning MS Graph permissions to managed identities in Azure
  date: 10/23/2024
  author: Matt
  tags: 
    - Azure
    - MS Graph
    - Powershell
---

![abstract](/images/assigning-ms-graph-permission/flyd-zAhAUSdRLJ8-unsplash_cropped.jpg)

### Assigning permission

Recently I needed to grant a Powershell script, running in a Function App in Azure, access to read the properties of devices in Intune. I quickly generated a managed identity for the app and went to assign it the "DeviceManagementManagedDevices.Read.All" permission for MS Graph. It turned out that none of the built-in roles in Azure included this permission, and that it was necessary to use use Powershell instead.

The examples I found used the deprecated AzureAD powershell module, so I built a new script with the updated Az module. The code is below, just be sure to fill in the Object Id for your managed identity, and the permission(s). For reference, the permissions for Graph can be found [here](https://learn.microsoft.com/en-us/graph/permissions-reference).

Be sure you have the necessary modules installed first:

```powershell
Install-Module Az.Resources -Scope CurrentUser
```

```powershell
Connect-AzAccount
$managedIdentitySPN = ''
$msGraphPermissions = ''

$msGraphAppId = '00000003-0000-0000-c000-000000000000'
$msGraphSPN = Get-AzADServicePrincipal -Filter "appId eq '$msGraphAppId'"
$appRoles = $msGraphSPN.AppRole | Where-Object {$_.Value -in $msGraphPermissions -and $_.AllowedMemberType -contains 'Application'}
$appRoles | % { New-AzADServicePrincipalAppRoleAssignment -ServicePrincipalId $managedIdentitySPN -ResourceId $msGraphSPN.Id -AppRoleId $_.Id }
```
