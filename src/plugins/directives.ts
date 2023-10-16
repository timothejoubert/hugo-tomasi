import Vue from 'vue'

Vue.directive('in-view', {
    bind: (el: any, binding: { [value: string]: any }) => {
        el.enabled = binding.value !== false

        if (!el.enabled) return
        const onlyOnce = binding.modifiers?.once
        const observerOptions = binding?.value || { rootMargin: '30px' }
        el.style.transition = 'opacity 1s, translate 0.6s'
        el.style.opacity = '0'
        el.style.translate = '0 100%'

        el.observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting || entry.target.getBoundingClientRect().top < window.innerHeight) {
                el.style.opacity = '1'
                el.style.translate = '0 0'

                if (onlyOnce) el.observer?.disconnect()
            } else {
                el.style.opacity = '0'
                el.style.translate = '0 100%'
            }
        }, observerOptions)

        el.observer.observe(el)
    },
    unbind(el: any): void {
        if (el.enabled) {
            el.observer?.disconnect()
            el.observer = undefined
        }
    },
})
