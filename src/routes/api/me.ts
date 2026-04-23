import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import {
  getCurrentUserEmail,
  isAdminEmail,
  isAdminAllowlistConfigured,
} from '../../server/admin-auth'

export const Route = createFileRoute('/api/me')({
  server: {
    handlers: {
      GET: ({ request }) => {
        const email = getCurrentUserEmail(request)
        const adminAllowlistConfigured = isAdminAllowlistConfigured()
        const isAdmin = isAdminEmail(email)

        return json({
          email,
          isAdmin,
          adminAllowlistConfigured,
        })
      },
    },
  },
})
