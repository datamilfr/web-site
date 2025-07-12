// Advanced Language Detection and Switching
class LanguageManager {
    constructor() {
        this.supportedLanguages = ['en', 'fr'];
        this.defaultLanguage = 'en';
        this.currentLanguage = this.getCurrentLanguage();
        this.init();
    }

    // Get user's preferred language from browser
    getUserLanguage() {
        return navigator.language || navigator.userLanguage || this.defaultLanguage;
    }

    // Get language from URL path
    getLanguageFromURL() {
        const path = window.location.pathname;
        if (path.includes('index-fr.html')) return 'fr';
        if (path.includes('index.html') || path === '/') return 'en';
        return null;
    }

    // Get stored language preference
    getStoredLanguage() {
        return localStorage.getItem('preferred-language');
    }

    // Store language preference
    setStoredLanguage(lang) {
        localStorage.setItem('preferred-language', lang);
    }

    // Determine current language
    getCurrentLanguage() {
        // Priority: URL > Stored preference > Browser language > Default
        const urlLang = this.getLanguageFromURL();
        if (urlLang) return urlLang;

        const storedLang = this.getStoredLanguage();
        if (storedLang && this.supportedLanguages.includes(storedLang)) {
            return storedLang;
        }

        const browserLang = this.getUserLanguage().substring(0, 2);
        if (this.supportedLanguages.includes(browserLang)) {
            return browserLang;
        }

        return this.defaultLanguage;
    }

    // Redirect to appropriate language version
    redirectToLanguage(lang) {
        if (lang === 'fr') {
            window.location.href = 'index-fr.html';
        } else {
            window.location.href = 'index.html';
        }
    }

    // Auto-detect and redirect on first visit
    autoDetectAndRedirect() {
        const currentPath = window.location.pathname;
        
        // Only redirect if user is on the root page and hasn't made a choice
        if (currentPath === '/' || currentPath === '/index.html') {
            const preferredLang = this.getCurrentLanguage();
            
            // If user prefers French and we're on English page, redirect
            if (preferredLang === 'fr') {
                this.redirectToLanguage('fr');
            }
        }
    }

    // Handle manual language switching
    switchLanguage(lang) {
        this.setStoredLanguage(lang);
        this.redirectToLanguage(lang);
    }

    // Initialize language manager
    init() {
        // Auto-detect on page load
        this.autoDetectAndRedirect();
        
        // Add event listeners for language switcher
        this.setupLanguageSwitcher();
    }

    // Setup language switcher event listeners
    setupLanguageSwitcher() {
        // Add click handlers to language switcher links
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = item.getAttribute('href').includes('fr') ? 'fr' : 'en';
                this.switchLanguage(lang);
            });
        });
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
} 