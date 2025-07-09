@echo off
echo Setting up TLS inspection certificate for Tauri build...

REM 企業のルート証明書のパスを設定（パスは環境に合わせて変更してください）
set NODE_EXTRA_CA_CERTS=C:\path\to\your\company-root-ca.crt
set SSL_CERT_FILE=C:\path\to\your\company-root-ca.crt
set REQUESTS_CA_BUNDLE=C:\path\to\your\company-root-ca.crt

REM Rustの証明書設定
set CARGO_HTTP_CAINFO=C:\path\to\your\company-root-ca.crt

echo Certificate environment variables set.
echo Now run: npm run tauri build