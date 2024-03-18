import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {STRING_CONSTANTS} from '../../utils/stringConstants';
import {navigationConstants} from '../../utils/navigationConstants';
import {OnboardingScreenProps} from '../../utils/types';

// Onboarding steps data
const OnboardingData = STRING_CONSTANTS.onboardingSteps;

const OnboardingScreen = ({navigation}: OnboardingScreenProps) => {
  const [screenIndex, setScreenIndex] = useState(0);
  const data = OnboardingData[screenIndex];

  // Handle continue button click
  const onContinue = () => {
    if (screenIndex === OnboardingData.length - 1) {
      onEndOnboarding();
    } else {
      setScreenIndex(prevIndex => prevIndex + 1);
    }
  };

  // Handle skip button click
  const onBack = () => {
    if (screenIndex === 0) {
      onEndOnboarding();
    } else {
      setScreenIndex(prevIndex => prevIndex - 1);
    }
  };

  // Handle onEndOnboarding
  const onEndOnboarding = () => {
    navigation.navigate(navigationConstants.home_screen);
    // setScreenIndex(0);
  };

  // Handling swipes
  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack),
  );

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.stepIndicatorContainer}>
        {OnboardingData.map((step, index) => (
          <Animated.View
            key={index + step.title}
            entering={FadeInUp.delay(50)}
            style={[
              styles.stepIndicator,
              {backgroundColor: index === screenIndex ? '#94EA62' : 'gray'},
            ]}
          />
        ))}
      </View>

      <GestureDetector gesture={swipes}>
        <View style={styles.pageContent} key={screenIndex}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Fontisto
              style={styles.image}
              name={data.icon}
              size={150}
              color="#94Ea62"
            />
          </Animated.View>

          <View style={styles.footer}>
            <Animated.Text
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.title}>
              {data.title}
            </Animated.Text>
            <Animated.Text
              entering={SlideInRight.delay(50)}
              exiting={SlideOutLeft}
              style={styles.description}>
              {data.description}
            </Animated.Text>
          </View>

          <View style={styles.buttonRow}>
            <Text style={styles.buttonText} onPress={onEndOnboarding}>
              Skip
            </Text>

            <Pressable style={styles.button} onPress={onContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0067FF',
  },

  pageContent: {
    flex: 1,
    padding: 20,
  },

  stepIndicatorContainer: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },

  stepIndicator: {
    flex: 1,
    height: 3,
    borderRadius: 10,
  },

  image: {
    alignSelf: 'center',
    margin: 20,
    marginTop: 70,
  },

  footer: {
    marginTop: 'auto',
  },

  title: {
    color: '#FDFDFD',
    fontSize: 50,
    letterSpacing: 1.3,
    marginVertical: 10,
    fontWeight: '700',
  },

  description: {
    color: '#FFF',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500',
  },

  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  button: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    borderRadius: 50,
    alignItems: 'center',
  },

  buttonText: {
    color: '#000',
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25,
    fontWeight: '600',
  },
});
