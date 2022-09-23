import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {setSelectedProducts} from '../store/action';

const Cart = ({selectedProduct, navigation, setSelectedProducts}) => {
  const incrementItem = id => {
    let selectedItems = {...selectedProduct};
    selectedItems[id].count += 1;
    setSelectedProducts(selectedItems);
  };

  const decrementItem = id => {
    let selectedItems = {...selectedProduct};
    if (selectedItems[id].count > 1) {
      selectedItems[id].count -= 1;
    } else {
      delete selectedItems[id];
    }
    setSelectedProducts(selectedItems);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    Object.keys(selectedProduct).map(id => {
      total += selectedProduct[id].price * selectedProduct[id].count;
    });
    return total.toFixed(2);
  };

  const renderItem = ({item: id, index}) => {
    const item = selectedProduct[id];
    return (
      <View key={`${item.id}-${index}`} style={styles.itemContainer}>
        <View style={styles.imgContainer}>
          <View style={styles.imgContent}>
            <Image source={{url: item.img}} style={styles.img} />
          </View>
          <View style={styles.descContainer}>
            <Text numberOfLines={4} style={styles.productNameText}>
              {item.name}
            </Text>
            <Text style={styles.priceText}>${item.price}</Text>
          </View>
        </View>
        <View style={styles.countContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.decrementContainer}
            onPress={() => decrementItem(id)}>
            <Text style={styles.countText}>-</Text>
          </TouchableOpacity>
          <View style={styles.countContent}>
            <Text style={styles.countText}>{item.count}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.incrementContainer}
            onPress={() => incrementItem(id)}>
            <Text style={styles.countText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backContent}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
      </View>
      <FlatList
        data={Object.keys(selectedProduct)}
        contentContainerStyle={styles.containerStyle}
        extraData={selectedProduct}
        keyExtractor={(_, index) => index}
        renderItem={renderItem}
      />
      <View style={styles.totalContent}>
        <Text
          style={
            styles.totalText
          }>{`Total\t\t$ ${calculateTotalPrice()}`}</Text>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  selectedProduct: state.selectedProduct,
});

const mapDispatchToProps = dispatch => ({
  setSelectedProducts: data => dispatch(setSelectedProducts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 52,
    marginLeft: 16,
  },
  backContent: {
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
  },
  backText: {
    color: '#000',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 32,
    color: '#000',
    fontWeight: '900',
    textAlign: 'center',
    marginLeft: 24,
  },
  containerStyle: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 24,
  },
  totalContent: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingBottom: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
  },
  totalText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'right',
    marginRight: 12,
  },
  itemContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgContainer: {
    flex: 0.7,
    flexDirection: 'row',
  },
  imgContent: {
    width: 100,
    height: 140,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 8,
  },
  img: {
    width: 100,
    height: 140,
    resizeMode: 'stretch',
  },
  descContainer: {
    marginLeft: 12,
    paddingTop: 16,
  },
  productNameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  decrementContainer: {
    backgroundColor: '#d0d0d0',
    width: 28,
    height: 32,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    justifyContent: 'center',
  },
  countText: {
    color: '#000',
    textAlign: 'center',
  },
  countContent: {
    width: 36,
    height: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  incrementContainer: {
    backgroundColor: '#d0d0d0',
    width: 28,
    height: 32,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center',
  },
});
