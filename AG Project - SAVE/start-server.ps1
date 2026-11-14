<#
.SYNOPSIS
  Lightweight Local Web Server for "SAVE America" Petition Platform.
  Runs directly in standard Windows PowerShell with zero external dependencies.
#>

$port = 8080
$listener = New-Object System.Net.HttpListener
$url = "http://localhost:$port/"
$listener.Prefixes.Add($url)

try {
  $listener.Start()
  Write-Host "==========================================================" -ForegroundColor Cyan
  Write-Host " ★ SAVE AMERICA PETITION PLATFORM IS RUNNING! ★" -ForegroundColor Yellow
  Write-Host " Serving at: $url" -ForegroundColor Green
  Write-Host " Opening in your default web browser..." -ForegroundColor Gray
  Write-Host " Press Ctrl+C in this terminal window to stop." -ForegroundColor DarkGray
  Write-Host "==========================================================" -ForegroundColor Cyan

  # Auto-open browser
  Start-Process $url

  $mimeTypes = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".json" = "application/json"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
  }

  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $localPath = $request.Url.LocalPath
    if ($localPath -eq "/" -or $localPath -eq "") {
      $localPath = "/index.html"
    }

    $filePath = Join-Path $PSScriptRoot $localPath.TrimStart('/')

    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $mime = $mimeTypes[$ext]
      if (-not $mime) { $mime = "application/octet-stream" }
      $response.ContentType = $mime

      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $response.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
      $response.OutputStream.Write($msg, 0, $msg.Length)
    }

    $response.Close()
  }
} catch {
  Write-Host "Server stopped or error: $_" -ForegroundColor Red
} finally {
  $listener.Stop()
}
