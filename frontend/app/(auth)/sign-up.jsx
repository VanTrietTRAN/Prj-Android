import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { styles } from '../../assets/styles/auth.styles.js'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors.js'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded || isSubmitting) return
    setIsSubmitting(true)
    setError('')
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      if (err.error?.[0]?.code === "form_identifier_exists") {
        setError("That email is already in use. Please try another.");
      }else {
        setError("An error occurred. Please try again.");
      }
      console.log(err);
    }
      
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded || isSubmitting) return
    setIsSubmitting(true)
    setError('')
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code })
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
        setError('Verification not completed. Check console for details.')
      }
    } catch (err) {
      console.error(err)
      setError(JSON.stringify(err, null, 2))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[styles.verificationInput, error && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#9A8478"
          onChangeText={(text) => setCode(text)}
        />

        <TouchableOpacity onPress={onVerifyPress} style={styles.button} disabled={isSubmitting}>
          <Text style={styles.buttonText}>{isSubmitting ? 'Verifying...' : 'Verify'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/revenue-i2.png')} style={styles.illustration} />
      <Text style={styles.title}>Sign up</Text>

      {error ? (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={() => setError('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
      ) : null}

      <TextInput
        autoCapitalize="none"
        style={styles.input}
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(text) => setEmailAddress(text)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={[styles.button, isSubmitting && { opacity: 0.6 }]} onPress={onSignUpPress} disabled={isSubmitting}>
        <Text style={styles.buttonText}>{isSubmitting ? 'Signing up...' : 'Continue'}</Text>
      </TouchableOpacity>

      <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Text>Already have an account?</Text>
        <Link href="/sign-in">
          <Text style={styles.linkText}>Sign in</Text>
        </Link>
      </View>
    </View>
  )
}