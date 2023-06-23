import Vue from 'vue'
import toBoolean from '~/utils/to-boolean'
import GeneralsConst from '~/constants/app'

const SESSION_STORAGE_KEY = 'hugo-tomasi-visited'

export default Vue.extend({
    data() {
        return {
            isAlreadyRegister: false,
        }
    },
    computed: {
        splashScreenClasses(): (string | false | undefined)[] {
            return [
                this.displaySplashScreen && this.$style['root--splash-screen-active'],
                (this.isSplashScreenDone || !this.displaySplashScreen || this.isAlreadyRegister) &&
                    this.$style['root--splash-screen-done'],
            ]
        },
        displaySplashScreen(): boolean {
            return toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN) && !this.isAlreadyRegister
        },
        isSplashScreenDone(): boolean {
            return this.$store.state.splashScreenDone
        },
        displayOnce(): boolean {
            return toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN_ONCE)
        },
    },
    watch: {
        isSplashScreenDone(isDone: boolean) {
            if (this.displaySplashScreen && isDone && this.displayOnce)
                sessionStorage.setItem(SESSION_STORAGE_KEY, 'true')
        },
    },
    mounted() {
        this.isSplashScreenRegister()
    },
    methods: {
        isSplashScreenRegister() {
            this.isAlreadyRegister = toBoolean(sessionStorage.getItem(SESSION_STORAGE_KEY))
        },
    },
})
