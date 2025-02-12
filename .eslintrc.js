module.exports = {
  root: true,
  extends: ['@react-native'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports', 'react-hooks'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { 
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: true,
    }],
    '@typescript-eslint/no-explicit-any': 'warn',
    
    'no-unused-imports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      { 
        vars: 'all', 
        varsIgnorePattern: '^_', 
        args: 'after-used', 
        argsIgnorePattern: '^_' 
      }
    ],
    
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    'prettier/prettier': 'warn',
    'no-console': 'warn',
  },
};