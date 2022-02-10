import { defineNuxtPlugin } from '#app'
import { useState } from '#app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEye)
library.add(faEyeSlash)

export default defineNuxtPlugin((nuxtApp: any) => {
    nuxtApp.vueApp.component('fa', FontAwesomeIcon )
    // router middleware, which block unauthoricated access.
	const router = nuxtApp.$router
    const authState = useState('auth')
    const authRoutes = ['/', '/profile/edit']
    const unauthRoutes = ['/signup', '/signin']
	router.beforeEach((to: any, from: any, next: Function) => {
		console.log(to.path)
        console.log(authState.value)
        if(authRoutes.includes(to.path) && !authState.value){
            router.push('/signin')
        }
        if(unauthRoutes.includes(to.path) && authState.value){
            router.push('/')
        }
		next()
	})
})