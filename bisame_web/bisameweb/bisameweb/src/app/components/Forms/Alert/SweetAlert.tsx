import Swal from 'sweetalert2';

export interface SweetAlertOptions {
  title?: string;
  text?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  showCancelButton?: boolean;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
}

export class SweetAlert {
  // Confirmation dialog
  static async confirm(options: SweetAlertOptions): Promise<boolean> {
    const result = await Swal.fire({
      title: options.title || 'Are you sure?',
      text: options.text || 'This action cannot be undone.',
      icon: options.icon || 'warning',
      showCancelButton: options.showCancelButton !== false,
      confirmButtonColor: options.confirmButtonColor || '#ef4444',
      cancelButtonColor: options.cancelButtonColor || '#6b7280',
      confirmButtonText: options.confirmButtonText || 'Yes, proceed',
      cancelButtonText: options.cancelButtonText || 'Cancel',
      allowOutsideClick: options.allowOutsideClick !== false,
      allowEscapeKey: options.allowEscapeKey !== false,
      customClass: {
        popup: 'rounded-xl shadow-2xl',
        title: 'text-xl font-semibold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg',
        cancelButton: 'px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg',
      },
      buttonsStyling: true,
    });

    return result.isConfirmed;
  }

  // Success alert
  static async success(title: string, text?: string): Promise<void> {
    await Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonColor: '#10b981',
      confirmButtonText: 'Great!',
      customClass: {
        popup: 'rounded-xl shadow-2xl',
        title: 'text-xl font-semibold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg',
      },
    });
  }

  // Error alert
  static async error(title: string, text?: string): Promise<void> {
    await Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Understood',
      customClass: {
        popup: 'rounded-xl shadow-2xl',
        title: 'text-xl font-semibold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg',
      },
    });
  }

  // Info alert
  static async info(title: string, text?: string): Promise<void> {
    await Swal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonColor: '#3b82f6',
      confirmButtonText: 'Got it',
      customClass: {
        popup: 'rounded-xl shadow-2xl',
        title: 'text-xl font-semibold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg',
      },
    });
  }

  // Warning alert
  static async warning(title: string, text?: string): Promise<void> {
    await Swal.fire({
      title,
      text,
      icon: 'warning',
      confirmButtonColor: '#f59e0b',
      confirmButtonText: 'Okay',
      customClass: {
        popup: 'rounded-xl shadow-2xl',
        title: 'text-xl font-semibold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg',
      },
    });
  }

  // Clear form confirmation - specific for this use case
  static async confirmClearForm(): Promise<boolean> {
    const result = await Swal.fire({
      title: 'Clear Form Data?',
      text: 'Are you sure you want to clear all form data? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3b82f6', 
      confirmButtonText: 'Yes, clear it',
      cancelButtonText: 'Keep my data',
      allowOutsideClick: false,
      allowEscapeKey: true,
      reverseButtons: false,
      focusCancel: true, // Focus on cancel button by default
      customClass: {
        popup: 'rounded-xl shadow-2xl',
        title: 'text-xl font-semibold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg',
        cancelButton: 'px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg',
      },
      buttonsStyling: true,
      backdrop: true,
      timer: undefined,
      timerProgressBar: false,
    });

    return result.isConfirmed;
  }
}

export default SweetAlert;
