import { sendEmail } from '@/api/authApi'
import { useMutation } from '@tanstack/react-query'


export const useSendEmail = () => useMutation({
  mutationFn: ({ recipient_email, OTP }) => sendEmail(recipient_email, OTP)
})
