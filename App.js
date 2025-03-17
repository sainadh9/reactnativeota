/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const onCheckGitVersion = () => {
  hotUpdate.git.checkForGitUpdate({
    branch: Platform.OS === 'ios' ? 'iOS' : 'android',
    bundlePath:
      Platform.OS === 'ios'
        ? 'output/main.jsbundle'
        : 'output/index.android.bundle',
    url: 'https://github.com/sainadh9/reactnativeota.git',
    onCloneFailed(msg) {
      Alert.alert('Clone project failed!', msg, [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    },
    onCloneSuccess() {
      Alert.alert('Clone project success!', 'Restart to apply the changes', [
        {
          text: 'OK',
          onPress: () => hotUpdate.resetApp(),
        },
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    },
    onPullFailed(msg) {
      Alert.alert('Pull project failed!', msg, [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    },
    onPullSuccess() {
      Alert.alert('Pull project success!', 'Restart to apply the changes', [
        {
          text: 'OK',
          onPress: () => hotUpdate.resetApp(),
        },
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    },
    onProgress(received, total) {
      const percent = (+received / +total) * 100;
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setProgress(percent);
    },
    onFinishProgress() {
      setLoading(false);
    },
  });
};

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Run on component mount
  useEffect(() => {
    onCheckGitVersion();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
