param(
  [string]$ShortcutName = "99Pages Agentic OS",
  [string]$Hotkey = "CTRL+ALT+H"
)

$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$desktop = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktop "$ShortcutName.lnk"
$target = "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe"
$scriptPath = Join-Path $root "scripts\start-windows-desktop.ps1"
$iconPath = Join-Path $root "assets\icon.png"

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $target
$shortcut.Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$scriptPath`""
$shortcut.WorkingDirectory = $root
$shortcut.Description = "Launch 99Pages Agentic OS desktop workspace"
$shortcut.Hotkey = $Hotkey
if (Test-Path $iconPath) {
  $shortcut.IconLocation = $iconPath
}
$shortcut.Save()

Write-Host "Created desktop shortcut: $shortcutPath"
Write-Host "Shortcut key: $Hotkey"
