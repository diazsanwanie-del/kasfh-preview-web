package id.kasfh.app

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.webkit.WebResourceRequest
import android.content.Context
import android.app.Activity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.webkit.WebViewAssetLoader
import java.io.ByteArrayInputStream
import java.io.IOException

/**
 * Activity tunggal: menampilkan aplikasi web KASFH yang ter-bundle di assets/.
 *
 * Path absolut di build web (/assets/..., /data/surah/N.json) dipetakan ke
 * root folder assets/ melalui [AssetHandler], sehingga fetch() di dalam
 * aplikasi tetap berjalan tanpa network.
 */
class MainActivity : Activity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/", AssetHandler(this))
            .build()

        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.allowFileAccess = false
            settings.allowContentAccess = false
            setBackgroundColor(0xFF020617.toInt())

            webViewClient = object : WebViewClient() {
                override fun shouldInterceptRequest(
                    view: WebView,
                    request: WebResourceRequest,
                ): WebResourceResponse? = assetLoader.shouldInterceptRequest(request.url)
            }
        }

        // targetSdk 36: edge-to-edge wajib; padding WebView mengikuti system bars.
        WindowCompat.setDecorFitsSystemWindows(window, false)
        ViewCompat.setOnApplyWindowInsetsListener(webView) { view, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            view.setPadding(bars.left, bars.top, bars.right, bars.bottom)
            WindowInsetsCompat.CONSUMED
        }

        setContentView(webView)
        webView.loadUrl("https://appassets.androidplatform.net/index.html")
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) webView.goBack() else super.onBackPressed()
    }

    /** Memetakan path virtual ke assets/, 404 jika tidak ada (tanpa network). */
    private class AssetHandler(private val context: Context) : WebViewAssetLoader.PathHandler {

        override fun handle(path: String): WebResourceResponse {
            val clean = path.trim('/')
            val candidates = mutableListOf(if (clean.isEmpty()) "index.html" else clean)
            if (!clean.contains('.')) candidates += "$clean/index.html"

            for (candidate in candidates) {
                try {
                    val stream = context.assets.open(candidate)
                    val mime = guessMime(candidate)
                    val charset = if (mime.startsWith("text/") || mime == "application/javascript" || mime == "application/json") "UTF-8" else null
                    return WebResourceResponse(mime, charset, stream)
                } catch (_: IOException) {
                    // coba kandidat berikutnya
                }
            }
            return WebResourceResponse(
                "text/plain", null, 404, "Not Found", null,
                ByteArrayInputStream("Aset tidak ditemukan: $clean".toByteArray()),
            )
        }

        private fun guessMime(name: String): String = when {
            name.endsWith(".html") -> "text/html"
            name.endsWith(".js") || name.endsWith(".mjs") -> "application/javascript"
            name.endsWith(".css") -> "text/css"
            name.endsWith(".json") -> "application/json"
            name.endsWith(".svg") -> "image/svg+xml"
            name.endsWith(".png") -> "image/png"
            name.endsWith(".jpg") || name.endsWith(".jpeg") -> "image/jpeg"
            name.endsWith(".webp") -> "image/webp"
            name.endsWith(".ico") -> "image/x-icon"
            name.endsWith(".woff2") -> "font/woff2"
            name.endsWith(".woff") -> "font/woff"
            name.endsWith(".ttf") -> "font/ttf"
            name.endsWith(".txt") -> "text/plain"
            else -> "application/octet-stream"
        }
    }
}
