import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {setSelectedProducts} from '../store/action';
import {getProductList} from '../store/service';

const Home = ({
  loading,
  products,
  selectedProduct,
  getProducts,
  setSelectedProducts,
  navigation,
}) => {
  useEffect(() => {
    getProducts();
  }, []);

  const onProductPress = item => {
    let selectedItems = {...selectedProduct};
    if (selectedProduct[item.id]) {
      delete selectedItems[item.id];
    } else {
      selectedItems = {
        ...selectedItems,
        [item.id]: {
          ...item,
          count: 1,
        },
      };
    }
    setSelectedProducts(selectedItems);
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={`${item.id}-${index}`} style={styles.productContainer}>
        <Image source={{url: item.img}} style={styles.productImg} />
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={2} style={styles.productNameText}>
            {item.name}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>${item.price}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.addToCartContainer}
              onPress={() => onProductPress(item)}>
              <Text style={styles.addToCartText}>
                {selectedProduct[item.id] ? 'Remove' : 'Add to Cart'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Products</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size={'large'} color={'#000'} />
        </View>
      ) : (
        <FlatList
          data={products}
          contentContainerStyle={styles.containerStyle}
          numColumns={2}
          extraData={products}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
      {Object.keys(selectedProduct).length > 0 && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.checkoutContainer}
          onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.checkoutText}>CHECKOUT</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  loading: state.loading,
  products: state.products,
  selectedProduct: state.selectedProduct,
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProductList()),
  setSelectedProducts: data => dispatch(setSelectedProducts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 32,
    color: '#000',
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 52,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 24,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 48,
    right: 24,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  productContainer: {
    width: '48%',
    backgroundColor: '#fff',
    marginHorizontal: 4,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  productImg: {
    width: '100%',
    height: 300,
    resizeMode: 'stretch',
  },
  descriptionContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
  },
  productNameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  addToCartContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderRadius: 4,
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
});
