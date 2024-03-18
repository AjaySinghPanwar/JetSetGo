import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {globalStyles} from '../utils/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlightState} from '../utils/types';
import moment from 'moment';
import {formatTotalTime} from '../utils/globalFunctions';

const FlightListCard = (props: FlightState) => {
  const {
    origin,
    duration,
    arrivalTime,
    destination,
    departureTime,
    airline,
    price,
  } = props;

  return (
    <View style={styles.cardContainer}>
      {/* Source and Destination related */}
      <View style={globalStyles.RSC}>
        {/* Source */}
        <Text
          style={[styles.sourceDestinationTitle, {flex: 1, textAlign: 'left'}]}>
          {origin}
        </Text>

        {/* Source to Destination Visualizer */}
        <View style={[globalStyles.RCC, {flex: 2}]}>
          <View style={styles.planeTrack} />
          <Ionicons name="airplane" color={'#000'} size={20} />
          <View style={styles.planeTrack} />
        </View>

        {/* Destination */}
        <Text
          style={[
            styles.sourceDestinationTitle,
            {flex: 1, textAlign: 'right'},
          ]}>
          {destination}
        </Text>
      </View>

      {/* Time related */}
      <View style={[globalStyles.RSC, {marginTop: 12}]}>
        {/* Departure time */}
        <Text style={styles.timeTitle}>
          {moment(departureTime).format('hh:mm A')}
        </Text>

        {/* Total time */}
        <Text style={styles.timeTitle}>{formatTotalTime(duration)}</Text>

        {/* Arrival time */}
        <Text style={styles.timeTitle}>
          {moment(arrivalTime).format('hh:mm A')}
        </Text>
      </View>

      {/* Separator */}
      <View style={styles.separatorLine} />

      {/* Date, Airline and price related */}
      <View style={globalStyles.RSC}>
        {/* Flight date */}
        <View>
          <Text style={styles.flightDetailTitle}>Date</Text>
          <Text style={styles.flightDetailText}>
            {moment(departureTime).format('Do MMM YYYY')}
          </Text>
        </View>

        {/* Flight name */}
        <View>
          <Text style={styles.flightDetailTitle}>Flight</Text>
          <Text style={styles.flightDetailText}>{airline}</Text>
        </View>

        {/* Price */}
        <View>
          <Text style={styles.flightDetailTitle}>Price</Text>
          <Text style={styles.flightDetailText}>{`₹${price}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default FlightListCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    height: 'auto',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 3},
    shadowRadius: 4,
    elevation: 6,
    shadowOpacity: 0.2,
  },

  planeTrack: {
    width: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'dashed',
    marginHorizontal: 2,
  },

  sourceDestinationTitle: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '600',
  },

  timeTitle: {
    fontSize: 14,
    lineHeight: 16,
    color: '#000',
    opacity: 0.8,
  },

  separatorLine: {
    marginVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
    opacity: 0.2,
  },

  flightDetailTitle: {
    fontSize: 12,
    lineHeight: 14,
  },

  flightDetailText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '600',
    marginTop: 6,
  },
});
