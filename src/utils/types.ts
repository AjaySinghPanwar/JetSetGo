import BottomSheet from '@gorhom/bottom-sheet';
import {ReactNode, Ref} from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';

export interface HomeScreenProps {
  navigation: any;
}

export interface OnboardingScreenProps {
  navigation: any;
}

export type FlightState = {
  id: number;
  gate: string;
  price: number;
  origin: string;
  airline: string;
  aircraft: string;
  duration: string;
  arrivalTime: string;
  destination: string;
  flightNumber: string;
  departureTime: string;
  seatsAvailable: number;
};

export interface ButtonProps {
  title: string;
  handlePress: () => void;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

export interface CustomBottomSheetProps {
  children: ReactNode;
  sheetRef: Ref<BottomSheet>;
}
