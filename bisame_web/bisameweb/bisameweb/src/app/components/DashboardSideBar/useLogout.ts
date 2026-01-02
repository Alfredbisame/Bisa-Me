/**
 * useLogout Hook - Updated to use new API client
 * Handles logout with confirmation dialog using SweetAlert2
 */

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useAuth } from '@/app/hooks/useAuth';
import { authHttpClient, buildAuthUrl, AUTH_ENDPOINTS } from '@/lib';

export const useLogout = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-lg shadow-lg',
        title: 'text-lg font-semibold',
        confirmButton: 'px-4 py-2 rounded-md',
        cancelButton: 'px-4 py-2 rounded-md',
      },
    });

    if (result.isConfirmed) {
      try {
        // Call the logout API using new authHttpClient
        const logoutUrl = buildAuthUrl(AUTH_ENDPOINTS.logout);

        try {
          await authHttpClient.post(logoutUrl);
        } catch (apiError) {
          // Log but don't block logout on API error
          console.warn('Logout API call failed, proceeding with local logout:', apiError);
        }

        // Clear local storage and update auth state
        logout();

        // Show success message
        await Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-lg shadow-lg',
          },
        });

        // Redirect to home
        window.location.href = '/';
      } catch (error) {
        console.error('Error during logout:', error);

        // Even if there's an error, clear local state
        logout();

        await Swal.fire({
          title: 'Logged Out',
          text: 'You have been logged out locally.',
          icon: 'info',
          confirmButtonColor: '#f97316',
          customClass: {
            popup: 'rounded-lg shadow-lg',
          },
        });

        window.location.href = '/';
      }
    }
  };

  return handleLogout;
};