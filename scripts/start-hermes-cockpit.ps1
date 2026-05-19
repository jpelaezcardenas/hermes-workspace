param(
    [ValidateSet("cards", "events", "control", "watchers", "approval-queue", "claude-sessions", "claude-lifecycle")]
    [string]$Source = "control",
    [switch]$Smoke,
    [switch]$ListSources
)

$ErrorActionPreference = "Stop"

$ScriptDir = $PSScriptRoot
$RepoRoot = Split-Path -Parent $ScriptDir
$ManifestPath = Join-Path $RepoRoot "prototypes\hermes-cockpit\Cargo.toml"
$SourceCatalog = Join-Path $RepoRoot "docs\hermes-cockpit\projection-sources.json"

$SourcePaths = @{
    cards = "docs\hermes-cockpit\live-kanban-projection.json"
    events = "target\hermes-cockpit-m010\hermes-projection.json"
    control = "target\hermes-cockpit-m012\control-plane-projection.json"
    watchers = "target\hermes-cockpit-m013\watcher-projection.json"
    "approval-queue" = "target\hermes-cockpit-m015\approval-queue-surface-projection.json"
    "claude-sessions" = "target\hermes-cockpit-m018\claude-sessions-projection.json"
    "claude-lifecycle" = "target\hermes-cockpit-m021\claude-lifecycle-projection.json"
}

if ($ListSources) {
    Write-Output "Source catalog: $SourceCatalog"
    foreach ($name in @("cards", "events", "control", "watchers", "approval-queue", "claude-sessions", "claude-lifecycle")) {
        Write-Output ("{0,-8} {1}" -f $name, $SourcePaths[$name])
    }
    exit 0
}

$ProjectionPath = $SourcePaths[$Source]
$ProjectionFullPath = Join-Path $RepoRoot $ProjectionPath
if (-not (Test-Path -LiteralPath $ProjectionFullPath)) {
    throw "Projection source is missing: $ProjectionFullPath"
}

Write-Output "Starting Hermes Cockpit source=$Source path=$ProjectionPath"
Write-Output "Read-only: this launcher only starts or smokes the TUI."

$CargoArgs = @("run", "--manifest-path", $ManifestPath, "--")
if ($Smoke) {
    $CargoArgs += "--smoke"
}
$CargoArgs += $ProjectionPath

Push-Location -LiteralPath $RepoRoot
$PreviousErrorActionPreference = $ErrorActionPreference
try {
    $ErrorActionPreference = "Continue"
    & cargo @CargoArgs
    if ($null -eq $LASTEXITCODE) {
        $ExitCode = 0
    } else {
        $ExitCode = [int]$LASTEXITCODE
    }
} finally {
    $ErrorActionPreference = $PreviousErrorActionPreference
    Pop-Location
}
exit $ExitCode
