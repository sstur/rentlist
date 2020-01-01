import React, { useState, ComponentProps, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import { Icon } from './Icon';
import { Text } from './Text';

type Props<T> = ComponentProps<typeof View> & {
  label: string;
  values: Array<T>;
  selectedValue: T | ((item: T) => boolean);
  keyExtractor: (value: T) => string | number;
  titleExtractor: (value: T) => string;
  onShow: () => void;
  onSelect: (value: T) => void;
};

export default function Dropdown<T>(props: Props<T>) {
  let {
    label,
    style,
    values,
    selectedValue,
    keyExtractor,
    titleExtractor,
    onShow,
    onSelect,
  } = props;
  let [isMenuVisible, setMenuVisible] = useState(false);
  useEffect(() => {
    if (isMenuVisible) {
      onShow && onShow();
    }
  }, [isMenuVisible, onShow]);
  let selected: T;
  if (typeof selectedValue === 'function') {
    let filterFn = selectedValue as Function;
    selected = values.filter((item) => filterFn(item))[0] || values[0];
  } else {
    selected = selectedValue;
  }
  return (
    <TouchableOpacity onPress={() => setMenuVisible(true)}>
      <View style={[styles.container, style]}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.value}>{titleExtractor(selected)}</Text>
        <View style={styles.underline} />
        <Menu
          visible={isMenuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Icon
              style={styles.icon}
              name="chevron-down"
              size={28}
              color="black"
            />
          }
        >
          <ScrollView>
            {values.map((value) => {
              return (
                <Menu.Item
                  key={keyExtractor(value)}
                  onPress={() => {
                    onSelect(value);
                    setMenuVisible(false);
                  }}
                  title={titleExtractor(value)}
                />
              );
            })}
          </ScrollView>
        </Menu>
      </View>
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: '#e7e7e7',
    paddingTop: 24,
    paddingBottom: 4,
    paddingHorizontal: 12,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, .26)',
  },
  labelText: {
    position: 'absolute',
    left: 12,
    top: 9,
    color: 'rgba(0, 0, 0, .54)',
    fontSize: 12,
  },
  value: {
    flex: 1,
  },
  icon: {
    paddingLeft: 12,
  },
});
