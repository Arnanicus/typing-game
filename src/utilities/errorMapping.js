const errorMapping = {
    'auth/user-not-found': 'Please enter a valid email address or signup',
    'auth/wrong-password': 'Incorrect credentials',
    'auth/email-already-in-use': 'Email already in use',
    'auth/weak-password': 'Password must be 6 or more characters long',
    'auth/invalid-email': 'Please enter a valid email address',
    'auth/missing-email': 'Email is required',
    'auth/internal-error': 'Internal error. Please try again later.',
    'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/unknown': 'Something went wrong. Please try again later.'
}

export default errorMapping;