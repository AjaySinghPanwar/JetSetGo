import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { globalStyles } from "../../utils/globalStyles";
import FlightListCard from "../../components/FlightListCard";
import { FlightState, HomeScreenProps } from "../../utils/types";
import { fetchAllFlights } from "../../network";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomBottomSheet from "../../components/CustomBottomSheet";
import { filtersData } from "../../utils/filtersData";
import Button from "../../components/Button";

const Home = ({ navigation }: HomeScreenProps) => {
  // Getting screen dimensions
  const { width, height } = Dimensions.get("screen");

  // State to store flights relate data
  const [flightsList, setFlightsList] = useState<Array<FlightState>>([]);
  const [sortKey, setSortKey] = useState("asc");
  const [selectedFiltersList, setSelectedFilterList] = useState<Array<string>>(
    []
  );

  // Ref for bottomsheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Function to fetch flights data
  const getFlightsData = () => {
    fetchAllFlights().then((response) => {
      if (sortKey === "asc") {
        response?.sort(
          (flightOne: { price: number }, flightTwo: { price: number }) => {
            return flightOne?.price - flightTwo?.price;
          }
        );
      } else {
        response?.sort(
          (flightOne: { price: number }, flightTwo: { price: number }) => {
            return flightTwo?.price - flightOne?.price;
          }
        );
      }

      setFlightsList([...response]);
    });
  };

  // useEffect to fetch flights data
  useEffect(() => {
    getFlightsData();
  }, []);

  // Handle filter selection
  const handleFilterSelection = (item: string) => {
    const currentAppliedFilter: Array<string> = [...selectedFiltersList];
    const foundIndex = currentAppliedFilter.findIndex((filter) => {
      return filter === item;
    });

    if (foundIndex > -1) {
      currentAppliedFilter.splice(foundIndex, 1);
      setSelectedFilterList([...currentAppliedFilter]);
    } else {
      currentAppliedFilter.push(item);
      setSelectedFilterList([...currentAppliedFilter]);
    }
  };

  // Handle apply filter
  const applyFilter = () => {
    const filteredFlightList = flightsList?.filter((flight) => {
      return selectedFiltersList.includes(flight.airline.toLowerCase());
    });

    // Set flight list with new filtered data
    setFlightsList([...filteredFlightList]);

    // Close bottom sheet
    bottomSheetRef.current?.close();
  };

  // Handle reset filter
  const resetFilter = () => {
    // Make selected filters list as empty
    setSelectedFilterList([]);

    // Fetch flights data
    getFlightsData();

    // Close bottom sheet
    bottomSheetRef.current?.close();
  };

  // Handle sorting
  const handleSort = (sortType: "asc" | "desc") => {
    const flightsData = [...flightsList];

    if (sortType === "asc") {
      // Ascending sort
      flightsData?.sort((flightOne, flightTwo) => {
        return flightOne?.price - flightTwo?.price;
      });
    } else {
      // Descending sort
      flightsData?.sort((flightOne, flightTwo) => {
        return flightTwo?.price - flightOne?.price;
      });
    }

    // Re-rendering the flights list with the new sorted data
    setFlightsList([...flightsData]);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        {/* Top Container */}
        <View
          style={[
            styles.topContainer,
            {
              height: height * 0.4,
            },
          ]}
        >
          {/* Back Button */}
          <Ionicons
            name="chevron-back"
            color={"#FFF"}
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />

          <Text
            style={[
              styles.primaryText,
              {
                width: width * 0.8,
              },
            ]}
          >
            Book <Text style={styles.secondaryText}>Your</Text>
          </Text>

          <Text
            style={[
              styles.secondaryText,
              {
                width: width * 0.8,
              },
            ]}
          >
            Next Flight
          </Text>

          <Ionicons
            name="airplane-outline"
            color={"#FFF"}
            size={50}
            style={{
              transform: [{ rotate: "-30deg" }],
              marginLeft: width * 0.7,
            }}
          />
        </View>

        {/* Bottom card container */}
        <View
          style={[
            styles.flightListContainer,
            {
              height: "100%",
            },
          ]}
        >
          <Text style={styles.flightListContainerTitle}>
            Select your flight
          </Text>

          {/* Filter and sorting option container */}
          <View style={[globalStyles.RSC, styles.filterSortingOptionContainer]}>
            {/* Sorting icon */}
            <Ionicons
              name="filter"
              color={"gray"}
              size={24}
              onPress={() => bottomSheetRef.current?.expand()}
            />

            <View style={globalStyles.RSC}>
              {/* For sorting in ascending order */}
              <FontAwesome
                name="sort-alpha-asc"
                color={sortKey === "asc" ? "#000" : "gray"}
                size={20}
                onPress={() => {
                  setSortKey("asc");
                  handleSort("asc");
                }}
              />

              {/* For sorting in descending order */}
              <FontAwesome
                name="sort-alpha-desc"
                color={sortKey === "desc" ? "#000" : "gray"}
                size={20}
                onPress={() => {
                  setSortKey("desc");
                  handleSort("desc");
                }}
                style={{ marginLeft: 24 }}
              />
            </View>
          </View>

          {/* Flight list */}
          <FlatList
            data={flightsList}
            style={{ marginTop: 12 }}
            contentContainerStyle={{
              padding: 12,
              gap: 24,
              paddingBottom: height * 0.5,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.id} + ${index}}`}
            renderItem={({ item }) => <FlightListCard {...item} />}
          />
        </View>
      </View>

      {/* Filter bottom sheet */}
      <CustomBottomSheet sheetRef={bottomSheetRef}>
        <View style={{ flex: 1, padding: 20 }}>
          {/* Heading */}
          <View style={styles.filterSheetTitleContainer}>
            <Text style={styles.filterSheetTitle}>Filter By Airlines</Text>
          </View>

          {/* Render the filter list */}
          {filtersData.map((item) => {
            return (
              <TouchableOpacity
                key={item.id + item.airline.toLowerCase()}
                onPress={() =>
                  handleFilterSelection(item.airline.toLowerCase())
                }
                activeOpacity={0.6}
                style={[globalStyles.RSC, styles.checkBoxContainer]}
              >
                <Text key={item.id} style={styles.checkboxText}>
                  {item.airline}
                </Text>

                <View style={styles.checkBoxTickContainer}>
                  {selectedFiltersList.includes(item.airline.toLowerCase()) && (
                    <FontAwesome name="check" color={"#0067FF"} size={14} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Apply button */}
          <Button
            title="Apply"
            handlePress={applyFilter}
            buttonContainerStyle={{ marginTop: 12 }}
          />
          {/* Reset button */}
          <Button
            title="Reset"
            handlePress={resetFilter}
            buttonContainerStyle={{ backgroundColor: "#FDFDFD", marginTop: 24 }}
            titleStyle={{ color: "#000" }}
          />
        </View>
      </CustomBottomSheet>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "#0067FF",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  primaryText: {
    fontSize: 40,
    lineHeight: 50,
    fontWeight: "800",
    textTransform: "capitalize",
    color: "#C2F3A5",
    marginTop: 24,
  },

  secondaryText: {
    fontSize: 36,
    lineHeight: 50,
    fontWeight: "800",
    textTransform: "capitalize",
    color: "#FFF",
  },

  flightListContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginHorizontal: 16,
    bottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 10,
    elevation: 8,
    shadowOpacity: 0.6,
    padding: 12,
  },

  flightListContainerTitle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "capitalize",
  },

  filterSortingOptionContainer: {
    marginTop: 24,
    marginHorizontal: 12,
  },

  filterSheetTitleContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 20,
    marginBottom: 24,
  },

  filterSheetTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "600",
    textAlign: "center",
  },

  checkBoxContainer: {
    marginBottom: 12,
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
  },

  checkboxText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "500",
  },

  checkBoxTickContainer: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: "center",
  },
});
