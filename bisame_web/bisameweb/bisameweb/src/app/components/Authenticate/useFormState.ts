import { useReducer, useCallback } from 'react';

// Form state interface
export interface FormState {
  firstName: string;
  lastName: string;
  phoneNumber: string | undefined;
  email: string;
  password: string;
  confirmPassword: string;
  referralCode: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  termsAccepted: boolean;
  hearAboutUs: string;
}

// Action types for form state management
type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormState; value: FormState[keyof FormState] }
  | { type: 'TOGGLE_PASSWORD_VISIBILITY' }
  | { type: 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY' }
  | { type: 'TOGGLE_TERMS' }
  | { type: 'RESET_FORM' }
  | { type: 'RESET_PASSWORDS' };

// Initial form state
const initialState: FormState = {
  firstName: '',
  lastName: '',
  phoneNumber: undefined,
  email: '',
  password: '',
  confirmPassword: '',
  referralCode: '',
  showPassword: false,
  showConfirmPassword: false,
  termsAccepted: false,
  hearAboutUs: '',
};

// Form reducer for predictable state updates
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    
    case 'TOGGLE_PASSWORD_VISIBILITY':
      return {
        ...state,
        showPassword: !state.showPassword,
      };
    
    case 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY':
      return {
        ...state,
        showConfirmPassword: !state.showConfirmPassword,
      };
    
    case 'TOGGLE_TERMS':
      return {
        ...state,
        termsAccepted: !state.termsAccepted,
      };
    
    case 'RESET_FORM':
      return initialState;
    
    case 'RESET_PASSWORDS':
      return {
        ...state,
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
      };
    
    default:
      return state;
  }
};


export const useFormState = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Memoized action creators for better performance
  const setField = useCallback((field: keyof FormState, value: FormState[keyof FormState]) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' });
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    dispatch({ type: 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY' });
  }, []);

  const toggleTerms = useCallback(() => {
    dispatch({ type: 'TOGGLE_TERMS' });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  const resetPasswords = useCallback(() => {
    dispatch({ type: 'RESET_PASSWORDS' });
  }, []);

  // Convenience setters for individual fields
  const setFirstName = useCallback((value: string) => setField('firstName', value), [setField]);
  const setLastName = useCallback((value: string) => setField('lastName', value), [setField]);
  const setPhoneNumber = useCallback((value: string | undefined) => setField('phoneNumber', value), [setField]);
  const setEmail = useCallback((value: string) => setField('email', value), [setField]);
  const setPassword = useCallback((value: string) => setField('password', value), [setField]);
  const setConfirmPassword = useCallback((value: string) => setField('confirmPassword', value), [setField]);
  const setReferralCode = useCallback((value: string) => setField('referralCode', value), [setField]);
  const setHearAboutUs = useCallback((value: string) => setField('hearAboutUs', value), [setField]);

  return {
    // State
    ...state,
    
    // Actions
    setField,
    setFirstName,
    setLastName,
    setPhoneNumber,
    setEmail,
    setPassword,
    setConfirmPassword,
    setReferralCode,
    setHearAboutUs,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    toggleTerms,
    resetForm,
    resetPasswords,
  };
};