# Gateway AI Test Launcher
Write-Host "🚀 Starting Gateway AI Test Server..." -ForegroundColor Cyan

# Start HTTP server in background
$serverJob = Start-Job -ScriptBlock {
    Set-Location "C:\Users\Achariya\project\everything-gateway\ai"
    python -m http.server 3000
}

# Wait a moment for server to start
Start-Sleep -Seconds 2

Write-Host "✅ Server starting on http://localhost:3000" -ForegroundColor Green
Write-Host "🌐 Opening test page in browser..." -ForegroundColor Yellow

# Try to open in default browser
try {
    Start-Process "http://localhost:3000/simple-test.html"
    Write-Host "🎉 Test page should open in your browser!" -ForegroundColor Green
    Write-Host "" 
    Write-Host "Available test pages:" -ForegroundColor White
    Write-Host "• http://localhost:3000/simple-test.html - Basic functionality test" -ForegroundColor Gray
    Write-Host "• http://localhost:3000/demo.html - Full feature demo" -ForegroundColor Gray
    Write-Host "• http://localhost:3000/test-gateway-ai.html - Step-by-step testing" -ForegroundColor Gray
    Write-Host "• http://localhost:3000/index.html - Full Gateway AI system" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Press any key to stop the server..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
} catch {
    Write-Host "⚠️ Could not auto-open browser. Please manually go to:" -ForegroundColor Yellow
    Write-Host "http://localhost:3000/simple-test.html" -ForegroundColor White
}

# Stop the server
Stop-Job $serverJob
Remove-Job $serverJob
Write-Host "🔴 Server stopped." -ForegroundColor Red
