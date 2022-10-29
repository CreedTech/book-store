// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const Search = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    try {
      fetch('https://fudap-books-api.herokuapp.com/books/')
        .then((response) => response.json())
        .then((responseJson) => {
          setFilteredDataSource(responseJson);
          setMasterDataSource(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData =
          item.title || item.author
            ? item.title.toUpperCase() || item.author.toUpperCase()
            : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > 1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <View style={{ marginVertical: SIZES.base }}>
        <TouchableOpacity
          style={{ flex: 1, flexDirection: 'row' }}
          onPress={() =>
            navigation.navigate('BookDetail', {
              book: item,
            })
          }
        >
          {/* Book Cover */}
          <Image
            source={{ uri: item.imgUrl }}
            resizeMode="cover"
            style={{ width: 100, height: 150, borderRadius: 10 }}
          />

          <View style={{ flex: 1, marginLeft: SIZES.radius }}>
            {/* Book name and author */}
            <View>
              <Text
                style={{
                  paddingRight: SIZES.padding,
                  ...FONTS.h2,
                  color: COLORS.white,
                }}
              >
                {item.title}
              </Text>
              <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>
                {item.author}
              </Text>
            </View>

            {/* Book Info */}
            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
              <Image
                source={icons.page_filled_icon}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.lightGray,
                }}
              />
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.lightGray,
                  paddingHorizontal: SIZES.radius,
                }}
              >
                {item.pages}
              </Text>

              <Image
                source={icons.read_icon}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.lightGray,
                }}
              />
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.lightGray,
                  paddingHorizontal: SIZES.radius,
                }}
              >
                {item.publisher}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View
        style={{ flex: 1, marginTop: SIZES.radius, }}
      >
        <SearchBar
          round
          searchIcon={{ size: 24, paddingLeft: 10 }}
          containerStyle={{
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderRadius: 100,
          }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={search}
        />
        
              {(!search) ? (
                  <View style={{  flex: 1,justifyContent: 'center',alignItems: 'center', }} >
                      
          <Text style={{ ...FONTS.body3, color: COLORS.white }}>
          Search For a Book
        </Text>
                  </View>
        ) : (
          <FlatList style={{paddingLeft: 30}}
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
          />
        )}
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
  },
  itemStyle: {
    // padding: 10,
  },
});

export default Search;
