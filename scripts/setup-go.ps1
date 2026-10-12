$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$projectRoot = Split-Path -Parent $PSScriptRoot
$toolsDir = Join-Path $projectRoot '.tools'
$goBinary = Join-Path $toolsDir 'go\bin\go.exe'
$goVersion = (Get-Content -LiteralPath (Join-Path $projectRoot '.go-version') -Raw).Trim()

if ($env:PROCESSOR_ARCHITECTURE -ne 'AMD64') {
    throw 'This helper supports Windows x64. Install Go from https://go.dev/dl/ on other systems.'
}
if (Test-Path -LiteralPath $goBinary) {
    & $goBinary version
    if ($LASTEXITCODE -ne 0) { throw 'The local Go toolchain failed.' }
    exit 0
}

$releases = Invoke-RestMethod 'https://go.dev/dl/?mode=json&include=all'
$release = $releases | Where-Object { $_.version -eq "go$goVersion" }
$archive = $release.files | Where-Object { $_.os -eq 'windows' -and $_.arch -eq 'amd64' -and $_.kind -eq 'archive' }
if (-not $archive) { throw "No official Windows x64 archive was found for Go $goVersion." }

New-Item -ItemType Directory -Path $toolsDir -Force | Out-Null
$archivePath = Join-Path $toolsDir $archive.filename
Write-Output "Download Go $goVersion to .tools."
Invoke-WebRequest "https://go.dev/dl/$($archive.filename)" -OutFile $archivePath -UseBasicParsing
$actualHash = (Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash
if ($actualHash -ne $archive.sha256) { throw 'The Go archive checksum does not match.' }
Expand-Archive -LiteralPath $archivePath -DestinationPath $toolsDir
& $goBinary version
if ($LASTEXITCODE -ne 0) { throw 'The local Go toolchain failed.' }
