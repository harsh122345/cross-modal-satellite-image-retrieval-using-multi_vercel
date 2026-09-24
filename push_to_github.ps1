Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "  Uploading Project to GitHub:" -ForegroundColor Cyan
Write-Host "  harsh122345/cross-modal-satellite-image-retrieval-using-multi_vercel" -ForegroundColor Yellow
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot

# 1. Resolve Git executable path
$gitCmd = "git"
$gitFound = $false

try {
    $null = Get-Command git -ErrorAction Stop
    $gitFound = $true
} catch {
    # Check default install directories
    $commonPaths = @(
        "$env:ProgramFiles\Git\cmd\git.exe",
        "${env:ProgramFiles(x86)}\Git\cmd\git.exe",
        "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
    )
    foreach ($p in $commonPaths) {
        if (Test-Path $p) {
            $gitCmd = $p
            $env:Path = (Split-Path $p) + ";" + $env:Path
            $gitFound = $true
            break
        }
    }
}

# 2. If not found, attempt install via winget
if (-not $gitFound) {
    Write-Host "[NOTICE] Git is not installed or not in PATH." -ForegroundColor Yellow
    Write-Host "Attempting automatic installation using Windows Package Manager (winget)..." -ForegroundColor Yellow
    try {
        winget install --id Git.Git -e --source winget
        # Re-check paths after install
        $commonPaths = @(
            "$env:ProgramFiles\Git\cmd\git.exe",
            "${env:ProgramFiles(x86)}\Git\cmd\git.exe",
            "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
        )
        foreach ($p in $commonPaths) {
            if (Test-Path $p) {
                $gitCmd = $p
                $env:Path = (Split-Path $p) + ";" + $env:Path
                $gitFound = $true
                break
            }
        }
    } catch {
        Write-Host "Winget install failed or unavailable." -ForegroundColor Red
    }
}

if (-not $gitFound) {
    Write-Host ""
    Write-Host "[ACTION REQUIRED] Git is required to push to GitHub." -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Then re-run this command: .\push_to_github.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "Using Git: $gitCmd" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Staging all project files..." -ForegroundColor Green
& $gitCmd add -A

Write-Host "[2/4] Committing changes..." -ForegroundColor Green
& $gitCmd commit -m "Upload Cross-Modal Satellite Image Retrieval with Vercel, FastAPI, Opening Animation & Soundtrack"

Write-Host "[3/4] Setting main branch..." -ForegroundColor Green
& $gitCmd branch -M main

Write-Host "[4/4] Pushing to GitHub repository..." -ForegroundColor Green
& $gitCmd push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Attempting forced push in case remote contains conflicting initial files..." -ForegroundColor Yellow
    & $gitCmd push -u origin main --force
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "===================================================================" -ForegroundColor Green
    Write-Host "[SUCCESS] Project uploaded successfully to:" -ForegroundColor Green
    Write-Host "https://github.com/harsh122345/cross-modal-satellite-image-retrieval-using-multi_vercel" -ForegroundColor Cyan
    Write-Host "===================================================================" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Git push failed. Please verify GitHub authentication credentials." -ForegroundColor Red
}
