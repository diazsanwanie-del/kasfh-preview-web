import java.io.File
import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

// versionCode = major*1_000_000 + minor*10_000 + patch*100 + build (sama seperti SQS).
val appVersionMajor = 0
val appVersionMinor = 1
val appVersionPatch = 0
val appVersionBuild = 0 // 00–99; naikkan untuk unggahan ulang versi yang sama.

fun versionCodeFor(major: Int, minor: Int, patch: Int, build: Int): Int {
    require(minor in 0..99 && patch in 0..99 && build in 0..99) { "minor/patch/build harus 0–99" }
    return major * 1_000_000 + minor * 10_000 + patch * 100 + build
}

// keystore.properties (gitignored, di luar repo) menunjuk ke keystore rilis.
val signingProps: Properties? = rootProject.file("keystore.properties").takeIf { it.exists() }?.let { file ->
    Properties().apply { file.inputStream().use { load(it) } }
}

fun resolveStoreFile(path: String): File = rootProject.file(path)

android {
    namespace = "id.kasfh.app"
    compileSdk = 36
    buildToolsVersion = "36.0.0"

    defaultConfig {
        applicationId = "id.kasfh.app"
        minSdk = 26
        targetSdk = 36
        versionCode = versionCodeFor(appVersionMajor, appVersionMinor, appVersionPatch, appVersionBuild)
        versionName = "$appVersionMajor.$appVersionMinor.$appVersionPatch"
    }

    signingConfigs {
        create("release") {
            signingProps?.let { props ->
                storeFile = resolveStoreFile(props.getProperty("storeFile"))
                storePassword = props.getProperty("storePassword")
                keyAlias = props.getProperty("keyAlias")
                keyPassword = props.getProperty("keyPassword")
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false // Konten statis; R8 tidak diperlukan untuk unggahan pertama.
            signingConfig = signingConfigs.getByName("release")
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    // Default AAPT mengabaikan direktori berawalan "_"; pola ini memastikan semua aset web ikut ter-bundle.
    androidResources {
        ignoreAssetsPattern = "!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~"
    }
}

// Pemeriksaan fail-fast: build rilis tidak boleh jalan tanpa keystore.
gradle.taskGraph.whenReady {
    val releaseRequested = allTasks.any { it.name == "assembleRelease" || it.name == "bundleRelease" }
    if (releaseRequested) {
        val props = signingProps
            ?: throw GradleException("Build rilis dibatalkan: keystore.properties tidak ada di root proyek.")
        val store = resolveStoreFile(props.getProperty("storeFile", ""))
        if (!store.isFile) {
            throw GradleException("Build rilis dibatalkan: storeFile tidak ditemukan: ${store.path}")
        }
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)

    // WebViewAssetLoader: serve aset lokal ke WebView (tanpa network).
    implementation(libs.androidx.webkit)
}
