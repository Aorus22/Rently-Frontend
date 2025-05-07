<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100">
    <Card class="shadow-md border border-gray-100 w-full max-w-md">
      <CardContent class="p-8">
        <div class="flex flex-col items-center mb-6">
          <User class="w-10 h-10 text-primary mb-2" />
          <h2 class="text-2xl font-bold text-gray-800">Admin Login</h2>
        </div>
        <div class="space-y-4">
          <div>
            <label class="text-sm text-muted-foreground">Email</label>
            <Input
              v-model="email"
              type="email"
              placeholder="Enter your email"
stall              class="mt-1 w-full border-gray-200 focus:ring-primary"
            />
          </div>
          <div>
            <label class="text-sm text-muted-foreground">Password</label>
            <Input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="mt-1 w-full border-gray-200 focus:ring-primary"
            />
          </div>
          <Button
            @click="login"
            :disabled="isLoading"
            class="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 transition-all flex items-center justify-center"
          >
            <ArrowPathIcon v-if="isLoading" class="w-5 h-5 animate-spin mr-2" />
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>


<script>
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import api from '../../plugins/axios'
import { useAdminAuthStore } from '@/stores/authAdmin'
import { User } from 'lucide-vue-next'

export default {
  components: { Card, CardContent, Input, Button, ArrowPathIcon, User },
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      auth: useAdminAuthStore()
    }
  },
  methods: {
    async login() {
      try {
        this.isLoading = true
        const response = await api.post('/adminlogin', {
          email: this.email,
          password: this.password
        })

        const userResponse = await api.get('/admin/akusiapa', {
          headers: { Authorization: `Bearer ${response.data.access_token}` }
        })

        this.auth.setAdmin(userResponse.data, response.data.access_token)
        this.$router.push('/admin')
      } catch (error) {
        console.error('Login error:', error)
        this.$toast.error('Login gagal! Cek email dan password.')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
